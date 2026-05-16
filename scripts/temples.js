document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const menuButton = document.getElementById('menu-btn');
const navigationMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
  navigationMenu.classList.toggle('open');
  menuButton.classList.toggle('open');
});
