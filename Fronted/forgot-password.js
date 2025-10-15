const forgotPasswordForm = document.getElementById('forgot-password-form');

forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.msg);
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema de conexión. Intenta de nuevo más tarde.');
    }
});