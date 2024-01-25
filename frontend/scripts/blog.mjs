const blogs = document.getElementById("blogs");
const upload = document.getElementById("upload")
const closepopup = document.getElementById("closepoup")
const formContainer = document.getElementById("formContainer")
const more = document.getElementById("more");
const fullBody = document.getElementById("fullBody");
let data = {}
more.onclick = () => {
    data = {more:true}
}

upload.onclick = () => {
    formContainer.style.display = "block";
    upload.style.display = "none";
    fullBody.classList = "inactive";
}

closepopup.onclick = () => {
    formContainer.style.display = "none";
    upload.style.display = "block";
    fullBody.classList.remove("inactive");
}

axios.get('http://localhost:5000/blog')
.then(response => {
    if (response.data.blogs.length < 10) {
        more.style.display = "none"
    }
    console.log(response.data.blogs, data)
    for (i=0; i <= response.data.blogs.length; i++) {
        const parentDiv = document.createElement('div');
        parentDiv.id = "parentDiv"
        const parentDiv2 = document.createElement('div');
        parentDiv2.id = "parentDiv2"
        const parentDiv3 = document.createElement('div');
        parentDiv3.id = "parentDiv3"
        const titleDiv = document.createElement('div');
        titleDiv.id = "titleDiv"
        // Create a child p element
        const title = document.createElement('div');
        title.id = "blogTitle"
        const updateBlog = document.createElement('div');
        updateBlog.id = response.data.blogs[i]._id
        updateBlog.className = "updateBlog"
        updateBlog.textContent = 'update'
        updateBlog.addEventListener('click', function() {
            console.log('Update button clicked for ID:', updateBlog.id);
            formContainer.style.display = "block";
            upload.style.display = "none";
            fullBody.classList = "inactive";
            const title = document.getElementById('title').value;
            title.value = "ddddddddddddd";
            const post = document.getElementById('post').value;
            const formData = {title:title, post:post}
            axios.post(this.action, formData)
                .then(response => {
                    console.log("here")
                    // Handle the response data here
                    // if (response)
                    // console.log('Response:', response.code);
                    // window.location.href = '../src/blogs.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    // window.location.href = '../src/blogs.html';
                });
          });
        const deleteBlog = document.createElement('div');
        deleteBlog.className = "deleteBlog"
        deleteBlog.id = response.data.blogs[i]._id
        deleteBlog.textContent = 'delete'
        deleteBlog.addEventListener('click', function() {
            console.log('Delete button clicked for ID:', deleteBlog.id);
            axios.delete('http://localhost:5000/blog')
                .then(response => {
                    console.log("DELETED")
                    // Handle the response data here
                    // if (response)
                    // console.log('Response:', response.code);
                    // window.location.href = '../src/blogs.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    // window.location.href = '../src/blogs.html';
                });
          });
        // Set text content for the child p element
        title.textContent = 'This is child paragraph ' + (i + 1);

        const content = document.createElement('div');
        content.id = "content"
        content.textContent = 'This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph This is child paragraph ' + (i + 1);

        const author = document.createElement('div');
        author.id = "blogAuthor"
        author.textContent = 'This is the Author ' + (i + 1);
        const time = document.createElement('div');
        time.id = "blogtime"
        time.textContent = 'This is the Time ' + (i + 1);

        titleDiv.appendChild(title);
        titleDiv.appendChild(updateBlog);
        titleDiv.appendChild(deleteBlog);
        parentDiv2.appendChild(titleDiv);
        parentDiv2.appendChild(content);
        parentDiv.appendChild(parentDiv2);
        parentDiv3.appendChild(author);
        parentDiv3.appendChild(time);
        parentDiv.appendChild(parentDiv3);
        blogs.appendChild(parentDiv);

        // const blogElement = document.createElement('div');
        // const clone = blogElement.cloneNode(true);
        // blogTitle.textContent = "title";
        // blogElement.textContent = "cccccccccccc";
        // blogs.appendChild(clone);
    }
})
.catch(error => {
    console.error('Error:', error);
})

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const post = document.getElementById('post').value;
    const formData = {title:title, post:post}
    axios.post(this.action, formData)
        .then(response => {
            console.log("here")
            // Handle the response data here
            // if (response)
            // console.log('Response:', response.code);
            // window.location.href = '../src/blogs.html';
        })
        .catch(error => {
            console.error('Error:', error);
            // window.location.href = '../src/blogs.html';
        });

})

 