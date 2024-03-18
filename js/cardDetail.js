$(document).ready(function() {
  // Obtener el ID del proyecto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  // Obtener los proyectos del sessionStorage
  var projectsJSON = sessionStorage.getItem('projectsdb');
  var projects = JSON.parse(projectsJSON);

  console.log('Proyectos:', projects);
  console.log('ID del proyecto:', projectId);

  // Buscar el proyecto correspondiente en el array de proyectos
  const project = projects.find(project => project.id == projectId);

  if (project) {
      // Mostrar el nombre del proyecto en la barra de navegación
      $('#projectName').text(project.name.toUpperCase());
      console.log('Proyecto encontrado:', project);

      // Aplicar el color de fondo al elemento deseado en la página
      $('body').css('background-color', `${project.backgroundcolor}`);
  }

});
  