$(document).ready(function(event) {
    // Cargamos el array de Session
    var arrayJSON_Projects = sessionStorage.getItem('projectsdb');
    var WorkingProjects = JSON.parse(arrayJSON_Projects);

    var arrayJSON_task = sessionStorage.getItem('tasksdb');
    var WorkingTasks = JSON.parse(arrayJSON_task);

    var SelectedProject = sessionStorage.getItem('MyProject');

    console.log(WorkingProjects);
    console.log(WorkingTasks);
    console.log(SelectedProject);


    // Mostramos el nombre del proyecto
    $("#ProjectName").html(WorkingProjects[SelectedProject].name);

    // Actualizamos la lista de tareas
    TODOTask(SelectedProject);
    ONPROGRESSTask(SelectedProject);
    COMPLETEDTask(SelectedProject);

    // --------------------------------------------------------------------------
    // EVENTOS Formularios TAREAS
    // --------------------------------------------------------------------------

    $('#addtask').on("click", function(e){
        e.preventDefault();
        // Cambio el titulo
        $("#TitleModal").text("NUEVA TAREA");
        // Abro el formulario modal
        $("#ModalForm").modal('show');
    });

    $('#task').on('submit', function(e) {
        // Evita que se ejecute automáticamente
            e.preventDefault();
            identificador = WorkingTasks.length + 1;

            WorkingTasks.push({"idtask":identificador, 
                        "project_id": $("#idproyecto").val(), 
                        "userassigned":$("#TaskAssigned").val(),
                        "nametask":$("TaskName").val(),
                        "descriptiontask":$("#TaskDescription").val(),
                        "startdate":$("#TaskStartDate").val(),
                        "enddate":$("#TaskEndDate").val(),
                        "backgroundcolor":$("#TaskBackground").val(),
                        "status":$("#TaskStatus").val()});
            // Ahora hay que volverlo a subir al objeto de session
            var arrayJSON = JSON.stringify(WorkingTasks);
            sessionStorage.setItem('tasksdb', arrayJSON);

            // Actualizo las listas de Proyectos
            TODOTask(SelectedProject);
            ONPROGRESSTask(SelectedProject);
            COMPLETEDTask(SelectedProject);
            $("#ModalForm").modal('hide');
            e.stopPropagation();
        });

    // --------------------------------------------------------------------------
    // TAREAS
    // --------------------------------------------------------------------------

    $(".sortable").sortable({
        connectWith: ".sortable",
        // Puedes definir otras opciones aquí
        receive: function(event, ui) {
          // Esta función se ejecuta cuando se suelta un elemento en la lista
          var TaskNumber = parseInt($(ui.item).attr("taskdata"));
            console.log(event);
            console.log(ui);

          console.log (TaskNumber);
          console.log("Elemento " + TaskNumber + " soltado en la lista:" + this.id);
          switch (this.id){
            case "lst_onprogress":
                WorkingTasks[TaskNumber].status=("ONPROGRESS");
            break;
            case "lst_todo":
                WorkingTasks[TaskNumber].status=("TODO");
            break;
            case "lst_completed":
                WorkingTasks[TaskNumber].status=("COMPLETED");
            break;
          }
          console.log("Estado actualizado:", WorkingTasks[TaskNumber]);
          // Ahora hay que volverlo a subir al objeto de session
          var arrayJSON = JSON.stringify(WorkingTasks);
          sessionStorage.setItem('tasksdb', arrayJSON);
        }
    }).disableSelection();

    function defineTask(index){
        var text = '<li class="TASK" draggable="true" taskdata="' + index + '">';
        text += '<h5><a href="#" class="btn close-button deletetask" >❌</a></h5>';
        text += '<p class="texttask">';
        text += WorkingTasks[index]["nametask"];
        text += '<br>';
        text += '<input class="form-check-input" type="checkbox" id="taskstartdate" name="option1" value="';
        text += WorkingTasks[index]["startdate"];
        text += '" checked>';
        text += '<label class="form-check-label">' + WorkingTasks[index]["startdate"] + '</label></p>';
        text += '</li>';
        return text;
    };

    function TODOTask(ID_Project){
        $('#lst_todo').html("");
        $.each(WorkingTasks, function(index, data) {
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (data.status=="TODO" && data.project_id == ID_Project){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#lst_todo').append(defineTask(index));
            }
        });
    };

    function ONPROGRESSTask(ID_Project){
        $('#lst_onprogress').html("");
        $.each(WorkingTasks, function(index, data) {
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (data.status=="ONPROGRESS" && data.project_id == ID_Project){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#lst_onprogress').append(defineTask(index));
            }
        });
    };

    function COMPLETEDTask(ID_Project){
        $('#lst_completed').html("");
        $.each(WorkingTasks, function(index, data) {
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (data.status=="COMPLETED" && data.project_id == ID_Project){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#lst_completed').append(defineTask(index));
            }
        });
    };

});