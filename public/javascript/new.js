const newPostHandler= async function (event){
event.preventDefault();

const title= document.querySelector('#new-post-title').value;
const content = document.querySelector('#new-post-content').value;

await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
        title,
        content
    }), 
    headers: { 'Content-Type': 'application/json' }
});

document.location.replace('/')

}


document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);