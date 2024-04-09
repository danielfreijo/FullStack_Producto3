// Funcionwa asincornas para obtener los datos del proyecto por ID desde la API
async function getProjectById(id) {
  const query = `
    query GetProjectById($id: ID!) {
      getProject(id: $id) {
        id
        name
        description
        department
        backgroundcolor
        backgroundimage
        backgroundcolorcard
        backgroundcard
        priority
        dateaccess
      }
    }
  `;

  const requestBody = JSON.stringify({
    query: query,
    variables: { id: id }
  });

  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    });

    const responseBody = await response.json();
    if (responseBody.errors) {
      console.error("Error en GraphQL:", responseBody.errors);
      throw new Error("Error al obtener el proyecto por ID");
    } else {  
      return responseBody.data.getProject;
    } 
  } catch (error) {
    console.error("Error en la solicitud:", error);
  } 
}
async function getTasksByProjectId(projectId) {
  const query = `
    query GetTasksByProjectId($projectId: ID!) {
      getTasksByProjectId(projectId: $projectId) {
        id
        project_id
        title
        description
        responsible
        enddate
        notes
        status
      }
    }
  `;

  const requestBody = JSON.stringify({
    query: query,
    variables: { projectId: projectId }
  });

  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    });

    const responseBody = await response.json();
    if (responseBody.errors) {
      console.error("Error en GraphQL:", responseBody.errors);
      throw new Error("Error al obtener las tareas por ID de proyecto");
    } else {
      return responseBody.data.getTasksByProjectId;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error); 
  }
}

// Funcionalidades para la vista de detalle de una tarjeta
function formatDate(dateString) {
  //console.log('Fecha:', dateString);
  const date = new Date(parseInt(dateString, 10));
  //console.log('Fecha Parseada:', date);

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${day} de ${month} ${year}`;
}
function createTaskCard(task) {
  const formattedDate = formatDate(task.enddate);
  return `
    <li class="btn btn-light task-card-btn " data-task-id="${task.id}" draggable="true" ondragstart="drag(event)" ondragover="return false;">  
      <div class="task-card mb-2">
        <div class="task-details">
          <h6 class="task-title">${task.title}</h6>
          <div class="task-end-date">
            <input type="checkbox" id="taskCheckbox-${task.id}">
            <label for="taskCheckbox-${task.id}">Finaliza: ${formattedDate}</label>
          </div>
          <button class="btn btn-primary delete-button" style="display:none;">ELIMINAR</button>
        </div>
      </div>
    </li>
  `;
}
function showTasksCards(tasks) {
  const taskCardsContainer = $('.task-cards'); 
  taskCardsContainer.empty();

  tasks.forEach(task => {
    const taskCardHtml = createTaskCard(task); 
    const taskStatus = task.status.toUpperCase(); 

    // Agrega la tarjeta al contenedor correspondiente según el estado de la tarea
    switch (taskStatus) {
      case 'POR HACER':
        $('.task-cards[data-state="POR HACER"]').append(taskCardHtml);
        break;
      case 'EN PROGRESO':
        $('.task-cards[data-state="EN PROGRESO"]').append(taskCardHtml);
        break;
      case 'FINALIZADO':
        $('.task-cards[data-state="FINALIZADO"]').append(taskCardHtml);
        break;
      default:
        console.log(`Estado no reconocido para la tarea: ${taskStatus}`);
    }
  });
}

// Funciones para el drag and drop
function allowDrop(event) {
  event.preventDefault();
}
function drag(event) {
  const taskId = event.target.getAttribute('data-task-id');
  event.dataTransfer.setData("text/plain", taskId);
  //console.log('Elemento arrastrado:', taskId);
}
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.querySelector('[data-task-id="' + data + '"]');

  // Verificar si el elemento arrastrado es válido
  if (draggedElement) {
    var targetColumn = event.target.closest('.col-4'); // Encuentra la columna más cercana al punto de soltar 
    var targetContainer = targetColumn.querySelector('.task-cards');

    // Verificar si el contenedor de destino es válido
    if (targetContainer) {
      targetContainer.appendChild(draggedElement);
      var targetState = targetContainer.getAttribute('data-state');
      draggedElement.dataset.state = targetState;
      updateTaskStateInProject(data, targetState);

    } else {
      console.error('No se pudo encontrar el contenedor de tarjetas dentro de la columna.');
    }
  } else {
    console.error('No se pudo encontrar el elemento arrastrado con el ID:', data);
  }
}

// Función para actualizar el estado de una tarea en el proyecto
function updateTaskStateInProject(taskId, newState) {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  var projectsJSON = sessionStorage.getItem('projectsdb');
  var projects = JSON.parse(projectsJSON);

  // Buscar el proyecto por ID
  const projectIndex = projects.findIndex(project => project.id.toString() === projectId);
  if (projectIndex !== -1) {
    const project = projects[projectIndex];

    // Buscar la tarea por ID y actualizar su estado
    const taskIndex = project.tasks.findIndex(task => task.id.toString() === taskId);
    if (taskIndex !== -1) {
      project.tasks[taskIndex].status = newState;

      // Guardar los cambios en sessionStorage
      sessionStorage.setItem('projectsdb', JSON.stringify(projects));
    } else {
      console.error('No se pudo encontrar la tarea con ID:', taskId);
    }
  } else {
    console.error('No se pudo encontrar el proyecto con ID:', projectId);
  }
}

$(document).ready(async function() {
  
  // Obtener el ID del proyecto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  console.log('ID del proyecto:', projectId);

  const project = await getProjectById(projectId);
  console.log('Proyecto encontrado:', project);


  if (project) {
    // Actualizar el campo dateAcces
    project.dateaccess = new Date().toString();

    // Mostrar el nombre del proyecto en la barra de navegación
    $('#projectName').text(project.name.toUpperCase());

    const tasks = await getTasksByProjectId(projectId);
    //console.log('Tareas encontradas:', tasks);
    if (tasks) {
      showTasksCards(tasks);
    }
    
    // Abrir el modal de nueva tarea
    $('.addCardBtn').click(function() { 
      var defaultState = $(this).data('state');
      console.log('Estado por defecto:', defaultState);
      $('#taskStatus').val(defaultState);
      $('#addTaskModal').modal('show');
    });

    /****************************************************************************************************** */
    /* SIDEBAR */
    /****************************************************************************************************** */    
    
    // Mostrar INFO del proyecto en el sidebar y hacerlos editables
    $('#sidebarProjectName').text(project.name.toUpperCase())
    $('#sidebarProjectNameEdit').val(project.name)
    $('#sidebarDescription').text(project.description)
    $('#sidebarBackgroundColorCard').val(project.backgroundcolorcard)
    if (project.backgroundcard !== "") {
      $('#previewImageCard').attr('src', `/assets/BackgroundCards/${project.backgroundcard}`).show();
    }
    $('#sidebarDepartment').val(project.department)
    $('#sidebarBackgroundColor').val(project.backgroundcolor) 
    if (project.backgroundimage !== "") {
      $('#previewImage').attr('src', `/assets/BackgroundsProjects/${project.backgroundimage}`).show();
    }
    
    // Mostrar el tipo de fondo seleccionado
    $('#sidebarBackgroundType').change(function() {
      var selectedType = $(this).val();
      if (selectedType === "color") {
        $('#colorSection').show();
        $('#imageSection').hide();
        $('#sidebarBackgroundImage').val('');
        //console.log('Imagen de fondo:', $('#sidebarBackgroundImage').val());
      } else {
        $('#colorSection').hide();
        $('#imageSection').show();
        $('#sidebarBackgroundColor').val('#ffffff');
        //console.log('Color de fondo:', $('#sidebarBackgroundColor').val());
      }
      //console.log('Tipo de fondo:', selectedType);
    });
    $('#sidebarBackgroundTypeCard').change(function() {
      var selectedType = $(this).val();
      if (selectedType === "color") {
        $('#colorSectionCard').show();
        $('#imageSectionCard').hide();
        $('#sidebarBackgroundImageCard').val('');
        //console.log('Imagen de fondo:', $('#sidebarBackgroundImageCard').val());
      } else {
        $('#colorSectionCard').hide();
        $('#imageSectionCard').show();
        $('#sidebarBackgroundColorCard').val('#ffffff');
        //console.log('Color de fondo:', $('#sidebarBackgroundColorCard').val());
      }
      //console.log('Tipo de fondo:', selectedType);
    });

    // Mostrar la vista previa de la imagen seleccionada
    $('#sidebarBackgroundImage').change(function() {
      var selectedImage = $(this).val();
      console.log('Imagen de fondo:', selectedImage);
      if (selectedImage !== "") {
        $('#previewImage').attr('src', `/assets/BackgroundsProjects/${selectedImage}`).show();
      } else {
        $('#previewImage').hide();
      }
    });
    $('#sidebarBackgroundImageCard').change(function() {
      var selectedImage = $(this).val();
      console.log('Imagen de fondo:', selectedImage);
      if (selectedImage !== "") {
        $('#previewImageCard').attr('src', `/assets/BackgroundCards/${selectedImage}`).show();
      } else {
        $('#previewImageCard').hide();
      }
    });

    // Guardar los cambios cuando se hace clic en el botón "Guardar Cambios"
    $('#saveChangesBtn').click(async function() {
      const projectId = new URLSearchParams(window.location.search).get('id'); 
      const newName = $('#sidebarProjectNameEdit').val();
      const newDescription = $('#sidebarDescription').val();
      const newDepartment = $('#sidebarDepartment').val();
      const newBackgroundColor = $('#sidebarBackgroundColor').val();
      const newBackgroundImage = $('#sidebarBackgroundImage').val() || "";
      const newBackgroundColorCard = $('#sidebarBackgroundColorCard').val();
      const newBackgroundImageCard = $('#sidebarBackgroundImageCard').val() || "";
      
      // Si se selecciona un color como fondo, establecer backgroundImage como ""
      if (newBackgroundImage === "") {
        newBackgroundImage = "";
      }
      if (newBackgroundImageCard === "") {
        newBackgroundImageCard = "";
      }

      const mutation = `
        mutation UpdateProject($updateProjectId: ID!, $input: ProjectInput!) {
          updateProject(id: $updateProjectId, input: $input) {
            id
            name
            description
            department
            backgroundcolor
            backgroundimage
            backgroundcolorcard
            backgroundcard
          }
        }
      `;

      const requestBody = {
        query: mutation,
        variables: {
          updateProjectId: projectId,
          input: {
            name: newName,
            description: newDescription,
            department: newDepartment,
            backgroundcolor: newBackgroundColor,
            backgroundimage: newBackgroundImage,
            backgroundcolorcard: newBackgroundColorCard,
            backgroundcard: newBackgroundImageCard,
          }
        }
      };
      //console.log('Cuerpo de la solicitud:', requestBody);

      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
        //console.log('Respuesta de la API:', response);

        const responseBody = await response.json();
        if (responseBody.errors) {
          console.error("Error en GraphQL:", responseBody.errors);
          throw new Error("Error al actualizar el proyecto");
        } else {
          location.reload();
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    });

    // Aplicar el color de fondo al elemento deseado en la página
    if (project.backgroundimage != "") {
      $('body').css('background-image', `url(/assets/BackgroundsProjects/${project.backgroundimage})`);
      $('body').css('background-size', 'cover');
      $('body').css('background-position', 'center');
      $('body').css('background-repeat', 'no-repeat');
      //console.log('Imagen de fondo:', project.backgroundimage); 
    } else {
      $('body').css('background-color', `${project.backgroundcolor}`);
      //console.log('Color de fondo:', project.backgroundcolor);
    }
    
    // Abrir y cerrar el menú lateral al hacer clic en el botón "INFORMACIÓN"
    $('#board-menu').click(function() {
      $('#sidebar-menu').css('width', '380px');
    });
    $("#close-sidebar").click(function() {
      $("#sidebar-menu").css("width", "0");
    });

    $(document).on('click', '.task-end-date input[type="checkbox"], .task-end-date label', function(event) {
      event.stopPropagation();
    
      if($(event.target).is('input[type="checkbox"]')) {
        $(event.target).closest('.task-end-date').toggleClass('green-background', $(event.target).prop('checked'));
      }
    });


    // evento al hacer clic en una tarea
    $(document).on('click', '.task-card-btn', function(event) {
      event.stopPropagation(); 
      
      const taskId = $(this).data('task-id');
      console.log('ID de la tarea:', taskId);
    
      const taskToEdit = tasks.find(task => task.id.toString() === taskId.toString());
      console.log('Tarea a editar:', taskToEdit);
      

      // Si se encuentra la tarea, llena el modal de edición con los datos de la tarea
      if (taskToEdit) {
        $('#editTaskTitle').val(taskToEdit.title);
        $('#editTaskDescription').val(taskToEdit.description);
        $('#editTaskResponsibles').val(taskToEdit.responsible.join(', ')); // Asume que es un array y lo convierte a string
        $('#editTaskEndDate').val(taskToEdit.enddate);
        $('#editTaskNotes').val(taskToEdit.notes);
        $('#editTaskStatus').val(taskToEdit.status);

        // Guarda el id de la tarea en un lugar accesible para cuando se guarde el formulario
        $('#editTaskForm').data('task-id', taskToEdit.id);

        // Muestra el modal
        $('#editTaskModal').modal('show');
      }
    });

    // Agregar una nueva tarea al proyecto
    $('#addTaskForm').submit(async function(event) {
      event.preventDefault(); 

      const projectId = new URLSearchParams(window.location.search).get('id');

      // Crea un nuevo objeto de tarea con los datos del formulario
      const taskData   = {
          project_id: projectId,
          title: $('#taskTitle').val(),
          description: $('#taskDescription').val(),
          responsible: $('#taskResponsibles').val().split(','), // Suponiendo que los responsables se separan por comas
          enddate: $('#taskEndDate').val(),
          notes: $('#taskNotes').val(),
          status: $('#taskStatus').val(),
      };
      //console.log('Datos de la tarea:', taskData);

      const mutation = `
        mutation CreateTask($input: TaskInput!) { 
          createTask(input: $input) {
            id
            project_id
            title
            description
            responsible
            enddate
            notes
            status
          }
        } 
      `;

      const requestBody = {
        query: mutation,
        variables: {
          input: taskData
        }
      };

      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const responseBody = await response.json();
        if (responseBody.errors) {
          //console.log('Respuesta de la API:', response);
          //console.log('Cuerpo de la solicitud:', requestBody);
          //console.log('Respuesta del cuerpo:', responseBody);
          console.error("Error en GraphQL:", responseBody.errors);
          throw new Error("Error al crear la tarea");
        } else {
          console.log('Nueva tarea:', taskData);
        
          $('#addTaskModal').modal('hide');
          $('#addTaskForm')[0].reset();
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    });

    // Editar una tarea
    $('#editTaskForm').submit(function(event) {
      event.preventDefault();
    
      // Obtén el id de la tarea desde los datos almacenados
      const taskId = $(this).data('task-id');
      // Encuentra la tarea en el array de tareas del proyecto
      const taskIndex = project.tasks.findIndex(task => task.id.toString() === taskId.toString());
    
      // Actualiza la tarea con los nuevos valores
      if (taskIndex !== -1) {
        project.tasks[taskIndex].title = $('#editTaskTitle').val();
        project.tasks[taskIndex].description = $('#editTaskDescription').val();
        project.tasks[taskIndex].responsible = $('#editTaskResponsibles').val().split(', '); // Convierte el string a un array
        project.tasks[taskIndex].enddate = $('#editTaskEndDate').val();
        project.tasks[taskIndex].notes = $('#editTaskNotes').val();
        project.tasks[taskIndex].status = $('#editTaskStatus').val();
    
        // Actualiza sessionStorage
        sessionStorage.setItem('projectsdb', JSON.stringify(projects));
    
        // Actualiza las tarjetas mostradas
        showTasksCards(project.tasks);

        // Cierra el modal
        $('#editTaskModal').modal('hide');
      }
    });

    // Mosrar y ocultar botón de eliminar tarea
    $(document).on('mouseenter', '.task-card', function() {  
      $(this).find('.delete-button').show();
    });
    $(document).on('mouseleave', '.task-card', function() {
      $(this).find('.delete-button').hide();
    });
    
    // Eliminar una tarea
    $(document).on('click', '.delete-button', function(event) {
      event.preventDefault();
      const taskId = $(this).closest('.task-card-btn').data('task-id');
      const taskIndex = project.tasks.findIndex(task => task.id.toString() === taskId.toString());
      console.log('Eliminar tarea con ID:', taskId);
      console.log('Índice de la tarea:', taskIndex);

      $('#confirmationModal').modal('show');

      $('#confirmDelete').click(function() {
        project.tasks.splice(taskIndex, 1);
        sessionStorage.setItem('projectsdb', JSON.stringify(projects));
        showTasksCards(project.tasks);
        $('#confirmationModal').modal('hide');
      });

      return false;
    });
  }
});
