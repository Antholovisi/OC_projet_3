// integration.js
// Intégration et rendu dynamique des éléments du DOM
import { getWorks, getCategories, filterByCategory, displayWorks as displayWorksIndex, displayCategoriesBtn as displayCategoriesBtnIndex, initializePage } from './index.js';

document.addEventListener("DOMContentLoaded", function () {
    initializePage();
    displayGalleryModale();
});

// Affichage dynamique des Works(images) dans le DOM
async function displayWorks(worksToShow = allWorks) {
    const gallery = document.querySelector(".gallery");
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

// Affichage dynamique des boutons catégorie dans le DOM
async function displayCategoriesBtn() {
    const filtersContainer = document.querySelector(".filters");
    const arrayCategories = await getCategories();
    arrayCategories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.id = category.id;
        filtersContainer.appendChild(button);
    });
}

// Affichage de la galerie dans la modale
async function displayGalleryModale() {
    const galleryModale = document.querySelector(".galleryModale");
    galleryModale.innerHTML = "";
    const works = await getWorks();
    works.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = work.id;
        img.src = work.imageUrl;
        span.appendChild(trash);
        figure.appendChild(img);
        figure.appendChild(span);
        galleryModale.appendChild(figure);
    });
    addDeleteWorkEventListener();
}

// Fonction pour ajouter un écouteur d'événements pour supprimer une œuvre
function addDeleteWorkEventListener() {
    const trashIcons = document.querySelectorAll(".fa-trash-can");
    trashIcons.forEach(trash => {
        trash.addEventListener("click", async (event) => {
            event.stopPropagation();
            const id = trash.id;
            const init = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            };
            try {
                const response = await fetch(`http://localhost:5678/api/works/` + id, init);
                if (response.ok) {
                    console.log("Delete ok");
                    displayGalleryModale();
                } else {
                    console.log("Delete failed: ", response.status);
                }
            } catch (error) {
                console.error("Error during delete: ", error);
            }
        });
    });
}

// Création et gestion de la modale pour l'ajout et la modification des photos
const buttonModale = document.querySelector(".btnModale");
buttonModale.addEventListener("click", function () {
    const modaleDiv = document.querySelector(".modale");
    modaleDiv.style.display = "flex";
    setupAddPhotoModale();
});

function setupAddPhotoModale() {
    const modaleDiv = document.querySelector(".modale");
    const containerModaleDiv = document.querySelector(".containerModale");
    containerModaleDiv.innerHTML = ""; // Clear previous content if any

    const spanIcon = document.createElement("span");
    const xmarkIcon = document.createElement("i");
    xmarkIcon.classList.add("fa-solid", "fa-xmark");
    xmarkIcon.addEventListener("click", () => {
        modaleDiv.style.display = "none";
    });
    spanIcon.appendChild(xmarkIcon);

    const titleH2 = document.createElement("h2");
    titleH2.textContent = "Add New Photo";

    const form = document.createElement("form");
    form.onsubmit = handleFormSubmit;

    // Here you would add your form fields and setup similar to what you already have in your initial script
    // ...

    containerModaleDiv.appendChild(spanIcon);
    containerModaleDiv.appendChild(titleH2);
    containerModaleDiv.appendChild(form);

    modaleDiv.appendChild(containerModaleDiv);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    // handle the form submission logic
    console.log("Form submitted!");
}

// Replace displayWorks and displayCategoriesBtn with the versions defined in this file
document.addEventListener("DOMContentLoaded", async () => {
    await displayWorks();
    await displayCategoriesBtn();
    filterByCategory();
});
