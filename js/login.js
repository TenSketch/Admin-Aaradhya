// login.js - Handles Firebase Auth for login page
// Now using backend API for authentication

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
}

function showLoading(show) {
    const button = document.getElementById('loginButton');
    const buttonText = document.getElementById('loginButtonText');
    const spinner = document.getElementById('loginSpinner');
    if (show) {
        button.disabled = true;
        buttonText.textContent = 'Signing In...';
        spinner.classList.remove('hidden');
    } else {
        button.disabled = false;
        buttonText.textContent = 'Sign In';
        spinner.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showError('Please enter both email and password.');
            return;
        }
        showLoading(true);
        hideError();
        try {
            const res = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await res.json();
            if (res.ok && result.success) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminUsername', email);
                window.location.href = 'index.html';
            } else {
                showError(result.error || 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            showError('Login failed. Please try again.');
        }
        showLoading(false);
    });
});

if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'index.html';
}
