
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();

  const firstname = document.querySelector('#firstname-signup').value.trim();
  const lastname = document.querySelector('#lastname-signup').value.trim();
  const location = document.querySelector('#location-signup').value.trim();
  const bio = document.querySelector('#bio-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (firstname && lastname && location && bio && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        firstname,
        lastname,
        location,
        bio,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      window.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}
// document.getElementById('submitLogin').addEventListener('click', loginFormHandler);
document.querySelector('#submitLogin').addEventListener('click', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
