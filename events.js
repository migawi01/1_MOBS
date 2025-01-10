document.addEventListener("DOMContentLoaded", () => {
    // Main Menu Event Listeners
    const mainMenu = document.querySelector('main-menu');
    mainMenu.shadowRoot.querySelectorAll('.menu-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            switch (index) {
                case 0:
                    switchView('werkzeugposition');
                    break;
                case 1:
                    switchView('maschinendaten');
                    break;
                case 3:
                    switchView('farbauswahl');
                    break;
                case 5:
                    switchView('support');
                    break;
                default:
                    switchView('homebildschirm');
            }
        });
    });

    // Color Selection Event Listeners
    const colorSelection = document.querySelector('color-selection');
    colorSelection.shadowRoot.querySelectorAll('.color-button').forEach(button => {
        button.addEventListener('click', () => {
            const activeColor = button.getAttribute('data-color');
            const hoverColor = button.getAttribute('hover-color');
            document.documentElement.style.setProperty('--activeColor', activeColor);
            document.documentElement.style.setProperty('--hoverColor', hoverColor);
        });
    });

    // Fetch and Update Machine Data and Tool Position
    async function updateData() {
        try {
            const response = await fetch('http://192.168.178.58:5000/data');
            const data = await response.json();

            const machineData = document.querySelector('machine-data');
            machineData.shadowRoot.getElementById('temperature').textContent = `${data.temperature} °C`;
            machineData.shadowRoot.getElementById('pressure').textContent = `${data.pressure} hPa`;
            machineData.shadowRoot.getElementById('humidity').textContent = `${data.humidity} %`;

            const toolPosition = document.querySelector('tool-position');
            toolPosition.shadowRoot.getElementById('yaw').textContent = `${data.yaw}`;
            toolPosition.shadowRoot.getElementById('pitch').textContent = `${data.pitch}`;
            toolPosition.shadowRoot.getElementById('roll').textContent = `${data.roll}`;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Support View Event Listener
    const supportView = document.querySelector('support-view');
    supportView.shadowRoot.querySelector('.support-message').addEventListener('click', () => {
        fetch('http://192.168.178.58:5000/display_support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .catch(error => console.error('Error calling support:', error));
    });

    // Utility function to switch views
    function switchView(viewId) {
        const views = document.querySelectorAll('.view');
        views.forEach(view => {
            view.style.display = 'none';
        });
        document.getElementById(viewId).style.display = 'block';
    }

    // Start data update interval when necessary
    let updateInterval;
    document.querySelector('.maschinendaten').addEventListener('click', () => {
        if (!updateInterval) {
            updateData();
            updateInterval = setInterval(updateData, 1000);
        }
    });

    document.querySelector('.Home').addEventListener('click', () => {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    });
});
