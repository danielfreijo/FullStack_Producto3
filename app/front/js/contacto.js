
$(document).ready(function(event) {
    index = 0;

    // Cargamos el array de Session
    var arrayJSON_Users = sessionStorage.getItem('usersdb');
    var WorkingUsers = JSON.parse(arrayJSON_Users);

    $("#contactdata").html(showcontactdata(index));

    function showcontactdata(index){
        var texto = "";
        // ------------------------------
        texto +='<form name="project" id="project">';
        texto +='<div class="mb-3">';
        texto +='<label for="User_Name" class="form-label">Nombre del usuario</label>';
        texto +='<input type="text" class="form-control" id="User_Name" value=' + WorkingUsers[index]["nombre"] + '>';
        texto +='</div>';
        texto +='<div class="mb-3">';
        texto +='<label for="User_Rol" class="form-label">Rol del usuario</label>';
        texto +='<input type="text" class="form-control" id="User_Rol" value=' + WorkingUsers[index]["rol"] + '>';
        texto +='</div>';
        texto +='<div class="mb-3">';
        texto +='<label for="User_Name" class="form-label">Perfil del usuario</label>';
        texto +='<input type="text" class="form-control" id="User_Perfil" value=' + WorkingUsers[index]["Perfil"] + '>';
        texto +='</div>';
        texto +='<div class="mb-3">';
        texto +='<label for="User_Name" class="form-label">Responsabilidades del usuario</label>';
        texto +='<textarea class="form-control" id="User_responsabilidad">' + WorkingUsers[index]["Responsabilidades"] + '</textarea>';
        texto +='</div>';
        texto +='<div class="mb-3">';
        texto +='<label for="User_Name" class="form-label">Desafios del usuario</label>';
        texto +='<textarea class="form-control" id="User_desafios">' + WorkingUsers[index]["Desafios"] + '</textarea>';
        texto +='</div>';
        texto +='<div class="mb-3">';
        texto +='<label for="User_Name" class="form-label">Activo</label>';
        if ( arrayJSON_Users[index]["active"] == 1){
            texto +='<input class="form-check-input" type="checkbox" id="User_Active" name="option1" value="Activo" checked>';
        }else{
            texto +='<input class="form-check-input" type="checkbox" id="User_Active" name="option1" value="Activo">';
        }
        texto +='</div>';
        texto +="</form>";
        return texto;

    };


});