// Seleccionamos el formulario por su clase
const loginForm = document.querySelector('.form-login');

// Seleccionamos los campos de entrada dentro del formulario por su tipo
const emailInput = loginForm.querySelector('input[type="text"]');
const passwordInput = loginForm.querySelector('input[type="text"]:nth-of-type(2)');

// Agregamos un "escuchador de eventos" para cuando se envíe el formulario
loginForm.addEventListener('submit', async (e) => {
    // Evita que el formulario recargue la página
    e.preventDefault();

    // Obtenemos los valores de los campos
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Hacemos la solicitud POST a la API del backend
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Obtenemos la respuesta del servidor en formato JSON
        const data = await response.json();

        // Si la respuesta es exitosa
        if (response.ok) {
            // Guardamos el token de autenticación para futuras peticiones
            localStorage.setItem('token', data.token);
            alert('Inicio de sesión exitoso!');
            // Redirigimos al usuario a la página del menú
            window.location.href = 'menu.html';
        } else {
            // Si hay un error, mostramos el mensaje que viene del backend
            alert(data.msg || 'Credenciales inválidas');
        }
    } catch (error) {
        // Manejamos cualquier error de red o de conexión
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema de conexión. Intenta de nuevo más tarde.');
    }
});