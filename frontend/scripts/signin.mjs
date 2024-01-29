
const warning = document.getElementById("warning");
const warning2 = document.getElementById("warning2");

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Your form submission logic goes here (e.g., AJAX request with axios)
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const formData = {email:email, password:password}
    axios.post(this.action, formData)
        .then(response => {
            // Handle the response data here
            if (response.status === 200) {
                localStorage.setItem('jwt', response.data.token.jwt)
                localStorage.setItem('userId', response.data.token.userId)
                localStorage.setItem('numOfPosts', response.data.numOfPosts)
                console.log('Response:', response.data, {headers: {withCredentials: true}});
                window.location.href = '../src/blogs.html';
            } else {
                warning2.style.display = 'block';    
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
            warning.style.display = 'block';
        });
});