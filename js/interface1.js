$(document).ready(function(event) {
    
    // Cargamos el array de Session
    var arrayJSON_Projects = sessionStorage.getItem('projectsdb');
    var WorkingProjects = JSON.parse(arrayJSON_Projects);

    var arrayJSON_task = sessionStorage.getItem('tasksdb');
    var WorkingTasks = JSON.parse(arrayJSON_task);

    // Actualizamos los proyectos
    allProjects("ALL");
    recentProjects();

    // --------------------------------------------------------------------------
    // FUNCIONES
    // --------------------------------------------------------------------------

    // Función para definir la tarjeta del proyecto
    // Entra el indice del proyecto a mostrar en la tarjeta
    // Devuelve una variable de texto para insertar la en HTML
    function defineCard(index){
        var text='<div class="card" style="background-color:' + WorkingProjects[index]["backgroundcolor"] + ';">';
        text +='<img class="card-img-top" src="../assets/' + WorkingProjects[index]["backgroundimage"] + '" alt="Card image cap">';  
        text +='<div class="card-img-overlay">';
        text +='<h5 class="card-title">'+ WorkingProjects[index]["name"];
        if (WorkingProjects[index]["status"]!=1){
            // Si un proyecto esta completado no se puede eliminar.
            text +='<a href="#" class="btn close-button deteleproject" data_project="'+ WorkingProjects[index]["id"]+'">❌</a>'; 
        };
        text +='</h5>';
        text +='<p class="card-text">';
        text +=WorkingProjects[index]["description"];
        text +='</p>';
        text +='</div>';
        text +='<div class="card-footer" style="background-color:' + WorkingProjects[index]["backgroundcolor"] + '; z-index=9990">';
        if (WorkingProjects[index]["priority"]==0){
            text +='<a href="#" class="btn priority" data_project="'+ WorkingProjects[index]["id"]+'">★</a>';
        }else{
            text +='<a href="#" class="btn priority" data_project="'+ WorkingProjects[index]["id"]+'">⭐</a>';
        };
        text +='<a href="#" class="btn editproject" data_project="'+ WorkingProjects[index]["id"]+'">📝</a>';
        text +='<a href="#" class="btn openproject" data_project="'+ WorkingProjects[index]["id"]+'">➠</a>';
        text +='</div>';
        text +='</div>';
        return text;
    };

    // Función para filtrar los proyectos recientes
    //
    function recentProjects(){
        $('#RecentProjects').html("");
        var v_startdate = new Date();
        var recent=0;
        v_startdate.setHours(0,0,0,0); // Establece la hora a medianoche

        $.each(WorkingProjects, function(index_project, data_project) {
            // Veamos la fecha de creación de la tarea
            var v_enddate = new Date(data_project.dataAccess);  // Establecemos la fecha de incio del proyecto
            var diff = Math.abs(v_startdate-v_enddate); // Diferencia de dias entre la fecha actual y la fecha de inicio del proyecto
            var diff_days=diff/(1000*60*60*24); // Lo pasamos a dias
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (diff_days<=30 && recent==0){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#RecentProjects').append(defineCard(index_project));
            }
        });
    };

    // Función para filtrar todos los proyectos
    function allProjects(filter){
        $('#AllProjects').html("");
        $.each(WorkingProjects, function(index, data) {
            // Añadimos el Proyecto a la vista de todos.
            if (filter=="ALL"){
                $('#AllProjects').append(defineCard(index));
            }else{
                if (data.department == filter){
                    $('#AllProjects').append(defineCard(index));
                }
            }
            
        });
    };


    $("#dialog-confirm").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        text: "¿Está seguro de querer realizar esta acción?",
        buttons: {
            "Sí": function() {
                var filterapplied = $(this).data('filterapplied');
                WorkingProjects.splice(filterapplied,1);
                var arrayJSON = JSON.stringify(WorkingProjects);
                sessionStorage.setItem('projectsdb', arrayJSON);
                allProjects("ALL");
                recentProjects();
                $(this).dialog("close");
            },
            "No": function() {
                $(this).dialog("close");
            }
        }
    });

    $("#dialog-priority").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        text: "¿Confirma cambiar la prioridad del proyecto?",
        buttons: {
            "Sí": function() {
                var filterapplied = $(this).data('filterapplied');
                if (WorkingProjects[filterapplied]["priority"] ==  1){
                    WorkingProjects[filterapplied]["priority"] =  0;
                } else {
                    WorkingProjects[filterapplied]["priority"] =  1;
                }
                var arrayJSON = JSON.stringify(WorkingProjects);
                sessionStorage.setItem('projectsdb', arrayJSON);
                allProjects("ALL");
                recentProjects();
                $(this).dialog("close");
            },
            "No": function() {
                $(this).dialog("close");
            }
        }
    });

    $("#dialog-alert").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        text: "Alerta!!!!",
        buttons: {
            "Aceptar": function() {
                $(this).dialog("close");
            }
        }
    });

    function returnarrayindex(index) {
        var foundvalue = -1; // Inicializamos en -1 para indicar que no se encontró el valor
        $.each(WorkingProjects, function(index_project, data_project) {
            if (data_project.id == index) {
                foundvalue = index_project;
                return false; // Termina el bucle each una vez que se encuentra el valor
            }
        });
        return foundvalue;
    }

    // -----------------------------------------------------------------------------------------------------
    // EVENTOS formularios PROJECTS
    // -----------------------------------------------------------------------------------------------------

    $('#refresh1').on("click", function(e){
        allProjects();
        recentProjects();
    });

    $('#refresh2').on("click", function(e){
        allProjects();
        recentProjects();
    });

    $('#addproject').on("click", function(e){
        e.preventDefault();
        // Cambio el titulo
        $("#TitleModal").text("NUEVO PROYECTO");
        // Abro el formulario modal
        $("#ModalForm").modal('show');
    });

    // Cierra el modal al hacer clic en la "X"
    $(".close").click(function() {
        $("#ModalForm").modal('hide');
    });

    $(".openproject").on("click", function(e){
        // Abrimos el proyecto para asignar tareas
        e.preventDefault();
        var id=returnarrayindex($(this).attr("data_project"));
        // Modificamos el objeto session "MyProject" con el valor del proyecto seleccionado.
        sessionStorage.setItem('MyProject', id);
        e.stopPropagation();
        window.location.href = "interface3.html";
    });
    
    $(".filterproject").on("click", function(e){
        var filterapplied = $(this).find("a").attr("dataproject");
        console.log(filterapplied);
        allProjects(filterapplied);
    });

    $(".deteleproject").on("click", function(e){
        e.preventDefault();
        var filterapplied = returnarrayindex($(this).attr("data_project"));
        $("#dialog-confirm").dialog("open");

        $("#dialog-confirm").dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            text: "¿Está seguro de querer realizar esta acción?",
            buttons: {
              "Sí": function() {
                // Acción si el usuario hace clic en Sí
                WorkingProjects.splice(filterapplied,1);
                // Ahora hay que volverlo a subir al objeto de session
                var arrayJSON = JSON.stringify(WorkingProjects);
                sessionStorage.setItem('projectsdb', arrayJSON);
                // Actualizamos los proyectos
                allProjects("ALL");
                recentProjects();
                $(this).dialog("close");
              },
              "No": function() {
                // Acción si el usuario hace clic en No
                $(this).dialog("close");
              }
            }
          });
        e.stopPropagation();
    });
    
    $(".priority").on("click", function(e){
        e.preventDefault();
        // Hay que tener el indice del array para poder cambiar la prioridad.
        var filterapplied = returnarrayindex($(this).attr("data_project"));
        $("#dialog-priority").dialog("open");

        $("#dialog-priority").dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            text: "¿Confirma cambiar la prioridad del proyecto?",
            buttons: {
              "Sí": function() {
                // Acción si el usuario hace clic en Sí
                if (WorkingProjects[filterapplied]["priority"] ==  1){
                    WorkingProjects[filterapplied]["priority"] =  0;
                }else{
                    WorkingProjects[filterapplied]["priority"] =  1;
                }
                // Ahora hay que volverlo a subir al objeto de session
                var arrayJSON = JSON.stringify(WorkingProjects);
                sessionStorage.setItem('projectsdb', arrayJSON);
                // Recargamos los proyectos existentes.
                allProjects("ALL");
                recentProjects();
                $(this).dialog("close");
              },
              "No": function() {
                // Acción si el usuario hace clic en No
                confirmado = false;
                $(this).dialog("close");
              }
            }
        });
        e.stopPropagation();
    });
    
    $(".editproject").on("click", function(e){
        e.preventDefault();
        // Hay que tener el indice del Array  para poder editarlo
        var filterapplied = returnarrayindex($(this).attr("data"));
        alert("Seguro que quieres editarlo");
        e.stopPropagation();
    });

    $('#project').on('submit', function(e) {
        var ErrorMSG = "";
    // Evita que se ejecute automáticamente
        e.preventDefault();
        identificador = WorkingProjects.length;

        // Verificar que se han rellenado todos los campos
        if ($("#ProjectName").val()==="") {
            // Tiene que ser un modal de error
            ErrorMSG += "Por favor, debe introducir el nombre del proyecto.<br>";
            $("#ProjectName").css('background-color', 'red');
        }
        if ($("#ProjectDescription").val()==="") {
            // Tiene que ser un modal de error
            ErrorMSG += "Por favor, debe introducir la descripción del proyecto.<br>";
            $("#ProjectDescription").css('background-color', 'red');
        }
        if ($("#ProjecDepartment").val()==="") {
            // Tiene que ser un modal de error
            ErrorMSG += "Por favor, debe introducir el nombre del Departamento.<br>";
            $("#ProjecDepartment").css('background-color', 'red');
        }
        if ($("#ProjectBackgroundColod").val()==="") {
            // Tiene que ser un modal de error
            ErrorMSG += "Por favor, debe introducir el color de fondo de la tarjeta del proyecto.<br>";
            $("#ProjectBackgroundColod").css('background-color', 'red');
        }
        if ($("#ProjectBackgroundImage").val()==="") {
            // Tiene que ser un modal de error
            ErrorMSG += "Por favor, debe introducir la imagen de fondo del proyecto.<br>";
            $("#ProjectBackgroundImage").css('background-color', 'red');
        }
        if ($("#ProjectPriority").val()==="") {
            // Tiene que ser un modal de error
            ErrorMSG += "Por favor, debe introducir si es prioritario o no el proyecto.<br>";
            $("#ProjectPriority").css('background-color', 'red');
        }
        if ($("#ProjectStatus").val()==="") {
            // Tiene que ser un modal de error
            ErrorMSG += "Por favor, debe introducir el estado del proyecto.<br>";
            $("#ProjectStatus").css('background-color', 'red');
        }

        // Si todo está correcto podemos agregarlo al ARRAY
        if (ErrorMSG.length === 0){
            WorkingProjects.push({"id": identificador, 
            "name": $("#ProjectName").val(), 
            "description":$("#ProjectDescription").val(),
            "department":$("ProjecDepartment").val(),
            "backgroundcolor":$("#ProjectBackgroundColod").val(),
            "backgroundimage":$("#ProjectBackgroundImage").val(),
            "priority":$("#ProjectPriority").val(),
            "status":$("#ProjectStatus").val()});

            // Ahora hay que volverlo a subir al objeto de session
            var arrayJSON = JSON.stringify(WorkingProjects);
            sessionStorage.setItem('projectsdb', arrayJSON);

            $("#ModalForm").modal('hide');
            // Actualizo las listas de Proyectos
            allProjects($("ProjecDepartment").val());
            recentProjects();
        } else {
            // Tiene que ser un modal de error
            alert (ErrorMSG);

        };
        e.stopPropagation();        
      });

});
