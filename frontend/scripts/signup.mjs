
const warning = document.getElementById("warning");
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Your form submission logic goes here (e.g., AJAX request with axios)
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const formData = {email:email, name:name, username:username, password:password}
    axios.post(this.action, formData)
        .then(response => {
            // Handle the response data here
            if (response.status === 200) {
                console.log('Response:', response);
                window.location.href = '../src/signin.html';   
            } else {
                warning.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warning.style.display = 'block';
            // window.location.href = '../src/blogs.html';
        });
});