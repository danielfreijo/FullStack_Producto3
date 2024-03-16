$(document).ready(function(event) {
    
    var SelectedProject = sessionStorage.getItem('MyProject2');

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
            identificador = tasks.length + 1;

            tasks.push({"idtask":identificador, 
                        "project_id": $("#idproyecto").val(), 
                        "userassigned":$("#TaskAssigned").val(),
                        "nametask":$("TaskName").val(),
                        "descriptiontask":$("#TaskDescription").val(),
                        "startdate":$("#TaskStartDate").val(),
                        "enddate":$("#TaskEndDate").val(),
                        "backgroundcolor":$("#TaskBackground").val(),
                        "status":$("#TaskStatus").val()});
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
          console.log("Elemento soltado en la lista:", this.id);
          
        }
    }).disableSelection();

    function defineTask(index){
        var text = '<li class="TASK" draggable="true">';
        text += '<h5><a href="#" class="btn close-button deletetask" data="';
        text += index;
        text += '">❌</a></h5>';
        text += '<p class="texttask">';
        text += tasks[index]["nametask"];
        text += '<br>';
        text += '<input class="form-check-input" type="checkbox" id="taskstartdate" name="option1" value="';
        text += tasks[index]["startdate"];
        text += '" checked>';
        text += '<label class="form-check-label">' + tasks[index]["startdate"] + '</label></p>';
        text += '</li>';
        return text;
    };

    function TODOTask(ID_Project){
        $('#lst_todo').html("");
        $.each(tasks, function(index, data) {
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (data.status=="TODO" && data.project_id == ID_Project){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#lst_todo').append(defineTask(index));
            }
        });
    };

    function ONPROGRESSTask(ID_Project){
        $('#lst_onprogress').html("");
        $.each(tasks, function(index, data) {
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (data.status=="ONPROGRESS" && data.project_id == ID_Project){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#lst_onprogress').append(defineTask(index));
            }
        });
    };

    function COMPLETEDTask(ID_Project){
        $('#lst_completed').html("");
        $.each(tasks, function(index, data) {
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (data.status=="COMPLETED" && data.project_id == ID_Project){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#lst_completed').append(defineTask(index));
            }
        });
    };

});