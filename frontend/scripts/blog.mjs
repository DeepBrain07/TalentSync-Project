document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const post = document.getElementById('post').value;
    const formData = {title:title, post:post}
    axios.post(this.action, formData)
        .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
            window.location.href = '../src/blogs.html';
        })
        .catch(error => {
            console.error('Error:', error);
            // window.location.href = '../src/blogs.html';
        });

})

 