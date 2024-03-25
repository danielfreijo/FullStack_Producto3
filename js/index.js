
function createProjectCard(project) {
  const projectNameUpperCase = project.name.toUpperCase();
  let backgroundStyle = '';
  if (!project.backgroundcard) {
    backgroundStyle = `background-color: ${project.backgroundcolorcard};`;
  } else{
    const backgroundUrl = `../assets/BackgroundCards/${project.backgroundcard}`; 
    backgroundStyle = `background-image: url('${backgroundUrl}');`;
  }
  //console.log("backgroundStyle:", backgroundStyle);
  const starIcon = project.priority === 1 
  ? '<img src="../assets/estrellaM.png" alt="prioridad" style="width: 22px; height: 22px;">' 
  : '<img src="../assets/estrellaV.png" alt="sin prioridad" style="width: 22px; height: 22px;">';

  return `
  <a class="card" href="/html/cardDetail.html?id=${project.id}" data-id="${project.id}" style="${backgroundStyle};">
      <div class="card-body">
        <h5 class="card-title">${projectNameUpperCase}</h5>
        <button class="btn btn-primary delete-button" style="display:none;" >ELIMINAR</button>
        <button class="btn btn-primary priority-button" style="display:none;">-${starIcon}-</button>
      </div>
  </a>
  `;
}

function showRecentProjects(projects) {
  const recentProjects = $('#recentProjects');
  recentProjects.empty();

  // Ordenar los proyectos por fecha de acceso de manera descendente
  projects.sort((a, b) => new Date(b.dateAccess) - new Date(a.dateAccess));

  // Tomar los 4 proyectos más recientes
  const projectsToShow = projects.slice(0, 4);

  projectsToShow.forEach(project => {
    const cardHTML = createProjectCard(project);
    recentProjects.append(cardHTML);
  });
}

function showAllProjects(projects, category = 'all') {
  const allProjects = $('#allProjects');
  allProjects.empty();
  //console.log('Categoría seleccionada:', category); 

  let filteredProjects;
  
  if (category === 'all') {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter(project => project.department === category);
  }
  //console.log('Proyectos filtrados:', filteredProjects); 

  // Ordenar los proyectos por su ID de manera ascendente
  filteredProjects.sort((a, b) => a.id - b.id);

  filteredProjects.forEach(project => {
    const cardHTML = createProjectCard(project);
    allProjects.append(cardHTML);
  });
}

function showPriorityProjects(projects) {
  const priorityProjects = $('#priorityProjects');
  priorityProjects.empty();

  const priorityProjectsArray = projects.filter(project => project.priority === 1);

  priorityProjectsArray.forEach(project => {
    const cardHTML = createProjectCard(project);
    priorityProjects.append(cardHTML);
  });
}

$(document).ready(function() {

    var ultimosProyectos = [];

  // bOTON AÑADIR PROYECTO
  $('#addproject').on('click', function() {
      // Mostrar la ventana para añadir el pryecto
      $('#addProjectModal').modal('toggle'); 
  });

  // Al hacer clic en el botón "Crear proyecto" dentro del modal
  $('#crearProyecto').on('click', function() {
      // Capturar los valores del formulario
      var projectName = $('#projectName').val();
      var projectDescription = $('#projectDescription').val();

      // Crear un nuevo objeto de proyecto
      var newProject = {

          id: projects.length, 
          name: projectName,
          description: projectDescription,
          department: "", 
          startdate: "",   
          enddate: "",     
          backgroundcolor: "", 
          backgroundimage: "", 
          priority: 0,    
          status: 1       
      };

      // Agregar el nuevo proyecto al array projects
      projects.push(newProject);
      $('#addProjectModal').modal('hide');

      // Verificacion mostrar array projects despues de añadir el proyecto
      console.log("Nuevo proyecto agregado. Total de proyectos:", projects.length);

      // actualizar y mostrar la lista de proyectos
      showProjects();
  });
    
  // Función para mostrar los proyectos
  function showProjects() {
      var projectList = $("#projectList");
      projectList.empty();

      
    projects.forEach(function(project) {
    // Creamos un nuevo elemento de columna para cada proyecto
        var projectColumn = $("<div>").addClass("col-lg-3 col-md-4 col-sm-6 col-xs-12");

        // Creamos un nuevo elemento de tarjeta para el proyecto
        var projectCard = $("<div>").addClass("card mb-4");

        
        projectCard.css({
            "background-color": "#ffffff", 
            "border-radius": "10px", 
            "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.4)", 
            "background-image": "url('" + project.backgroundimage + "')", 
            "background-size": "cover", 
            "background-position": "center" 
        });

        // Creamos un nuevo elemento de cuerpo para la tarjeta del proyecto
        var cardBody = $("<div>").addClass("card-body text-center");

        var projectName = $("<h4>").addClass("card-title").text(project.name);

        var projectDescription = $("<p>").addClass("card-text").text(project.description);

        cardBody.append(projectName);

        // Boton de eliminar la tarjeta
        var deleteButton = $("<button>").addClass("btn btn-danger delete-btn float-left").text("Eliminar");
        deleteButton.on("click", function(event) {
            event.stopPropagation(); 
            projectCard.remove(); 
        });

        // Icono estrella
        var favoriteIcon = $("<i>").addClass("fas fa-star favorite-icon float-right");
        favoriteIcon.on("click", function(event) {
            //Para que no se abra el todo-list
            event.stopPropagation(); 
            favoriteIcon.toggleClass("favorited"); 
        });

        
        cardBody.append(deleteButton);
        cardBody.append(favoriteIcon);
        
       
        projectCard.append(cardBody);

        
        projectColumn.append(projectCard);

        //contenedor de proyectos
        projectList.append(projectColumn);
        // Al hacer clic en la tarjeta, redirigir a todo_list.html con el nombre del proyecto
        projectCard.on("click", function() {
            window.location.href = "interface2.html?project=" + encodeURIComponent(project.name);
        });

    });
  }

  showProjects();
  
  // Función para mostrar los proyectos recientes
  function showRecentProjects() {
    var recentProjectsList = $("#recentProjectsList");
    // Limpiar el contenido del contenedor de proyectos recientes
    recentProjectsList.empty();

    // Recorremos los últimos proyectos en el array ultimosProyectos
    ultimosProyectos.forEach(function(project) {
        // Creamos un nuevo elemento de tarjeta para el proyecto reciente
        var recentProjectCard = $("<div>").addClass("card mb-3");

        // Creamos un nuevo elemento de cuerpo para la tarjeta del proyecto reciente
        var cardBody = $("<div>").addClass("card-body");

        // Añadimos el nombre del proyecto como título de la tarjeta
        var projectName = $("<h5>").addClass("card-title").text(project.name);

        // Añadimos la descripción del proyecto como texto del cuerpo de la tarjeta
        var projectDescription = $("<p>").addClass("card-text").text(project.description);

        // Añadimos el título y la descripción al cuerpo de la tarjeta
        cardBody.append(projectName);
        cardBody.append(projectDescription);

        // cuerpo de la tarjeta a la tarjeta
        recentProjectCard.append(cardBody);

        // Agregar tarjeta de proyecto reciente al contenedor de proyectos recientes
        recentProjectsList.append(recentProjectCard);
  // Cargamos el array de Session
  var arrayJSON_Projects = sessionStorage.getItem('projectsdb');
  var projects = JSON.parse(arrayJSON_Projects);
  //console.log("proyectos:", projects);

  // Mostrar los proyectos
  showRecentProjects(projects);
  showAllProjects(projects);
  showPriorityProjects(projects);

  // Función para abrir el modal
  $('#openModal').click(function() {
    $('#addProjectModal').modal('show');
  });
  
  // Función para cambiar la sección de fondo
  $('#backgroundType').change(function() {
    var backgroundType = $(this).val(); // Obtener el valor seleccionado del select
    if (backgroundType === 'color') {
      $('#colorSection').show();
      $('#imageSection').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundType);
    } else if (backgroundType === 'image') {
      $('#imageSection').show();
      $('#colorSection').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundType);
    }
  });
  $('#backgroundTypeCard').change(function() {
    var backgroundTypeCard = $(this).val(); // Obtener el valor seleccionado del select
    if (backgroundTypeCard === 'color') {
      $('#colorSectionCard').show();
      $('#imageSectionCard').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundTypeCard);
    } else if (backgroundTypeCard === 'image') {
      $('#imageSectionCard').show();
      $('#colorSectionCard').hide();
      console.log("Tipo de fondo seleccionado fuera de la función:", backgroundTypeCard);
    }
  });

  // Función para mostrar la vista previa de la imagen seleccionada
  $('#backgroundImage').change(function() {
    var selectedImage = $(this).val();
    if (selectedImage) {
      console.log("Imagen seleccionada:", selectedImage);
      $('#previewImage').attr('src', '../assets/BackgroundsProjects/' + selectedImage).show();
    } else {
      $('#previewImage').hide();
    }
  });
  $('#backgroundImageCard').change(function() {
    var selectedImage = $(this).val();
    if (selectedImage) {
      console.log("Imagen seleccionada:", selectedImage);
      $('#previewImageCard').attr('src', '../assets/BackgroundCards/' + selectedImage).show();
    } else {
      $('#previewImageCard').hide();
    }
  });

  // Evento para agregar un proyecto
  $('#addProjectForm').submit(function(event) {
    event.preventDefault(); 
    console.log("Formulario de proyecto enviado"); 
    
    // Obtener los valores del formulario
    var projectName = $('#projectName').val();
    var projectDescription = $('#description').val();
    var projectDepartment = $('#department').val();
    var projectPriority = $('#priority').prop('checked') ? 1 : 0; 

    var projectBackgroundColorCard;
    var projectBackgroundImageCard;
    
    // Verificar el tipo de fondo seleccionado para la tarjeta
    var backgroundTypeCard = $('#backgroundTypeCard').val();
    console.log("Tipo de fondo seleccionado:", backgroundType); 

    if (backgroundTypeCard === 'color') {
      projectBackgroundColorCard = $('#backgroundColorCard').val();
      projectBackgroundImageCard = null; 
    } else if (backgroundTypeCard === 'image') {
      projectBackgroundColorCard = $('#backgroundColorCard').val();
      projectBackgroundImageCard = $('#backgroundImageCard').val();
    }

    var projectBackgroundColor;
    var projectBackgroundImage;
    
    // Verificar el tipo de fondo seleccionado pora el proyecto
    var backgroundType = $('#backgroundType').val();
    console.log("Tipo de fondo seleccionado:", backgroundType); 

    if (backgroundType === 'color') {
      projectBackgroundColor = $('#backgroundColor').val();
      projectBackgroundImage = null; 
    } else if (backgroundType === 'image') {
      projectBackgroundColor = $('#backgroundColor').val();
      projectBackgroundImage = $('#backgroundImage').val();
    }

    // Agregar el proyecto al array projects
    var newProject = {
      "id": projects.length, 
      "name": projectName,
      "description": projectDescription,
      "department": projectDepartment,
      "backgroundcolor": projectBackgroundColor,
      "backgroundimage": projectBackgroundImage,
      "backgroundcolorcard": projectBackgroundColorCard,
      "backgroundcard": projectBackgroundImageCard,
      "priority": projectPriority,
      "status": 1,
      "dateAccess": new Date().toString()
    };
    console.log("Nuevo proyecto creado:", newProject); 
    console.log("imagen guardada:", newProject.backgroundimage);
    projects.push(newProject); 
    
    // Guardar el proyecto en Storage
    sessionStorage.setItem('projectsdb', JSON.stringify(projects)); 
    console.log("Proyecto guardado en localStorage:", projects);

    // Actualizar la variable projects después de guardar los datos en el almacenamiento local
    arrayJSON_Projects = sessionStorage.getItem('projectsdb');
    projects = JSON.parse(arrayJSON_Projects);
    console.log("localstorage::", arrayJSON_Projects);

    $('#addProjectForm').trigger('reset');
    $('#addProjectModal').modal('hide');

    showRecentProjects(projects);
    showAllProjects(projects);
  });

  // Función para filtrar los proyectos
  $('.filter-button').click(function() {
    $('.filter-button').removeClass('active');
    $(this).addClass('active');
    var category = $(this).data('filter');
    
    showAllProjects(projects, category);
  });

  // Función para mostrar el tablero del proyecto
  $(document).on('click', '.card', function() {
    var projectId = $(this).data('id');
    console.log('Proyecto seleccionado:', projectId);
  });

  // Evento para cambiar la prioridad del proyecto
  $(document).on('click', '.priority-button', function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Se hizo clic en el botón de prioridad.');

    const card = $(this).closest('.card');
    const projectId = card.data('id');
    const project = projects.find(project => project.id === projectId)

    // Cambiar la prioridad del proyecto
    project.priority = project.priority === 1 ? 0 : 1;
    isPriority = project.priority === 1; // Actualizar el estado de la prioridad

    // Actualizar la imagen del botón
    if (isPriority) {
      $(this).find('img').attr('src', '../assets/estrellaM.png');
      $(this).find('img').attr('alt', 'prioridad');
    } else {
      $(this).find('img').attr('src', '../assets/estrellaV.png');
      $(this).find('img').attr('alt', 'sin prioridad');
    }

    sessionStorage.setItem('projectsdb', JSON.stringify(projects)); 
    showPriorityProjects(projects);
  });

  // Función para mostrar el botón de eliminación y prioridad
  $(document).on('mouseenter', '.card', function() {  
    $(this).find('.delete-button').show();
    $(this).find('.priority-button').show();
  });
  
  // Función para ocultar el botón de eliminación y prioridad
  $(document).on('mouseleave', '.card', function() {
    $(this).find('.delete-button').hide();
    $(this).find('.priority-button').hide();  
  });

  // Evento para eliminar un proyecto
  $(document).on('click', '.delete-button', function(event) {
    event.preventDefault();
    console.log("Botón de eliminación clicado");

    // Obtener el ID del proyecto asociado con la tarjeta
    var projectId = $(this).closest('.card').data('id');
    //console.log("ID del proyecto a eliminar:", projectId);

    // Mostrar el modal de confirmación
    $('#confirmationModal').modal('show');

    // Manejar el evento de confirmación
    $('#confirmDelete').click(function() {

      // Filtrar los proyectos para eliminar el proyecto con el ID correspondiente
      projects = projects.filter(project => project.id !== projectId);
      //console.log("Proyectos después de la eliminación:", projects);

      // Actualizar el sessionStorage con los proyectos filtrados
      sessionStorage.setItem('projectsdb', JSON.stringify(projects));
      //console.log("Proyectos guardados en sessionStorage:", sessionStorage.getItem('projectsdb'));

      // Mostrar los proyectos actualizados
      showRecentProjects(projects);
      showAllProjects(projects);
      showPriorityProjects(projects);

      $('#confirmationModal').modal('hide');
    });
}

  

});



    return false; // Evita el comportamiento predeterminado del enlace
  });

});

