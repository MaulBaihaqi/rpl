const loginButton = document.getElementById('loginButton');
const guestText = document.getElementById('guestText');

loginButton.addEventListener('click', () => {
  window.location.href = 'login.html';
});

guestText.addEventListener('click', () => {
  window.location.href = 'homepage.html';
});
