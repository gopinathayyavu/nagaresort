const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
    .then(async(userCredential) => {

        const token = await userCredential.user.getIdToken();

        localStorage.setItem('adminToken', token);

        window.location.href = 'admin.html';
    })
    .catch(error => {
        document.getElementById('error').innerText = error.message;
    });
});