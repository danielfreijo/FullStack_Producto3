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
        var text='<div class="card" style="width: 18rem; background-color:' + WorkingProjects[index]["backgroundcolor"] + ';">';
        text +='<img class="card-img-top" src="../assets/' + WorkingProjects[index]["backgroundimage"] + '" alt="Card image cap">';  
        text +='<div class="card-img-overlay">';
        text +='<h5 class="card-title">'+ WorkingProjects[index]["name"];
        if (WorkingProjects[index]["status"]!=1){
            // Si un proyecto esta completado no se puede eliminar.
            text +='<a href="#" class="btn close-button deteleproject" data="'+ WorkingProjects[index]["id"]+'">❌</a>'; 
        };
        text +='</h5>';
        text +='<p class="card-text" style="width:100px;overflow-wrap: break-word;">';
        text +=WorkingProjects[index]["description"];
        text +='</p>';
        text +='</div>';
        text +='<div class="card-footer" style="background-color:' + WorkingProjects[index]["backgroundcolor"] + '">';
        if (WorkingProjects[index]["priority"]==0){
            text +='<a href="#" class="btn priority" style="position:absolute;left:3px" data_project="'+ WorkingProjects[index]["id"]+'">★</a>';
        }else{
            text +='<a href="#" class="btn priority" style="position:absolute;left:3px" data_project="'+ WorkingProjects[index]["id"]+'">⭐</a>';
        };
        text +='<a href="#" class="btn editproject" style="position:relative;left:100px" data_project="'+ WorkingProjects[index]["id"]+'">📝</a>';
        text +='<a href="#" class="btn openproject" style="position:absolute;right:3px"  data_project="'+ WorkingProjects[index]["id"]+'">➠</a>';
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

            $.each(WorkingTasks, function(index_task, data_task){
                // La tarea corresponde al proyecto
                if ( data_task.project_id == data_project.id ){
                    // Veamos la fecha de creación de la tarea
                    var v_enddate = new Date(data_task.startdate);  // Establecemos la fecha de incio del proyecto
                    var diff = Math.abs(v_startdate-v_enddate); // Diferencia de dias entre la fecha actual y la fecha de inicio del proyecto
                    var diff_days=diff/(1000*60*60*24); // Lo pasamos a dias
                    // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
                    if (diff_days<=30 && recent==0){
                        // Añadimos la tarjeta del proyecto a la vista de recientes
                        recent=1;
                    }
                }
            });

            // Si alguna tarea a cumplido con la condición de ser reciente entonces añadimos el proyecto a la vista de recientes
            if (recent==1){
                $('#RecentProjects').append(defineCard(index));
                recent = 0;
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
        var id=$(this).attr("data_project");
        console.log(id);
        // Modificamos el objeto session "MyProject" con el valor del proyecto seleccionado.
        sessionStorage.setItem('MyProject', id);
        //$.session.set("MyProject", id);
        e.stopPropagation();

        window.location.href = "interface2.html";
        
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
    
    $(".filterproject").on("click", function(e){
        var filterappliced = $(this).find("a").attr("dataproject");
        console.log(filterappliced);
        allProjects(filterappliced);
    });

    $(".deteleproject").on("click", function(e){
        e.preventDefault();
        var filterappliced =$(this).attr("data");
        console.log(filterappliced);
        alert("Seguro que quieres borrarlo");
        e.stopPropagation();
    });

    $(".priority").on("click", function(e){
        e.preventDefault();
        var filterappliced = $(this).attr("data");
        console.log(filterappliced);
        alert("Seguro que quieres cambiar la prioridad");
        e.stopPropagation();
    });
    
    $(".editproject").on("click", function(e){
        e.preventDefault();
        var filterappliced =$(this).attr("data");
        console.log(filterappliced);
        alert("Seguro que quieres editarlo");
        e.stopPropagation();
    });


});