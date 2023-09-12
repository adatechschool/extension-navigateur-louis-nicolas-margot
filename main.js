document.addEventListener("DOMContentLoaded", function () {  // Sert à attendre que le doc HTML soit entièrement chargé et prêt à être manipulé par JavaScript. 
    const sliderMode = document.getElementById('checkbox');
    const label = document.querySelector('.mode');

    sliderMode.addEventListener("change", () => {
        chrome.permissions.request({
            permissions: ["https://*/*", "http://*/*"],
        }, (granted) => {
            // The callback argument will be true if the user granted the permissions.
            if (granted) {
                console.log('granted')
            } else {
                console.log('not granted')
            }
        });

        if (sliderMode.checked) {     // Activation de l'extension.
            console.log("Active");
            // On récupère l'URL du site que l'utilisateur est en train d'utiliser.
        } else {  // Désactivation de l'extension.
            console.log("Desactive");
        }
        label.textContent = sliderMode.checked ? "On" : "Off"; // Fonction qui permet de changer la position du bouton.
    });

    label.addEventListener("click", () => { // Fonction qui permet de changer "On" à "Off" et vice-versa.
        // Permissions must be requested from inside a user gesture, like a button's
        // click handler.

        sliderMode.checked = !sliderMode.checked;
        label.textContent = sliderMode.checked ? "On" : "Off";
    })
});

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if ('categories' in message) {
        console.log(message)
    }

    sendResponse({
        data: "Categories received"
    });
});

