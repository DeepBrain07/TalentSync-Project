document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Your form submission logic goes here (e.g., AJAX request with axios)
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const formData = {email:email, password:password}
    axios.post(this.action, formData)
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            window.location.href = '../src/blogs.html';
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '../src/blogs.html';
        });
});