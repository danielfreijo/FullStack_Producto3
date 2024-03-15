$(document).ready(function() {
    // Obtener el ID del proyecto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
  
    // Buscar el proyecto correspondiente en el array de proyectos
    const project = projects.find(project => project.id == projectId);
  


    if (project) {
        
        // Mostrar el nombre del proyecto en la barra de navegación
        $('#projectName').text(project.name);

        // Aplica el color de fondo al elemento deseado en la página
        $('body').css('background-color', `#${project.backgroundcolor}`);
    }
  });