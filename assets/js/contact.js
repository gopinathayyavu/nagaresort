const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const name = document.getElementById('name').value;

    const email = document.getElementById('email').value;

    const phone = document.getElementById('phone').value;

    const message = document.getElementById('message').value;

    const newMessageRef = db.ref('messages').push();

    newMessageRef.set({

        name: name,

        email: email,

        phone: phone,

        message: message,

        createdAt: new Date().toISOString()

    })

    .then(() => {

        alert('Message Sent Successfully');

        contactForm.reset();

    })

    .catch(error => {

        alert(error.message);

    });

});