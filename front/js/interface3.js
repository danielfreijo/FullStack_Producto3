
$(document).ready(function() {
    // Al hacer clic en el botón de enviar
    $('#contactForm').submit(function(e) {
        e.preventDefault(); // Prevenir el comportamiento predeterminado de enviar el formulario

        // Obtener los valores del formulario
        var name = $('#name').val();
        var email = $('#email').val();
        var reason = $('#reason').val();
        var description = $('#description').val();

        // Mostrar mensaje de éxito
        var mensaje = "<p>¡Gracias por contactarnos!</p>";
        $('#mensaje-envio').html(mensaje);

        // Limpiar el formulario después de enviar
        $('#contactForm')[0].reset();
    });
});
