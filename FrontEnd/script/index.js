// Variables globales

const gallery = document.querySelector(".gallery");
const filtersContainer = document.querySelector(".filters");
let allWorks = [];

// Fonction qui retourne le tableau des Works de l'API
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  allWorks = await response.json();
  return allWorks;
}

// Affichage dynamique des Works(images) dans le DOM
async function displayWorks(worksToShow = allWorks) {
  gallery.innerHTML = "";
  worksToShow.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

// Récupération du tableau des catégories
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

// Affichage dynamique des boutons catégorie dans le DOM
async function displayCategoriesBtn() {
  const arrayCategories = await getCategories();
  arrayCategories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.id = category.id;
    filtersContainer.appendChild(button);
  });
}

// Filtrage des catégories au click sur le bouton
async function filterByCategory() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const buttonId = event.target.id;
      let galleryFiltered;
      if (buttonId !== "0") {
        galleryFiltered = allWorks.filter((work) => {
          return work.category.id === parseInt(buttonId);
        });
      } else {
        galleryFiltered = allWorks; // Si le bouton "Tous" est cliqué, afficher toutes les œuvres
      }
      displayWorks(galleryFiltered); // Afficher les œuvres filtrées ou toutes les œuvres
    });
  });
}

// Fonction d'initialisation de la page
async function initializePage() {
  await getWorks();
  await displayWorks();
  await displayCategoriesBtn();
  await filterByCategory();
}

initializePage(); // Appel de la fonction d'initialisation au chargement de la page
