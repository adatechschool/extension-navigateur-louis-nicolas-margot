document.addEventListener("DOMContentLoaded", function() {  // Sert à attendre que le doc HTML soit entièrement chargé et prêt à être manipulé par JavaScript. 
    const sliderMode = document.getElementById('checkbox'); 
    const label = document.querySelector('.mode');

    sliderMode.addEventListener("change", () => { 
        if (sliderMode.checked) {     // Activation de l'extension.
            console.log("Active");
            // On récupère l'URL du site que l'utilisateur est en train d'utiliser.
        } else {  // Désactivation de l'extension.
            console.log("Desactive");
        } 
       label.textContent = sliderMode.checked ? "On" : "Off"; // Fonction qui permet de changer la position du bouton.
    });

    label.addEventListener("click", () => { // Fonction qui permet de changer "On" à "Off" et vice-versa.
        sliderMode.checked = !sliderMode.checked;
        label.textContent = sliderMode.checked ? "On" : "Off";
    })
});

