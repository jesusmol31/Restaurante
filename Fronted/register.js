// Select the form using its class.
const registerForm = document.querySelector('.form-register');

// Add an event listener to handle the form submission.
registerForm.addEventListener('submit', async (e) => {
    // Prevent the default form submission behavior (page reload).
    e.preventDefault();

    // Select all input elements inside the form.
    const inputs = registerForm.querySelectorAll('input');

    // Get the values from the input fields in the order they appear.
    // This method is less robust than using IDs but works with your current HTML.
    const nombre = inputs[0].value;
    const email = inputs[1].value;
    const telefono = inputs[2].value;
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;

    // Basic front-end validation to check if passwords match.
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
    }

    try {
        // Send a POST request to your backend API.
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, password, telefono }) // Send data as a JSON string.
        });

        // Parse the JSON response from the server.
        const data = await response.json();

        // Check if the request was successful.
        if (response.ok) {
            alert(data.msg);
            // Optionally redirect the user to the login page after successful registration.
            window.location.href = 'login.html';
        } else {
            // Display the error message from the backend.
            alert(data.msg);
        }
    } catch (error) {
        // Handle any network or connection errors.
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema de conexión. Por favor, intenta de nuevo.');
    }
});