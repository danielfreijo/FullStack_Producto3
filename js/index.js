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
                <p class="card-text">Esta es una tarjeta de ejemplo para mostrar cómo agregar un nuevo elemento al listado.</p>
                <a href="#" class="btn btn-primary">Ir a alguna parte</a>
            </div>
        </div>
      `;
  
      // Agregar la nueva "card" al contenedor de tarjetas
      $('#cardList').append(newCard);
    });

});