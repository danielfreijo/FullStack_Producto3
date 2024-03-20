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
  const projectIndex = projects.findIndex(project => project.id == projectId); // Usamos findIndex para obtener el índice del proyecto
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

    // Mostrar INFO del proyecto en el sidebar y hacerlos editables
    $('#sidebarProjectName').text(project.name.toUpperCase())
    $('#sidebarProjectNameEdit').val(project.name)
    $('#sidebarDescription').text(project.description)
    $('#sidebarDepartment').val(project.department)
    $('#sidebarBackgroundColor').val(project.backgroundcolor) 
    
    // Guardar los cambios cuando se hace clic en el botón "Guardar Cambios"
    $('#saveChangesBtn').click(function() {
      var newName = $('#sidebarProjectNameEdit').val();
      var newDescription = $('#sidebarDescription').val();
      var newDepartment = $('#sidebarDepartment').val();
      var newBackgroundColor = $('#sidebarBackgroundColor').val();

      // Actualizar los valores del proyecto
      project.name = newName;
      project.description = newDescription;
      project.department = newDepartment;
      project.backgroundcolor = newBackgroundColor;

      // Guardar el proyecto actualizado en sessionStorage
      projects[projectIndex] = project;
      sessionStorage.setItem('projectsdb', JSON.stringify(projects));
      
      // Opcional: Mostrar un mensaje de éxito o realizar alguna otra acción después de guardar los cambios
      alert('Cambios guardados correctamente');
      location.reload();
    });

    // Aplicar el color de fondo al elemento deseado en la página
    $('body').css('background-color', `${project.backgroundcolor}`);
    
    // Abrir el menú lateral al hacer clic en el botón "INFORMACIÓN"
    $('#board-menu').click(function() {
      $('#sidebar-menu').css('width', '350px');
    });

     // Cerrar el sidebar
    $("#close-sidebar").click(function() {
      $("#sidebar-menu").css("width", "0");
    });

  }
});
  