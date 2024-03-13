function createProjectCard(project) {
  return `
    <div class="card">
      ${project.name}
    </div>
  `;
}

function showRecentProjects(projects) {
  const recentProjects = $('#recentProjects');
  recentProjects.empty();

  projects.sort((a,b) => new Date(b.lastAccessed)- new Date(a.lastAccessed));

  const projectsToShow = projects.slice(0, 4);

  projectsToShow.forEach(project => {
    const cardHTML = createProjectCard(project);
    recentProjects.append(cardHTML);
  });
}

function showAllProjects(projects, category = 'all') {
  const allProjects = $('#allProjects');
  allProjects.empty();

  console.log('Categoría seleccionada:', category); 

  let filteredProjects;
  
  if (category === 'all') {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter(project => project.department === category);
  }

  console.log('Proyectos filtrados:', filteredProjects); 

  filteredProjects.forEach(project => {
    const cardHTML = createProjectCard(project);
    allProjects.append(cardHTML);
  });
}

$(document).ready(function() {

  showRecentProjects(projects);
  showAllProjects(projects);

  // Evento para abrir el modal
  $('#openModal').click(function() {
    
    $('#addProjectModal').modal('show');
  });

  // Evento para agregar un proyecto
  $('#addProjectForm').submit(function(event) {
    
    event.preventDefault(); // Evitar el envío del formulario

    // obtener los valores del formulario y agregar el proyecto  a la BBDD
  
    // Obtener los valores del formulario
    var projectName = $('#projectName').val();
    var projectDescription = $('#projectDescription').val();
    var projectDepartment = $('#projectDepartment').val();
    var projectColor = $('#projectColor').val(); 
    var projectPriority = $('#projectPriority').prop('checked') ? 1 : 0; 

    // Agregar el proyecto al array projects
    var newProject = {
      "id": projects.length, 
      "name": projectName,
      "description": projectDescription,
      "department": projectDepartment,
      "backgroundcolor": projectColor,
      "backgroundimage": "null",
      "priority": projectPriority,
      "status": 1 
    };

    projects.push(newProject); 

 
    alert('Proyecto añadido: ' + projectName);

    $('#addProjectModal').modal('hide');
  });

  // Evento para filtrar los proyectos
  $('.filter-button').click(function() {
    
    $('.filter-button').removeClass('active');
    $(this).addClass('active');
    var category = $(this).data('filter');
    
    showAllProjects(projects, category);
  });


});