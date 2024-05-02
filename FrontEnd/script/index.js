// ************************VARIABLES GLOBALES******************************
const gallery = document.querySelector(".gallery");
const filtersContainer = document.querySelector(".filters");
let allWorks = [];

// ****************GESTION DE LA RECUPARATION DES WORKS DE L'API****************
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  allWorks = await response.json();
  return allWorks;
}

// *****************AFFICHAGE DYNAMIQUE DES WORKS DANS LA GALLERIE********************
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

// *********************RECUPARATION DU TABLEAU DES CATEGORIES*****************
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

// *************************GESTION DYNAMIQUE DES CATEGORIES***********************
async function displayCategoriesBtn() {
  const arrayCategories = await getCategories();
  arrayCategories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.id = category.id;
    filtersContainer.appendChild(button);
  });
}

//***********************GESTION FILTRAGE DES CATEGORIES***********************
async function filterByCategory() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let galleryFiltered;
      const buttonId = event.target.id;
      if (buttonId !== "0") {
        galleryFiltered = allWorks.filter((work) => {
          return work.category.id === parseInt(buttonId);
        });
        // Applique le style normal au bouton "Tous"
        toggleTousButtonStyle(false);
      } else {
        // Si le bouton "Tous" est cliqué, afficher toutes les oeuvres
        galleryFiltered = allWorks;
        // Appliquer le style spécial au bouton "Tous"
        toggleTousButtonStyle(true);
      }
      // Afficher les oeuvres filtrées ou toutes les oeuvres
      displayWorks(galleryFiltered);
    });
  });
}

// *******************GESTION DU BOUTON "TOUS" *************************
function toggleTousButtonStyle(selected) {
  const tousButton = document.getElementById('0');
  if (selected) {
    // Supprime la classe lorsque le bouton est sélectionné
    tousButton.classList.remove('not-selected');
    tousButton.style.backgroundColor = '#1d6154';
    tousButton.style.color = 'white';
    // Supprimer les gestionnaires d'événements hover lorsque le bouton est sélectionné
    tousButton.removeEventListener('mouseenter', handleMouseEnter);
    tousButton.removeEventListener('mouseleave', handleMouseLeave);
  } else {
    // Ajoute la classe lorsque le bouton n'est pas sélectionné
    tousButton.classList.add('not-selected');
    tousButton.style.backgroundColor = 'white';
    tousButton.style.color = '#1d6154';
    // Ajouter les gestionnaires d'événements hover lorsque le bouton n'est pas sélectionné
    tousButton.addEventListener('mouseenter', handleMouseEnter);
    tousButton.addEventListener('mouseleave', handleMouseLeave);
  }
}
// Gestionnaire d'événement pour le survol (mouseenter)
function handleMouseEnter(event) {
  event.target.style.backgroundColor = '#1d6154';
  event.target.style.color = 'white';
}
// Gestionnaire d'événement pour la sortie du survol (mouseleave)
function handleMouseLeave(event) {
  event.target.style.backgroundColor = 'white';
  event.target.style.color = '#1d6154';
}

// ******************FONCTION D'INITIALISATION***************************
async function initializePage() {
  await getWorks();
  await displayCategoriesBtn();
  await filterByCategory();
  await displayWorks();
  // Ajoute la classe "not-selected" au bouton "Tous" par défaut
  const tousButton = document.getElementById('0');
  tousButton.classList.add('not-selected');
  toggleTousButtonStyle(true);
}
// Appel de la fonction d'initialisation au chargement de la page
initializePage();

// *********************GESTION CONNEXION/DECONNEXION******************************************
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.querySelector('nav ul li:nth-child(3)');

  // Met à jour le lien de connexion/déconnexion
  updateLoginLink();

  function updateLoginLink() {
    const userIsLogged = checkLoginStatus();
    if (userIsLogged) {
      configureLogoutLink();
      addEditModeUI();
    } else {
      loginLink.innerHTML = '<a href="login.html">login</a>';
    }
  }

  // Vérifie si l'utilisateur est connecté
  function checkLoginStatus() {
    const token = localStorage.getItem("token");
    return token !== null && token !== "";
  }

  // Configure le lien de déconnexion
  function configureLogoutLink() {
    loginLink.innerHTML = '<a href="#" id="logout">logout</a>';
    document.getElementById("logout").addEventListener("click", handleLogout);
  }

  // Gère l'action de déconnexion
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }

  // Ajoute l'interface utilisateur pour le mode édition
  function addEditModeUI() {
    addEditModeToHeader();
    addEditModeToPortfolio();
  }

  // ************************GESTION "MODE EDITION"************************
  function addEditModeToHeader() {
    const header = document.querySelector("header");
    const editionModeDiv = createDivWithIcon("fas fa-regular fa-pen-to-square", " Mode édition");
    editionModeDiv.className = "editionMode";
    editionModeDiv.style.cursor = "pointer";
    header.appendChild(editionModeDiv);
    header.style.margin = "110px 0";
    // Ajoute un écouteur d'événement pour ouvrir la modale au clic
    editionModeDiv.addEventListener("click", () => {
      displayModal();
      displayGalleryModale();
    });
  }


  // ************************GESTION DE "MODIFIER"************************
  function addEditModeToPortfolio() {
    const portfolioSection = document.getElementById("portfolio");
    const portfolioTitle = portfolioSection.querySelector("h2");
    const modifierButton = createButtonWithIcon("fas fa-regular fa-pen-to-square", "modifier");
    portfolioTitle.insertAdjacentElement("beforebegin", modifierButton);
    // ajoute un écouteur d'événement pour ouvrir la modale au clic
    modifierButton.addEventListener("click", () => {
      displayModal();
    });
  }
});

// CREATION DIV WITH ICON
function createDivWithIcon(iconClass, text) {
  const div = document.createElement("div");
  const icon = document.createElement("i");
  icon.className = iconClass;
  div.appendChild(icon);
  div.appendChild(document.createTextNode(text));
  return div;
}

// CREATION BUTTON WITH ICON
function createButtonWithIcon(iconClass, text) {
  const button = document.createElement("button");
  const icon = document.createElement("i");
  icon.className = iconClass;
  button.appendChild(icon);
  button.appendChild(document.createTextNode(text));
  return button;
}

// DISPLAY MODAL FUNCTION
function displayModal() {
  const modal = document.querySelector(".modale");
  if (modal) {
    modal.style.display = "flex";
  }
}

// HIDE MODAL FUNCTION
function hideModal() {
  const modal = document.querySelector(".modale");
  if (modal) {
    modal.style.display = "none";
  }
}

// **********************GESTION INTEGRATION DYNAMIQUE DE LA MODALE 1 "containerModale"********************

// Création de la première modale pour la galerie
const modaleGallery = document.createElement("div");
modaleGallery.classList.add("modale");
modaleGallery.id = "modaleGallery";

const containerModaleGallery = document.createElement("div");
containerModaleGallery.classList.add("containerModale");

const spanIconGallery = document.createElement("span");
const xmarkIconGallery = document.createElement("i");
xmarkIconGallery.classList.add("fa-solid", "fa-xmark");
xmarkIconGallery.id = "xmark-modaleGallery";
spanIconGallery.appendChild(xmarkIconGallery);

const titleH2Gallery = document.createElement("h2");
titleH2Gallery.classList.add("title");
titleH2Gallery.textContent = "Gallerie photo";

const galleryModale = document.createElement("div");
galleryModale.classList.add("galleryModale");

const separationDivGallery = document.createElement("div");
separationDivGallery.classList.add("separation");

const buttonModaleGallery = document.createElement("button");
buttonModaleGallery.classList.add("btnModale");
buttonModaleGallery.textContent = "Ajouter une photo";

// Assemblage de la première modale
containerModaleGallery.appendChild(spanIconGallery);
containerModaleGallery.appendChild(titleH2Gallery);
containerModaleGallery.appendChild(galleryModale);
containerModaleGallery.appendChild(separationDivGallery);
containerModaleGallery.appendChild(buttonModaleGallery);
modaleGallery.appendChild(containerModaleGallery);
document.body.appendChild(modaleGallery);

// Création de la deuxième modale pour l'ajout de photo
const modaleAdd = document.createElement("div");
modaleAdd.classList.add("modale");
modaleAdd.id = "modaleAdd";

const containerModaleAdd = document.createElement("div");
containerModaleAdd.classList.add("containerModale");

const spanLeftArrow = document.createElement("span");
const leftArrowIcon = document.createElement("i");
leftArrowIcon.classList.add("fa-solid", "fa-arrow-left");
spanLeftArrow.appendChild(leftArrowIcon);
containerModaleAdd.appendChild(spanLeftArrow);

const spanIconAdd = document.createElement("span");
const xmarkIconAdd = document.createElement("i");
xmarkIconAdd.classList.add("fa-solid", "fa-xmark");
xmarkIconAdd.id = "xmark-modaleAdd";
spanIconAdd.appendChild(xmarkIconAdd);
containerModaleAdd.appendChild(spanIconAdd);

const titleH2AddWork = document.createElement("h2");
titleH2AddWork.textContent = "Ajout photo";
containerModaleAdd.appendChild(titleH2AddWork);

const formAddWork = document.createElement("form");
formAddWork.classList.add("formAddWork");

// Création des autres éléments du formulaire
const containerFileDiv = document.createElement("div");
containerFileDiv.classList.add("containerFile");

const fileIconSpan = document.createElement("span");
const fileIcon = document.createElement("i");
fileIcon.classList.add("fa-regular", "fa-image");
fileIconSpan.appendChild(fileIcon);

const fileLabel = document.createElement("label");
fileLabel.textContent = "+ Ajouter photo";
fileLabel.setAttribute("for", "file");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.id = "file";
fileInput.name = "images";

const imagePreview = document.createElement("img");
imagePreview.src = "#";
imagePreview.alt = "Aperçu de l'image";

const maxFileSize = document.createElement("p");
maxFileSize.textContent = "Jpg, png: 4Mo max";

const titleLabel = document.createElement("label");
titleLabel.textContent = "Titre";

const titleInput = document.createElement("input");
titleInput.type = "text";
titleInput.name = "title";
titleInput.id = "title";

const categoryLabel = document.createElement("label");
categoryLabel.textContent = "Catégorie";

const categorySelect = document.createElement("select");
categorySelect.name = "category";
categorySelect.id = "category";

const validateButton = document.createElement("button");
validateButton.classList.add("btnValidate");
validateButton.textContent = "Valider";
validateButton.type = "submit";

const separationDiv = document.createElement("div");
separationDiv.classList.add("separation");

// Ajout des éléments au formulaire
containerFileDiv.appendChild(fileIconSpan);
containerFileDiv.appendChild(fileLabel);
containerFileDiv.appendChild(fileInput);
containerFileDiv.appendChild(imagePreview);
containerFileDiv.appendChild(maxFileSize);

formAddWork.appendChild(containerFileDiv);
formAddWork.appendChild(titleLabel);
formAddWork.appendChild(titleInput);
formAddWork.appendChild(categoryLabel);
formAddWork.appendChild(categorySelect);
formAddWork.appendChild(validateButton);

// Assemblage de la deuxième modale
containerModaleAdd.appendChild(formAddWork);
modaleAdd.appendChild(containerModaleAdd);

// Ajout de la deuxième modale au document
document.body.appendChild(modaleAdd);

// Masquer la modale au chargement de la page
modaleAdd.style.display = "none";

// Écouteur d'événement pour l'icône de fermeture
xmarkIconAdd.addEventListener("click", function () {
  modaleAdd.style.display = "none";
  modaleGallery.style.display = "none";
});

// Écouteur d'événement pour la flèche gauche
leftArrowIcon.addEventListener("click", function () {
  showModal("modaleGallery");
  modaleAdd.style.display = "none";
});

// Fonction pour afficher la modale d'ajout
function showModalAdd() {
  modaleAdd.style.display = "flex";
}

// Écouteurs d'événements pour les icônes de fermeture
xmarkIconGallery.addEventListener("click", function () {
  hideModal("modaleGallery");
});

xmarkIconAdd.addEventListener("click", function () {
  hideModal("modaleAdd");
});

// Écouteurs d'événements pour les boutons qui déclenchent l'ouverture des modales
buttonModaleGallery.addEventListener("click", function () {
  showModal("modaleAdd");
});

// Fonction pour afficher une modale
function showModal(modalId) {
  const modale = document.getElementById(modalId);
  modale.style.display = "flex";
}

// Fonction pour masquer une modale
function hideModal(modalId) {
  const modale = document.getElementById(modalId);
  modale.style.display = "none";
}

// Écouteurs d'événements pour les icônes de fermeture des modales
xmarkIconGallery.addEventListener("click", function () {
  hideModal("modaleGallery");
  toggleTousButtonStyle(true);
});

xmarkIconAdd.addEventListener("click", function () {
  hideModal("modaleAdd");
});

// Écouteurs d'événements pour les boutons qui déclenchent l'ouverture des modales
buttonModaleGallery.addEventListener("click", function () {
  hideModal("modaleGallery");
  showModal("modaleAdd");
});

// Écouteur d'événement pour la fermeture de la modale d'ajout
modaleAdd.addEventListener("click", function (event) {
  // Vérifie si l'élément cliqué est en dehors de la modale
  if (!containerModaleAdd.contains(event.target)) {
    modaleAdd.style.display = "none";
    modaleGallery.style.display = "none";
  }
  toggleTousButtonStyle(true);
  displayWorks();
});

// Écouteur d'événement pour la fermeture de la modale de la galerie
modaleGallery.addEventListener("click", function (event) {
  // Vérifie si l'élément cliqué est en dehors de la modale
  if (!containerModaleGallery.contains(event.target)) {
    modaleGallery.style.display = "none";
  }
  toggleTousButtonStyle(true);
  displayWorks();
});

// *****************GESTION AFFICHAGE DE LA GALLERIE DANS MODALE 1********************

async function displayGalleryModale() {
  galleryModale.innerHTML = "";
  const gallery = await getWorks();
  gallery.forEach(work => {
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
  await deleteWork();
}
displayGalleryModale();



// *****************GESTION DELETE DE L'IMAGE DANS LA MODALE 2***********************
async function deleteWork() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach(trash => {
    trash.addEventListener("click", async (event) => {
      event.preventDefault();
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
          console.log("Delete ko");
        }
      } catch (error) {
        console.error("Une erreur est survenue pendant la suppression", error);
      }
    });
  });
}


// Prévisualisation de l'IMG dans modale 2 et écoute des changements sur l'input file
fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      imagePreview.src = reader.result;
      imagePreview.style.display = "block";
      fileLabel.style.display = "none";
      maxFileSize.style.display = "none";
      fileInput.style.display = "none";
      fileIconSpan.style.display = "none";

      validateButton.style.backgroundColor = "#1D6154";
      validateButton.style.border = "1px solid #0E2F28";
    });
    reader.readAsDataURL(file);
  }
})

// *****************GESTION DU POST**************************
formAddWork.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData();
  // Vérifier si tous les champs requis sont remplis
  if (titleInput.value === "" || categorySelect.value === "" || fileInput.files.length === 0) {
    alert("Veuillez remplir tous les champs requis et ajouter une image.");
    return;
  }
  // Ajouter les données du formulaire à formData
  formData.append('title', titleInput.value);
  formData.append('category', categorySelect.value);
  formData.append('image', fileInput.files[0]);
  // Configuration de la requête POST
  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData
  };
  // Envoi de la requête POST à l'API
  try {
    const response = await fetch("http://localhost:5678/api/works", requestOptions);
    if (response.ok) {
      modaleAdd.style.display = "none";
      modaleGallery.style.display = "flex";
      displayGalleryModale();
      console.log('La requête POST a réussi');
      // Masquer complètement la modale principale

    } else {
      console.log('La requête POST a échoué', response.status, response.statusText);
    }
  } catch (error) {
    console.error("Erreur pendant la requête POST", error);
  }
});

// Création de la liste catégorie dynamique dans l'input select de la modale2 de post
async function displayCategorieModal2() {
  const select = document.querySelector("#category");
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choisissez une catégorie";
  select.appendChild(defaultOption);
  const categories = await getCategories();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  })
}
displayCategorieModal2()


// **************REDIRECTION VERS LA SECTION CONTACT DANS LE LIEN DU LOGIN EN SCROLLING********************
document.addEventListener("DOMContentLoaded", () => {
  const sectionToScroll = window.location.hash.substring(1);
  if (sectionToScroll) {
    setTimeout(function () {
      const targetSection = document.getElementById(sectionToScroll);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
        });
      }
    }, 100);
  }
});

