function createProjectCard(project) {
  const projectNameUpperCase = project.name.toUpperCase();
  const backgroundUrl = `../assets/BackgroundCards/${project.backgroundcard}`; 
  const starIcon = project.priority === 1 ? '⭐' : '★'

  return `
  <a class="card" href="/html/cardDetail.html?id=${project.id}" data-id="${project.id}" style="background-image: url('${backgroundUrl}');">
      <div class="card-body">
        <h5 class="card-title">${projectNameUpperCase}</h5>
        <button class="btn btn-primary delete-button" style="display:none;" >ELIMINAR</button>
        <button class="btn btn-star priority-button" style="display:none;">${starIcon}</button>
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
  // Cargamos el array de Session
  var arrayJSON_Projects = sessionStorage.getItem('projectsdb');
  var projects = JSON.parse(arrayJSON_Projects);
  //console.log("proyectos:", projects);

  // Mostrar los proyectos
  showRecentProjects(projects);
  showAllProjects(projects);
  showPriorityProjects(projects);

  // Evento para abrir el modal
  $('#openModal').click(function() {
    $('#addProjectModal').modal('show');
  });

  // Evento para agregar un proyecto
  $('#addProjectForm').submit(function(event) {
    event.preventDefault(); 
    console.log("Formulario de proyecto enviado"); 
    
    // Obtener los valores del formulario
    var projectName = $('#projectName').val();
    var projectDescription = $('#description').val();
    var projectDepartment = $('#department').val();
    var projectColor = $('#backgroundColor').val(); 
    var projectPriority = $('#priority').prop('checked') ? 1 : 0; 
    
    // Agregar el proyecto al array projects
    var newProject = {
      "id": projects.length, 
      "name": projectName,
      "description": projectDescription,
      "department": projectDepartment,
      "backgroundcolor": projectColor,
      "backgroundimage": "null",
      "backgroundcard": "default.jpg",
      "priority": projectPriority,
      "status": 1,
      "dateAccess": new Date().toString()
    };
    console.log("Nuevo proyecto creado:", newProject); 
    projects.push(newProject); 
    
    // Guardar el proyecto en Storage
    sessionStorage.setItem('projectsdb', JSON.stringify(projects)); 
    console.log("Proyecto guardado en localStorage:", projects);

    // Actualizar la variable projects después de guardar los datos en el almacenamiento local
    arrayJSON_Projects = sessionStorage.getItem('projectsdb');
    projects = JSON.parse(arrayJSON_Projects);
    console.log("localstorage::", arrayJSON_Projects);

    $('#addProjectModal').modal('hide');

    showRecentProjects(projects);
    showAllProjects(projects);
  });

  // Evento para filtrar los proyectos
  $('.filter-button').click(function() {
    $('.filter-button').removeClass('active');
    $(this).addClass('active');
    var category = $(this).data('filter');
    
    showAllProjects(projects, category);
  });

  // Evento para mostrar el tablero del proyecto
  $(document).on('click', '.card', function() {
    var projectId = $(this).data('id');
    console.log('Proyecto seleccionado:', projectId);
  });

  // Evento para cambiar la prioridad del proyecto
  $(document).on('click', '.priority-button', function(event) {
    event.stopPropagation();

    const card = $(this).closest('.card');
    const projectId = card.data('id');
    const project = projects.find(project => project.id === projectId)

    // Cambiar la prioridad del proyecto
    project.priority = project.priority === 1 ? 0 : 1;
    $(this).text(project.priority === 1 ? '⭐' : '★');

    sessionStorage.setItem('projectsdb', JSON.stringify(projects)); 
    showPriorityProjects(projects);
    
    return false;
  });

  // Evento para mostrar el botón de eliminación y prioridad
  $(document).on('mouseenter', '.card', function() {  
    $(this).find('.delete-button').show();
    $(this).find('.priority-button').show();
  });
  
  // Evento para ocultar el botón de eliminación
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
    return false; // Evita el comportamiento predeterminado del enlace
  });

});

