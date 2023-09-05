document.addEventListener("DOMContentLoaded", function() {  
    const sliderMode = document.getElementById('checkbox');
    const label = document.querySelector('.mode');


    sliderMode.addEventListener("change", () => {
       label.textContent = sliderMode.checked ? "On" : "Off";
    });

    label.addEventListener("click", () => {
        sliderMode.checked = !sliderMode.checked;
        label.textContent = sliderMode.checked ? "On" : "Off";
    })
});