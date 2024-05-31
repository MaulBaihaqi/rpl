const catButton = document.getElementById('Kategori');
const loginButton = document.getElementById('login-text');
const viewAllButton = document.getElementById('view-more');

loginButton.addEventListener('click', () => {
  window.location.href = 'login.html';
});

catButton.addEventListener('click', () => {
  window.location.href = 'category.html';
});

viewAllButton.addEventListener('click', () => {
  window.location.href = 'category.html';
});