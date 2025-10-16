const registerForm = document.querySelector('.form-register');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = registerForm.querySelectorAll('input');

    const nombre = inputs[0].value;
    const email = inputs[1].value;
    const telefono = inputs[2].value;
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCompleto: nombre, 
                correo: email,         
                password: password,
                telefono: telefono,
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = 'login.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema de conexión. Por favor, intenta de nuevo.');
    }
});