// Suponiendo que tienes un array de tareas pendientes para cada proyecto
var tasks = {
    "Project A": [
        "Hacer tarea 1",
        "Completar tarea 2",
        "Revisar tarea 3"
    ],
    "Project B": [
        "Crear presentación",
        "Enviar reporte final"
    ],
    // Agrega más tareas para otros proyectos si es necesario
};

// Función para mostrar las tareas para un proyecto específico
function showTasks(projectName) {
    var todoList = $("#todoList");
    todoList.empty(); // Limpiar el contenido anterior

    if (tasks.hasOwnProperty(projectName)) {
        var projectTasks = tasks[projectName];

        // Crear una lista de tareas
        var list = $("<ul>");
        projectTasks.forEach(function(task) {
            var listItem = $("<li>").text(task);
            list.append(listItem);
        });

        // Mostrar la lista en la página
        todoList.append(list);
    } else {
        todoList.text("No hay tareas para este proyecto.");
    }
}

// Obtener el nombre del proyecto de la URL
var urlParams = new URLSearchParams(window.location.search);
var projectName = urlParams.get('project');

// Mostrar las tareas para el proyecto específico
showTasks(projectName);
