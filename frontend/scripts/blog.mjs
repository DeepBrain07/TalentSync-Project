// import { formatDistanceToNow } from 'date-fns';

const blogs = document.getElementById("blogs");
const upload = document.getElementById("upload")
const closepopup = document.getElementById("closepoup")
const formContainer = document.getElementById("formContainer")
const closepopup2 = document.getElementById("closepoup2")
const formContainer2 = document.getElementById("formContainer2")
const more = document.getElementById("more");
const fullBody = document.getElementById("fullBody");
const logout = document.getElementById("logout");
const warning = document.getElementById("warning");
const warning2 = document.getElementById("warning2");
const success = document.getElementById("success");

if (!localStorage.getItem('jwt')) {
    window.location.href = '../src/signin.html';
}

logout.onclick = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('numOfPosts');
    localStorage.removeItem('maxPostId');
    window.location.href = '../src/signin.html';
}

let data = {}
more.onclick = () => {
    data = {more:true, maxPostId}
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
closepopup2.onclick = () => {
    formContainer2.style.display = "none";
    upload.style.display = "block";
    fullBody.classList.remove("inactive");
}
axios.get('https://test-talent-sync-project.onrender.com/blog', {params: {numOfPosts: localStorage.getItem('numOfPosts')}, ...data})
.then(response => {
    if (!(response.data.blogs.length < 10)) {
        more.style.display = "flex"
    }
    localStorage.setItem('maxPostId', response.data.maxPostId)
    console.log(response.data)
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
        updateBlog.id = response.data.blogs[i]?._id
        updateBlog.className = "updateBlog"
        updateBlog.textContent = 'update'
        updateBlog.addEventListener('click', function() {
                formContainer2.style.display = "block";
                document.getElementById("myForm2").addEventListener("submit", function(event) {
                event.preventDefault();
                console.log('Update button clicked for ID:', updateBlog.id);
                upload.style.display = "none";
                fullBody.classList = "inactive";
                const title = document.getElementById('title2').value;
                console.log(title)
                const post = document.getElementById('post2').value;
                console.log(post);
                const userId = localStorage.getItem('userId')
                const token = localStorage.getItem('jwt')
                const postId = updateBlog.id;
                const formData = {title:title, post:post, postId:postId, userId:userId, token:token}
        
                console.log(title, post)
                axios.put('https://test-talent-sync-project.onrender.com/blog', formData)
                .then(response => {
                    console.log(response.status)
                    if (response.status === 200) {
                        success.style.display = 'block';
                        window.location.href = '../src/blogs.html'; 
                    } else {
                        warning2.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    warning.style.display = 'block';
                });
            })
          });
        const deleteBlog = document.createElement('div');
        deleteBlog.className = "deleteBlog"
        deleteBlog.id = response.data.blogs[i]._id
        deleteBlog.textContent = 'delete'
        deleteBlog.addEventListener('click', function() {
            console.log('Delete button clicked for ID:', deleteBlog.id);
            const token = localStorage.getItem('jwt')
            const userId = localStorage.getItem('userId')
            const postId = deleteBlog.id;
            const numOfPosts = localStorage.getItem('numOfPosts');
            const formData = {token, userId, postId, numOfPosts}
            axios.delete('https://test-talent-sync-project.onrender.com/blog', {data:formData})
                .then(response => {
                    console.log(response.status)
                    if (response.status === 200) {
                        localStorage.setItem('numOfPosts', response.data.numOfPosts)
                        success.style.display = 'block';
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
        // Set text content for the child p element
        title.textContent = response.data.blogs[i]?.title;

        const content = document.createElement('div');
        content.id = "content"
        content.textContent = response.data.blogs[i]?.content;

        const author = document.createElement('div');
        author.id = "blogAuthor";
        author.textContent = response.data.blogs[i]?.user?.username;
        const time = document.createElement('div');
        time.id = "blogtime"
        function formatDateToTime(date) {
            if (!date) {
              return "";
            }
          
            const now = new Date();
            const diffInMilliseconds = now - date;
            const seconds = Math.floor(diffInMilliseconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
          
            if (days >= 30) {
              // If the date is a month or more old, format it as "dd/mm/yyyy"
              const options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              };
              return date.toLocaleDateString(undefined, options);
            } else if (days >= 1) {
              return `${days}d`;
            } else if (hours >= 1) {
              return `${hours}h`;
            } else if (minutes >= 1) {
              return `${minutes}m`;
            } else {
              return `${seconds}s`;
            }
          }
          
          
        function formatDateToString(date) {
            if (!date) {
              return "";
            }
          
            const options = {
              month: "long",
              day: "numeric",
              year: "numeric",
            };
          
            return date.toLocaleDateString(undefined, options);
          }
        time.textContent = `${formatDateToTime (new Date(response.data.blogs[i]?.updatedAt))} ago`;

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
    const token = localStorage.getItem('jwt')
    const userId = localStorage.getItem('userId')
    const numOfPosts = localStorage.getItem('numOfPosts');
    const formData = {title:title, post:post, token, userId, numOfPosts}
    axios.post(this.action, formData)
        .then(response => {
            console.log(response.data)
            if (response.status === 200) {
                success.style.display = 'block';
                localStorage.setItem('numOfPosts', response.data.numOfPosts)
                window.location.href = '../src/blogs.html';
            } else {
                warning2.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warning.style.display = 'block';
            // window.location.href = '../src/blogs.html';
        });

})

 