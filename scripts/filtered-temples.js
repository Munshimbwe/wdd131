const temples = [
  { name: "Salt Lake", location: "Salt Lake City, Utah", dedicated: "1893", area: 253015, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg" },
  { name: "Manti", location: "Manti, Utah", dedicated: "1888", area: 100373, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg" },
  { name: "Logan", location: "Logan, Utah", dedicated: "1884", area: 119619, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/logan-utah-temple/logan-utah-temple-40550-main.jpg" },
  { name: "St. George", location: "St. George, Utah", dedicated: "1877", area: 110000, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg" },
  { name: "Laie Hawaii", location: "Laie, Hawaii", dedicated: "1919", area: 42100, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/laie-hawaii-temple/laie-hawaii-temple-7370-main.jpg" },
  { name: "Cardston Alberta", location: "Cardston, Alberta", dedicated: "1923", area: 88562, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/cardston-alberta-temple/cardston-alberta-temple-13287-main.jpg" },
  { name: "Mesa Arizona", location: "Mesa, Arizona", dedicated: "1927", area: 75000, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/mesa-arizona-temple/mesa-arizona-temple-46561-main.jpg" },
  { name: "Rome Italy", location: "Rome, Italy", dedicated: "2019", area: 40000, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg" },
  { name: "Paris France", location: "Paris, France", dedicated: "2017", area: 44175, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg" },
  { name: "Frankfurt Germany", location: "Frankfurt, Germany", dedicated: "1987", area: 32000, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/frankfurt-germany-temple/frankfurt-germany-temple-38924-main.jpg" },
  { name: "San Juan Puerto Rico", location: "San Juan, Puerto Rico", dedicated: "2023", area: 6988, imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/san-juan-puerto-rico-temple/san-juan-puerto-rico-temple-48152-main.jpg" }
];

function displayTemples(templeList) {
  const container = document.getElementById("temple-container");
  if (!container) return;
  
  container.innerHTML = "";
  
  templeList.forEach(temple => {
    const card = document.createElement("section");
    card.className = "temple-card";
    card.innerHTML = `
      <h3>${temple.name}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.name} Temple" loading="lazy" width="400" height="220">
    `;
    container.appendChild(card);
  });
}

function setActiveButton(activeId) {
  const buttons = document.querySelectorAll("#nav-links button");
  buttons.forEach(btn => btn.classList.remove("active"));
  const targetButton = document.getElementById(activeId);
  if (targetButton) targetButton.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  displayTemples(temples);
  
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      if (navLinks.classList.contains("open")) {
        menuToggle.innerHTML = "&times;";
      } else {
        menuToggle.innerHTML = "&#9776;";
      }
    });
  }

  document.getElementById("filter-home").addEventListener("click", () => {
    displayTemples(temples);
    setActiveButton("filter-home");
  });
  
  document.getElementById("filter-old").addEventListener("click", () => {
    const oldTemples = temples.filter(t => parseInt(t.dedicated) < 1900);
    displayTemples(oldTemples);
    setActiveButton("filter-old");
  });
  
  document.getElementById("filter-new").addEventListener("click", () => {
    const newTemples = temples.filter(t => parseInt(t.dedicated) > 2000);
    displayTemples(newTemples);
    setActiveButton("filter-new");
  });
  
  document.getElementById("filter-large").addEventListener("click", () => {
    const largeTemples = temples.filter(t => t.area > 90000);
    displayTemples(largeTemples);
    setActiveButton("filter-large");
  });
  
  document.getElementById("filter-small").addEventListener("click", () => {
    const smallTemples = temples.filter(t => t.area < 10000);
    displayTemples(smallTemples);
    setActiveButton("filter-small");
  });
  
  const lastMod = document.getElementById("lastModified");
  if (lastMod) lastMod.textContent = document.lastModified;
});
