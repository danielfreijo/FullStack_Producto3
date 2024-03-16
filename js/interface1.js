$(document).ready(function(event) {

    allProjects();
    recentProjects();
    
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
        var id=$(this).attr("data");
        window.location.href = "interface2.html?id="+id;
        e.stopPropagation();
    });

    $('#project').on('submit', function(e) {
    // Evita que se ejecute automáticamente
        e.preventDefault();
        identificador = projects.length + 1;
        
        projects.push({"id":(projects.length + 1), 
                    "name": $("#ProjectName").val(), 
                    "description":$("#ProjectDescription").val(),
                    "department":$("ProjecDepartment").val(),
                    "startdate":$("#ProjectStartDate").val(),
                    "enddate":$("#ProjectEndDate").val(),
                    "backgroundcolor":$("#ProjectBackgroundColod").val(),
                    "backgroundimage":$("#ProjectBackgroundImage").val(),
                    "priority":$("#ProjectPriority").val(),
                    "status":$("#ProjectStatus").val()});
        // Actualizo las listas de Proyectos
        allProjects();
        recentProjects();
        $("#ModalForm").modal('hide');
        e.stopPropagation();
      });


    // --------------------------------------------------------------------------
    // PROYECTOS
    // --------------------------------------------------------------------------

    function defineCard(index){
        var text='<div class="card" style="width: 18rem;">';
        text +='<img class="card-img-top" src="../assets/' + projects[index]["backgroundimage"] + '" alt="Card image cap">';  
        text +='<div class="card-img-overlay">';
        text +='<h5 class="card-title">'+ projects[index]["name"];
        if (projects[index]["status"]!=1){
            // Si un proyecto esta completado no se puede eliminar.
            text +='<a href="#" class="btn close-button deteleproject" data="'+ projects[index]["id"]+'">❌</a>'; 
        };
        text +='</h5>';
        text +='<p class="card-text" style="width:100px;overflow-wrap: break-word;">';
        text +=projects[index]["description"];
        text +='</p>';
        text +='</div>';
        text +='<div class="card-footer">';
        if (projects[index]["priority"]==0){
            text +='<a href="#" class="btn priority" style="position:absolute;left:3px" data="'+ projects[index]["id"]+'">★</a>';
        }else{
            text +='<a href="#" class="btn downgrade" style="position:absolute;left:3px" data="'+ projects[index]["id"]+'">⭐</a>';
        };
        text +='<a href="#" class="btn editproject" style="position:relative;left:100px" data="'+ projects[index]["id"]+'">📝</a>';
        text +='<a href="#" class="btn openproject" style="position:absolute;right:3px"  data="'+ projects[index]["id"]+'">➠</a>';
        text +='</div>';
        text +='</div>';
        return text;
    };

    function recentProjects(){
        $('#RecentProjects').html("");
        var v_startdate = new Date();
        v_startdate.setHours(0,0,0,0); // Establece la hora a medianoche
        $.each(projects, function(index, data) {
            var v_enddate = new Date(data.startdate);  // Establecemos la fecha de incio del proyecto
            var diff = Math.abs(v_startdate-v_enddate); // Diferencia de dias entre la fecha actual y la fecha de inicio del proyecto
            var diff_days=diff/(1000*60*60*24); // Lo pasamos a dias
            // Si es un proyecto de hace 30 dias o menos lo mostramos como reciente
            if (diff_days<=30){
                // Añadimos la tarjeta del proyecto a la vista de recientes
                $('#RecentProjects').append(defineCard(index));
            }
        });
    };

    function allProjects(){
        $('#AllProjects').html("");
        $.each(projects, function(index, data) {
            // Añadimos el Proyecto a la vista de todos.
            $('#AllProjects').append(defineCard(index));
        });
    };
    
});