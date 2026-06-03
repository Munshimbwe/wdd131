const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10-12 ",
    area: "41.010",
    imageUrl:
    "   https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },

  {
    templeName: "San Juan Puerto Rico",
    location: "San Juan, Puerto Rico",
    dedicated: "2023, January, 15",
    area: "6988",
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/san-juan-puerto-rico-temple/san-juan-puerto-rico-temple-48152-main.jpg"
  },

  {
    templeName: "Paris France",
    location: "Paris, France",
    dedicated: "2017, May, 21",
    area: "44175",
    imageUrl: 
    "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
  },

  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6-24",
    area: "382207",
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  
];

function displayTemples(templeList) {
  const container = document.getElementById("temple-container");
  if (!container) return;
  
  container.innerHTML = "";
  
  templeList.forEach(temple => {
    const card = document.createElement("section");
    card.className = "temple-card";
    
    let areaValue = typeof temple.area === "string" ? parseInt(temple.area.replace(/\./g, "")) : temple.area;
    
    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Size:</strong> ${areaValue.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="220">
    `;
    container.appendChild(card);
  });
}

function setActiveButton(activeId) {
  const links = document.querySelectorAll("#nav-links a");
  links.forEach(lnk => lnk.classList.remove("active"));
  const targetLink = document.getElementById(activeId);
  if (targetLink) targetLink.classList.add("active");
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
        menuToggle.innerHTML = "☰";
      }
    });
  }

  document.getElementById("filter-home").addEventListener("click", (event) => {
    event.preventDefault();
    displayTemples(temples);
    setActiveButton("filter-home");
  });
  
  document.getElementById("filter-old").addEventListener("click", (event) => {
    event.preventDefault();
    const oldTemples = temples.filter(t => parseInt(t.dedicated) < 1900);
    displayTemples(oldTemples);
    setActiveButton("filter-old");
  });
  
  document.getElementById("filter-new").addEventListener("click", (event) => {
    event.preventDefault();
    const newTemples = temples.filter(t => parseInt(t.dedicated) > 2000);
    displayTemples(newTemples);
    setActiveButton("filter-new");
  });
  
  document.getElementById("filter-large").addEventListener("click", (event) => {
    event.preventDefault();
    const largeTemples = temples.filter(t => {
      let areaValue = typeof t.area === "string" ? parseInt(t.area.replace(/\./g, "")) : t.area;
      return areaValue > 90000;
    });
    displayTemples(largeTemples);
    setActiveButton("filter-large");
  });
  
  document.getElementById("filter-small").addEventListener("click", (event) => {
    event.preventDefault();
    const smallTemples = temples.filter(t => {
      let areaValue = typeof t.area === "string" ? parseInt(t.area.replace(/\./g, "")) : t.area;
      return areaValue < 10000;
    });
    displayTemples(smallTemples);
    setActiveButton("filter-small");
  });
  
  const lastMod = document.getElementById("lastModified");
  if (lastMod) lastMod.textContent = document.lastModified;
});