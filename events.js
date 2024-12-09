document.addEventListener("DOMContentLoaded", () => {
    const farbButtons = document.querySelectorAll(".farbButtons .farbe");
    const homeButton = document.querySelectorAll(".hButton .Home");
    const hintergrund = document.querySelectorAll(".Hintergrund");
    const überschrift = document.querySelector("#überschrift");
    const homeauswahl = document.querySelectorAll(".fButtons .material-icons");
    const homebildschirmButtons = document.querySelectorAll(".fButtons button");
    const hausButton = document.querySelector('#farbauswahl .Home');

    let activeButton = null;
    let activeColor = "greenyellow"; // Standardfarbe

    function setColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
    }

    // Ansichten wechseln
    const einstellungenButton = document.querySelector('.Einstellungen');
    if (einstellungenButton) {
        einstellungenButton.addEventListener('click', () => {
            document.getElementById('homebildschirm').style.display = 'none';
            document.getElementById('farbauswahl').style.display = 'block';
        });
    }

    if (hausButton) {
        hausButton.addEventListener('click', () => {
            document.getElementById('farbauswahl').style.display = 'none';
            document.getElementById('homebildschirm').style.display = 'block';
        });
    }

    setColor(activeColor);
    farbButtons.forEach(button => {
        const originalBackgroundColor = button.style.backgroundColor;
        const hoverColor = button.getAttribute("data-color");
        
        // Hover
        button.addEventListener("mouseover", () => {
            if (!button.classList.contains("active")) {  
                button.style.backgroundColor = hoverColor;
                document.documentElement.style.setProperty('--hover-color', hoverColor);
            }
        });

        button.addEventListener("mouseout", () => {
            if (!button.classList.contains("active")) {  
                button.style.backgroundColor = originalBackgroundColor;
                document.documentElement.style.setProperty('--hover-color', activeColor);
            } else {
                button.style.backgroundColor = hoverColor;
            }
        });

        // Klick-Event
        button.addEventListener("click", () => {
            if (activeButton) {
                activeButton.classList.remove("active");
                activeButton.style.backgroundColor = activeButton.getAttribute("data-color");
            }
            button.classList.add("active");
            activeButton = button;
            activeColor = hoverColor;
            setColor(activeColor);
        });
    });

    // Hover Homebildschirm
    homebildschirmButtons.forEach(button => {
        button.addEventListener("mouseover", () => {
            if (activeButton) {
                button.style.backgroundColor = activeButton.style.backgroundColor;
            } else {
                let defaultColor = "rgba(172, 255, 47, 0.3)";
                button.style.backgroundColor = defaultColor;
            }
        });

        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = "";
        });
    });
});
