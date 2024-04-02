
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
    });
}

  

});


