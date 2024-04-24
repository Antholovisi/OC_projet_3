// Variables globales
const emailInput = document.querySelector("form #email");
const passwordInput = document.querySelector("form #password");
const form = document.querySelector("form");
const errorDisplay = document.querySelector(".error");

// fonction REGEX email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fonction submit de la page login
form.addEventListener("submit", (event) => {
    // Empêche le navigateur de soumettre le formulaire au clic sur le bouton
    event.preventDefault();
    // Récupération des informations écrites par l'utilisateur
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;
    // Validation de l'adresse email et affichage du message d'erreur si invalide
    if (!validateEmail(userEmail)) {
        errorDisplay.textContent = "Veuillez entrer une adresse email valide.";
        return;
    }

    // Crée un objet avec les données du formulaire
    const formData = {
        email: userEmail,
        password: userPassword
    };
    // Envoi de la requête POST au serveur avec les données du formulaire
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // Transforme en chaîne de caractères sous forme JSON pour être traité côté serveur
        body: JSON.stringify(formData)
    })
        .then(async response => {
            if (response.status !== 200) {
                throw new Error("Adresse email ou mot de passe invalide.");
            } else {
                // Convertit la réponse en JSON
                return response.json();
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            // Redirection vers la page d'accueil après connexion réussie
            window.location.href = "index.html";

        })
        .catch(err => {
            console.error('Erreur:', err);
            errorDisplay.innerHTML = "<p>" + err + "</p>";
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.querySelector('nav ul li:nth-child(2) a'); // Sélection du lien "contact"

    // Ajout de l'écouteur d'événement au clic sur le lien "contact"
    contactLink.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        window.location.href = "index.html#contact"; // Redirection vers la section "contact" de la page index.html
    });
});




// *****************************************************************************************************************************************

// A faire :

// rendre dynamique le bouton "valider" de la modale pour ajout de photo
// Revoir couleur du bouton "valider" Background color gris et text blanc AVANT l'ajout d'une photo en appercu, une fois que l'appercu de la photo est visible, bouton valider style vert foncé
// Gerer la méthode post pour ajouter photo
// gerer le comportement du xmark et left arrow dans modale

// *****************************************************************************************************************************************

// QUESTIONS :

// comportement des differentes manieres de fermeture des modales:
// -xmark modale 1 et 2 ok pas de problemes
// -left arrow modale 2 ok pour le retour modale 1
// -clic en dehors de la modale 1 ok
// -clic en dehors de la modale 2 ok pour fermeture, mais ko quand on reclic sur "modifier" pour réouvrir la modale 1 on a l'affichage de la modale 2 a la place
// -si je clic sur "ajouter photo" pour ouvrir modale 2 c'est ok, mais si je clic sur left arrow pour revenir modale 1 et ensuite reclic sur "ajouter photo" ensuite left arrow et xmark ko
// En gros lors d'un aller-retour d'une modale a l'autre ou de l'index a une modale, KO
