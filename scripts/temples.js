document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const menuButton = document.getElementById('menu-btn');
const navigationMenu = document.getElementById('nav-menu');

if (menuButton && navigationMenu) {
  menuButton.addEventListener('click', () => {
    navigationMenu.classList.toggle('open');
    menuButton.classList.toggle('open');
  });

  const navLinks = navigationMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navigationMenu.classList.remove('open');
      menuButton.classList.remove('open');
    });
  });
}
