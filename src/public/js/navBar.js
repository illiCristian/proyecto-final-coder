const navLinks = document.querySelector(".nav-links");
function onToggleMenu(e) {
  e.name = e.name === "menu" ? "close" : "menu";
  navLinks.classList.toggle("top-[9%]");
}
function showProductMenu(link) {
  const productMenu = document.getElementById("productMenu");
  productMenu.classList.remove("hidden");
  productMenu.style.left = `${link.offsetLeft}px`;
  productMenu.style.top = `${link.offsetTop + link.offsetHeight}px`;
}

function hideProductMenu() {
  const productMenu = document.getElementById("productMenu");
  productMenu.classList.add("hidden");
}

const currentPath = window.location.pathname;
const links = document.querySelectorAll(".nav-links a");
links.forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});
