$(document).ready(function() {

    // Cuando se hace clic en el botón "Añadir elemento"
    $('#addCardButton').on('click', function() {
      // 
      // Crear un nuevo elemento "card"
      const newCard = `
        <div class="card" style="width: ;">
            <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Título de la tarjeta</h5>
                <p class="card-text">

                
                
                </p>
                <a href="#" class="btn btn-primary">Ir a alguna parte</a>
            </div>
        </div>
      `;
  
      // Agregar la nueva "card" al contenedor de tarjetas
      $('#cardList').append(newCard);
    });

});

// Codigo extra
// -----------------------------------------------------------------------------------------------------
//MODIFICAR COOKIE
function updateCookieValue(nombre, nuevoValor) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(nombre + "=")) {
        document.cookie = cookie.substring(0, nombre.length + 1) + nuevoValor;
        break;
        }
    }
}
//ACCEDER A LA COOKIE Y MOSTRAR
function getCookieValue(nombre) {
var cookies = document.cookie.split(";"); // Divide la cadena de cookies en un array
console.log(cookies);
for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim(); // Elimina los espacios en blanco al principio y al final
    if (cookie.startsWith(nombre + "=")) {
    return cookie.substring(nombre.length + 1); // Retorna el valor de la cookie
    }
}
return null; // Si no se encuentra la cookie, retorna null
}