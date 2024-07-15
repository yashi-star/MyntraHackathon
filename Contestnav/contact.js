document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !contact || !subject || !message) {
        document.getElementById('formMessage').textContent = 'Please fill out all fields.';
        return;
    }

    // Simple success message (In a real application, you'd send the data to a server here)
    document.getElementById('formMessage').textContent = 'Your message has been sent successfully!';

    // Clear the form fields
    document.getElementById('contactForm').reset();
});
