function createTaskCard(task) {

  return `
    <button type="button" class="btn btn-light task-card-btn" data-task-id="${task.id}">  
      <div class="task-card mb-2">
        <div class="task-details">
          <h6 class="task-title">${task.title}</h6>
          <p class="task-due-date">Finalización ${task.endDate}</p>
        </div>
      </div>
    </button>
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
  }
});
  