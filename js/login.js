/*cambiar entre login y registro */
function cambiar(formId) {
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

    document.getElementById(formId).classList.add('active');
    document.querySelector(`.tab[onclick*="${formId}"]`).classList.add('active');
}
$(document).ready(function () {
    $('.checklogin').click(async function (e) {
        e.preventDefault();

        let nombre = $('#username').val().trim();
        let password = $('#password').val().trim();

        if (!nombre || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await $.ajax({
                type: 'POST',
                url: 'https://api-tfc-five.vercel.app/api/checkLogin',
                contentType: 'application/json',
                data: JSON.stringify({ nombre, password })
            });

            // Si llega aquí, login exitoso
            alert(response.mensaje);
            window.location.href = "../html/home.html";

        } catch (error) {
            if (error.status === 401) {
                alert("Nombre o contraseña incorrecta.");
            } else {
                alert("Error en el servidor, intenta más tarde.");
                console.error(error);
            }
        }
    });

    $('.checkregis').click(async function (e) {
        e.preventDefault();

        const nombre = $('#nameNew').val().trim();
        const email = $('#emailNew').val().trim();
        const password1 = $('#contresena1').val();
        const password2 = $('#contrasena2').val();

        if (!nombre || !email || !password1 || !password2) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (password1 !== password2) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await $.ajax({
                type: 'POST',
                url: 'https://api-tfc-five.vercel.app/api/registrarse', // Ajusta la URL a tu backend
                contentType: 'application/json',
                data: JSON.stringify({
                    nombre: nombre,
                    email: email,
                    contrasenha: password1 
                })
            });

            alert(response.mensaje);

            if (response.success) {
                cambiar('login'); // Cambia a pestaña login tras registrarse
            }
        } catch (error) {
            alert(error.responseJSON?.mensaje || "Error en el servidor");
            console.error(error);
        }
    });


});