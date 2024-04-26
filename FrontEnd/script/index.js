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

// *****************AFFICHAGE DYNAMIQUE DES IMAGES DANS LE DOM********************
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
  // Ajouter la classe "not-selected" au bouton "Tous" par défaut
  const tousButton = document.getElementById('0');
  tousButton.classList.add('not-selected');
  toggleTousButtonStyle(true);
}
// Appel de la fonction d'initialisation au chargement de la page
initializePage();

// **********************GESTION INTEGRATION DYNAMIQUE DE LA MODALE 1 "containerModale"********************
const modaleDiv = document.createElement("div");
modaleDiv.classList.add("modale");
const containerModaleDiv = document.createElement("div");
containerModaleDiv.classList.add("containerModale");
const spanIcon = document.createElement("span");
const xmarkIcon = document.createElement("i");
xmarkIcon.classList.add("fa-solid", "fa-xmark");
xmarkIcon.id = "xmark-modale1";
spanIcon.appendChild(xmarkIcon);
const titleH2 = document.createElement("h2");
titleH2.classList.add("title");
titleH2.textContent = "Gallerie photo";
const galleryModaleDiv = document.createElement("div");
galleryModaleDiv.classList.add("galleryModale");
const separationDiv = document.createElement("div");
separationDiv.classList.add("separation");
const buttonModale = document.createElement("button");
buttonModale.classList.add("btnModale");
buttonModale.textContent = "Ajouter une photo";
containerModaleDiv.appendChild(spanIcon);
containerModaleDiv.appendChild(titleH2);
containerModaleDiv.appendChild(galleryModaleDiv);
containerModaleDiv.appendChild(separationDiv);
containerModaleDiv.appendChild(buttonModale);
modaleDiv.appendChild(containerModaleDiv);
document.body.appendChild(modaleDiv);

// *****************GESTION SECTION "CONTACT" EN DYNAMIQUE**********************
const contactSection = document.createElement("section");
contactSection.id = "contact";
const contactTitle = document.createElement("h2");
contactTitle.textContent = "Contact";
const contactParagraph = document.createElement("p");
contactParagraph.textContent = "Vous avez un projet ? Discutons-en !";
const contactForm = document.createElement("form");
contactForm.action = "#";
contactForm.method = "post";
const nameLabel = document.createElement("label");
nameLabel.textContent = "Nom";
const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.name = "name";
nameInput.id = "name";
const emailLabel = document.createElement("label");
emailLabel.textContent = "Email";
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.name = "email";
emailInput.id = "email";
const messageLabel = document.createElement("label");
messageLabel.textContent = "Message";
const messageTextarea = document.createElement("textarea");
messageTextarea.name = "message";
messageTextarea.id = "message";
messageTextarea.cols = "30";
messageTextarea.rows = "10";
const submitInput = document.createElement("input");
submitInput.type = "submit";
submitInput.value = "Envoyer";
// Ajout des éléments au formulaire
contactForm.appendChild(nameLabel);
contactForm.appendChild(nameInput);
contactForm.appendChild(emailLabel);
contactForm.appendChild(emailInput);
contactForm.appendChild(messageLabel);
contactForm.appendChild(messageTextarea);
contactForm.appendChild(submitInput);
// Ajout des éléments à la section "Contact"
contactSection.appendChild(contactTitle);
contactSection.appendChild(contactParagraph);
contactSection.appendChild(contactForm);
// Ajout de la section "Contact" au corps de la page
document.body.appendChild(contactSection);

// *********************GESTION CONNEXION/DECONNEXION******************************************
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier si l'utilisateur est connecté
  const isLogged = () => {
    const token = localStorage.getItem("token");
    // Vérifie si le token existe et n'est pas vide
    return token !== null && token !== "";
  };
  // Sélectionner le lien de connexion dans la barre de navigation
  const loginLink = document.querySelector('nav ul li:nth-child(3)');
  // Modifier le texte du lien en fonction de l'état de connexion
  if (isLogged()) {
    // Si l'utilisateur est connecté, afficher "logout"
    loginLink.innerHTML = '<a href="#" id="logout">logout</a>';
    filtersContainer.style.display = "none";
    const h1Title = document.querySelector(".h2-logo-modifierDiv");
    h1Title.style.marginBottom = '70px';
    // Ajouter un écouteur d'événement pour la déconnexion
    document.getElementById("logout").addEventListener("click", function () {
      // Supprimer le token d'authentification du stockage local
      localStorage.removeItem("token");
      // Rediriger l'utilisateur vers la page de connexion après la déconnexion
      window.location.href = "index.html";
    });

    // Si connecté, affichage du mode édition en navbar header
    const header = document.querySelector("header");
    const editionModeDiv = document.createElement("div")
    const icon = document.createElement("i")
    icon.className = "fas fa-regular fa-pen-to-square"
    editionModeDiv.appendChild(icon)
    editionModeDiv.className = "editionMode"
    editionModeDiv.appendChild(document.createTextNode(" Mode édition"));
    header.appendChild(editionModeDiv);
    header.style.margin = "110px 0";

    // Si connecté, ajout du logo et du bouton "modifier"
    const portfolioSection = document.getElementById("portfolio");
    const portfolioTitle = portfolioSection.querySelector("h2");
    const modifierButton = document.createElement("button");
    modifierButton.textContent = "modifier";
    const logoIcon = document.createElement("i");
    const containerModale = document.querySelector(".modale");
    const Xmark = document.querySelector(".modale .fa-xmark");
    logoIcon.className = "fas fa-pen-to-square";
    portfolioTitle.insertAdjacentElement("beforebegin", modifierButton);
    portfolioTitle.insertAdjacentElement("beforebegin", logoIcon);

    // Affichage de la modale au click sur "modifier"
    modifierButton.addEventListener("click", function () {
      modaleDiv.style.display = "flex";
      containerModale.style.display = "flex";
    })
    Xmark.addEventListener("click", function () {
      containerModale.style.display = "none";
      displayWorks();
      toggleTousButtonStyle(true);
    })
    containerModale.addEventListener("click", (e) => {
      if (e.target === containerModale) {
        containerModale.style.display = "none";
        displayWorks();
        toggleTousButtonStyle(true);
      }
    })
  }
  else {
    // Si l'utilisateur n'est pas connecté, afficher "login"
    loginLink.innerHTML = '<a href="login.html">login</a>';
  }
});

// *****************GESION AFFICHAGE DE LA GALLERIE DANS MODALE********************
const galleryModale = document.querySelector(".galleryModale");

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
  deleteWork();
}
displayGalleryModale();

// *****************GESTION SUPPRESSION DE L'IMAGE DANS LA MODALE***********************
async function deleteWork() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach(trash => {
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
          // Suppression réussie
          console.log("Delete ok");
          await getWorks();
          await displayGalleryModale();
        } else {
          console.log("Delete ko");
        }
      } catch (error) {
        console.error("Une erreur est survenue pendant la suppression", error);
      }
    });
  });
}
// ***********************GESTION DE LA MODALE AU CLIC SUR LE BOUTON "MODIFIER"****************************
buttonModale.addEventListener("click", () => {
  containerModaleDiv.style.display = "none";
  // Ajout de l'element dans la modale2
  titleH2.innerText = "Ajout photo";
  const modalAddWorkDiv = document.createElement("div");
  modalAddWorkDiv.classList.add("modalAddWork");
  const spanLeftArrow = document.createElement("span");
  const leftArrowIcon = document.createElement("i");
  leftArrowIcon.classList.add("fa-solid", "fa-arrow-left");
  spanLeftArrow.appendChild(leftArrowIcon);
  spanLeftArrow.style.display = "flex";
  modalAddWorkDiv.appendChild(spanLeftArrow);
  const spanIcon = document.createElement("span");
  const xmarkIcon = document.createElement("i");
  xmarkIcon.classList.add("fa-solid", "fa-xmark");
  xmarkIcon.id = "xmark-modale1";
  spanIcon.appendChild(xmarkIcon);
  modalAddWorkDiv.appendChild(spanIcon);
  const titleH2AddWork = document.createElement("h2");
  titleH2AddWork.textContent = "Ajout photo";
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
  imagePreview.alt = "Aperçu de l'iage";
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
  // Ajout des éléments à la deuxième modale
  modalAddWorkDiv.appendChild(spanLeftArrow);
  modalAddWorkDiv.appendChild(titleH2AddWork);
  modalAddWorkDiv.appendChild(formAddWork);
  // Ajout de la deuxième modale à la modale existante
  modaleDiv.appendChild(modalAddWorkDiv);
  formAddWork.insertBefore(separationDiv, validateButton);

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
        console.log('La requête POST a réussi');
        // Masquer complètement la modale principale
        modaleDiv.style.display = "none";
      } else {
        console.log('La requête POST a échoué', response.status, response.statusText);
      }
    } catch (error) {
      console.error("Erreur pendant la requête POST", error);
    }
    await getWorks();
    await displayWorks();
  });
  // Sélection de l'icône xmark de la deuxième modale
  const xmarkIconModal2 = document.querySelector('.modalAddWork .fa-xmark');
  // Ajout d'un gestionnaire d'événements pour masquer la modale
  xmarkIconModal2.addEventListener("click", function () {
    // Fermer la deuxième modale
    modalAddWorkDiv.style.display = "none";
    // Réafficher la première modale
    containerModaleDiv.style.display = "flex";
    displayWorks();
  });
  // Gestion au clique du bouton "left arrow" dans la modale 2 pour revenir a la modale 1
  const leftArrow = document.querySelector(".fa-arrow-left");
  leftArrow.addEventListener("click", () => {
    modalAddWorkDiv.style.display = "none";
    containerModaleDiv.style.display = "flex";
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
})

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