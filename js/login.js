// login.js - Handles Firebase Auth for login page
import { auth, signInWithEmailAndPassword } from './firebase-auth.js';

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
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        if (!email || !password) {
            showError('Please enter both email and password.');
            return;
        }
        showLoading(true);
        hideError();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('adminUsername', email);
            window.location.href = 'index.html';
        } catch (error) {
            showError('Invalid email or password. Please try again.');
        }
        showLoading(false);
    });

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'index.html';
}
