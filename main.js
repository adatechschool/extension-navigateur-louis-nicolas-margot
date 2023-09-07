document.addEventListener("DOMContentLoaded", function() {  // Sert à attendre que le doc HTML soit entièrement chargé et prêt à être manipulé par JavaScript. 
    const sliderMode = document.getElementById('checkbox'); 
    const label = document.querySelector('.mode');
    //console.log(urlDisplay)

    sliderMode.addEventListener("change", () => {  // Fonction qui permet de changer la position du bouton.
       label.textContent = sliderMode.checked ? "On" : "Off";
    });

    label.addEventListener("click", () => { // Fonction qui permet de changer "On" à "Off" et vice-versa.
        sliderMode.checked = !sliderMode.checked;
        label.textContent = sliderMode.checked ? "On" : "Off";
    })
});

