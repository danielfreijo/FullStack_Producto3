$(document).ready(function(event) {

    // Creamos las variables de sesion del entorno para pasar las variables.

    // $.session.set("MyName", "Carlos");
    // $.session.set("MyProject", NULL);
    // $.session.set("MyTask", NULL);
    sessionStorage.setItem('MyName2', "Carlos");
    sessionStorage.setItem('MyProject2', NULL);
    sessionStorage.setItem('MyTask2', NULL);

    var tempProjects = JSON.stringify(projects);
    var tempTasks = JSON.stringify(tasks);
    sessionStorage.setItem('projectsdb', tempProjects);
    sessionStorage.setItem('tasksdb', tempTasks);
    /* 
    
    Para leer

    var variable = sessionStorage.getItem('MyProject2');


    */

});
