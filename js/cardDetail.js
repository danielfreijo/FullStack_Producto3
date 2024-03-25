function formatDate(dateString) {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const parts = dateString.split('-');
  const year = parts[0];
  const month = months[parseInt(parts[1], 10) - 1];
  const day = parts[2];

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

function showTasksCards (tasks) {
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

$(document).ready(function() {
  
  // Obtener el ID del proyecto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  // Obtener los proyectos del sessionStorage
  var projectsJSON = sessionStorage.getItem('projectsdb');
  var projects = JSON.parse(projectsJSON);
  //console.log('Proyectos:', projects);
  //console.log('ID del proyecto:', projectId);

  // Buscar el proyecto correspondiente en el array de proyectos
  const projectIndex = projects.findIndex(project => project.id == projectId); 
  const project = projects[projectIndex]; 

  if (project) {
    // Actualizar el campo dateAcces
    project.dateAccess = new Date().toString();

    // Guardar los cambios en el almacenamiento
    sessionStorage.setItem('projectsdb', JSON.stringify(projects));
    console.log('Proyecto actualizado:', project);

    // Mostrar el nombre del proyecto en la barra de navegación
    $('#projectName').text(project.name.toUpperCase());
    console.log('Proyecto encontrado:', project);

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
    if (project.backgroundcard !== "null") {
      $('#previewImageCard').attr('src', `../assets/BackgroundCards/${project.backgroundcard}`).show();
    }
    $('#sidebarDepartment').val(project.department)
    $('#sidebarBackgroundColor').val(project.backgroundcolor) 
    if (project.backgroundimage !== "null") {
      $('#previewImage').attr('src', `../assets/BackgroundsProjects/${project.backgroundimage}`).show();
    }
    
    // Mostrar el tipo de fondo seleccionado
    $('#sidebarBackgroundType').change(function() {
      var selectedType = $(this).val();
      if (selectedType === "color") {
        $('#colorSection').show();
        $('#imageSection').hide();
        $('#sidebarBackgroundImage').val('null');
        console.log('Imagen de fondo:', $('#sidebarBackgroundImage').val());
      } else {
        $('#colorSection').hide();
        $('#imageSection').show();
        $('#sidebarBackgroundColor').val('#ffffff');
        console.log('Color de fondo:', $('#sidebarBackgroundColor').val());
      }
      console.log('Tipo de fondo:', selectedType);
    });
    $('#sidebarBackgroundTypeCard').change(function() {
      var selectedType = $(this).val();
      if (selectedType === "color") {
        $('#colorSectionCard').show();
        $('#imageSectionCard').hide();
        $('#sidebarBackgroundImageCard').val('null');
        console.log('Imagen de fondo:', $('#sidebarBackgroundImageCard').val());
      } else {
        $('#colorSectionCard').hide();
        $('#imageSectionCard').show();
        $('#sidebarBackgroundColorCard').val('#ffffff');
        console.log('Color de fondo:', $('#sidebarBackgroundColorCard').val());
      }
      console.log('Tipo de fondo:', selectedType);
    });

    // Mostrar la vista previa de la imagen seleccionada
    $('#sidebarBackgroundImage').change(function() {
      var selectedImage = $(this).val();
      if (selectedImage !== "null") {
        $('#previewImage').attr('src', `../assets/BackgroundsProjects/${selectedImage}`).show();
      } else {
        $('#previewImage').hide();
      }
    });
    $('#sidebarBackgroundImageCard').change(function() {
      var selectedImage = $(this).val();
      if (selectedImage !== "null") {
        $('#previewImageCard').attr('src', `../assets/BackgroundCards/${selectedImage}`).show();
      } else {
        $('#previewImageCard').hide();
      }
    });

    // Guardar los cambios cuando se hace clic en el botón "Guardar Cambios"
    $('#saveChangesBtn').click(function() {
      var newName = $('#sidebarProjectNameEdit').val();
      var newDescription = $('#sidebarDescription').val();
      var newDepartment = $('#sidebarDepartment').val();
      var newBackgroundColor = $('#sidebarBackgroundColor').val();
      var newBackgroundImage = $('#sidebarBackgroundImage').val();
      var newBackgroundColorCard = $('#sidebarBackgroundColorCard').val();
      var newBackgroundImageCard = $('#sidebarBackgroundImageCard').val();

      // Si se selecciona un color como fondo, establecer backgroundImage como null
      if (newBackgroundImage === "null") {
        newBackgroundImage = null;
      }
      if (newBackgroundImageCard === "null") {
        newBackgroundImageCard = null;
      }

      // Actualizar los valores del proyecto
      project.name = newName;
      project.description = newDescription;
      project.department = newDepartment;
      project.backgroundcolor = newBackgroundColor;
      project.backgroundimage = newBackgroundImage;
      project.backgroundcolorcard = newBackgroundColorCard;
      project.backgroundcard = newBackgroundImageCard;

      // Guardar el proyecto actualizado en sessionStorage
      projects[projectIndex] = project;
      sessionStorage.setItem('projectsdb', JSON.stringify(projects));
      
      // Opcional: Mostrar un mensaje de éxito o realizar alguna otra acción después de guardar los cambios
      alert('Cambios guardados correctamente');
      location.reload();
    });

    // Aplicar el color de fondo al elemento deseado en la página
    if (project.backgroundimage != null) {
      $('body').css('background-image', `url(../assets/BackgroundsProjects/${project.backgroundimage})`);
      $('body').css('background-size', 'cover');
      $('body').css('background-position', 'center');
      $('body').css('background-repeat', 'no-repeat');
      console.log('Imagen de fondo:', project.backgroundimage); 
    } else {
      $('body').css('background-color', `${project.backgroundcolor}`);
      console.log('Color de fondo:', project.backgroundcolor);
    }
    
    // Abrir el menú lateral al hacer clic en el botón "INFORMACIÓN"
    $('#board-menu').click(function() {
      $('#sidebar-menu').css('width', '380px');
    });

    // Cerrar el sidebar
    $("#close-sidebar").click(function() {
      $("#sidebar-menu").css("width", "0");
    });

    // Mostrar las tarjetas de las tareas
    showTasksCards(project.tasks);

    // evento al hacer clic en una tarea
    $(document).on('click', '.task-card-btn', function(event) {
      event.stopPropagation(); 
      const taskId = $(this).data('task-id');
      const isChecked = $(this).find('.task-end-date input[type="checkbox"]').prop('checked');
      $(this).find('.task-end-date').toggleClass('green-background', isChecked);
      console.log(`Tarea ${taskId} :`, !isChecked);

      const taskToEdit = project.tasks.find(task => task.id.toString() === taskId.toString());

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
    $('#addTaskForm').submit(function(event) {
      event.preventDefault(); // Previene el envío real del formulario

      // Crea un nuevo objeto de tarea con los datos del formulario
      var newTask = {
          id: project.tasks.length, 
          title: $('#taskTitle').val(),
          description: $('#taskDescription').val(),
          responsible: $('#taskResponsibles').val().split(','), // Suponiendo que los responsables se separan por comas
          enddate: $('#taskEndDate').val(),
          notes: $('#taskNotes').val(),
          status: $('#taskStatus').val(),
      };

      // Agrega la nueva tarea al proyecto actual
      project.tasks.push(newTask);

      // Actualiza sessionStorage con el proyecto actualizado
      projects[projectIndex] = project; // Asegúrate que 'projectIndex' y 'projects' están definidos y son accesibles
      sessionStorage.setItem('projectsdb', JSON.stringify(projects));

      // Actualiza la UI para mostrar la nueva tarea
      showTasksCards(project.tasks);

      // Cierra el modal
      $('#addTaskModal').modal('hide');

      // Opcional: Limpia el formulario para la próxima vez que se abra
      $('#addTaskForm')[0].reset();
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
