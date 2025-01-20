class HintergrundContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            .hintergrund {
                align-items: center;
                color: rgba(var(--farbe),0.5);
                font-size: 20vh;
                line-height: 1.2;
                word-wrap: break-word;
                white-space: normal;
                text-align: center;
                text-shadow: 0 0 5vw  rgb(var(--farbe));;
                z-index: -1;
                place-items: center;
                position: absolute;
                top: 20%;
                left: 50%;
                transform: translate(-50%, -50%);
                filter: blur(0.03em);
            }

            @media screen and (max-width: 85vh) {
            .hintergrund {
                font-size: 30vw;
            }
        }
        </style>
        <p class="hintergrund">MOBS Machine Tools</p>
        `;
    }
}
customElements.define('hintergrund-container', HintergrundContainer);

class IconButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `

        <style>

        .icon-container i.material-icons,
        .icon-container i.material-symbols-outlined {
            font-size: 12vh;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: rgb(var(--farbe));
            padding: 4vh 1vw 4vh 1vw;
            width: 20vw;
            height: 20vh;
        }
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .icon-container {
            display: flex;
            border-radius: 10px;
            border-color: rgb(var(--farbe));
            background-color: transparent;
            border-width: 0.3vh;
            border-style: solid;
            z-index: 1;
            align-items: center;
            justify-content: center;
        }
        /*Ausnahme für Home*/
        :host([icon="home"]) .icon-container i.material-icons,
        :host([icon="home"]) .icon-container i.material-symbols-outlined {
        font-size: 8vh;
        padding: 2vh;
        width: auto;
        height: auto;
        }

        .icon-container:hover {
            background-color:rgba(var(--farbe),0.5);
        }

        .icon-container:active {
            background-color:rgba(var(--farbe),0.3);
            border-width:0.5vh;
        }

        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
            color: rgb(var(--farbe));
        }

        .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
            color: rgb(var(--farbe));
        }

        /*Smartphonefähigkeit ab 810px breite*/
        @media screen and (max-width: 85vh) {

        .icon-container i.material-icons,
        .icon-container i.material-symbols-outlined {
            font-size: 12vw;
            padding: 2vw;
        }

        .icon-container {
            border-width: 0.3vw;
        }

        :host([icon="home"]) .icon-container i.material-icons,
        :host([icon="home"]) .icon-container i.material-symbols-outlined {
        font-size: 12vw;
        padding: 2vw;
        }
        .icon-container:active {
            border-width:0.5vw;
        }
    </style>
    <button class="icon-container">
        <i class="material-icons">${this.getAttribute('icon')}</i>
    </button>`;
    }
 
    connectedCallback() {
        this.shadowRoot.querySelector('.icon-container').addEventListener('click', () => {
            console.log(`Icon clicked: ${this.getAttribute('icon')}`);
            
            if (this.getAttribute('icon') === 'home') {
                const homeBildschirm = document.querySelector('homebildschirm-container');
            }
        });
    }

    hauptmenu() {
        const homebildschirmContainer = document.querySelector('homebildschirm-container');
        const colorContainer = document.querySelector('mycolor-container');
        const maschinendatenContainer = document.querySelector('maschinendaten-container');
        const werkzeugdatenContainer = document.querySelector('werkezugdaten-container');
        const supportContainer = document.querySelector('support-container');

        if (homebildschirmContainer) {
            document.body.querySelector('homebildschirm-container').remove();
        }
        if (colorContainer) {
            document.body.querySelector('mycolor-container').remove();
        }
        if (maschinendatenContainer) {
            document.body.querySelector('maschinendaten-container').remove();
        }
        if (werkzeugdatenContainer) {
            document.body.querySelector('werkzeugdaten-container').remove();
        }
        if (supportContainer) {
            document.body.querySelector('support-container').remove();
        }

        let homebildschirm = document.createElement("homebildschirm-container");
        document.body.appendChild(homebildschirm);

        const homenavigationContainer = document.querySelector('icon-button[icon="home"]');
        homenavigationContainer.currentIcon = 'home';
        homenavigationContainer.shadowRoot.querySelector('.icon-container i.material-icons').textContent = 'home';
    }

    colormenu() {
        let color = document.createElement("mycolor-container");
        document.body.appendChild(color);
        document.body.querySelector('homebildschirm-container').remove();
    }

    maschinenmenu() {
        let maschine = document.createElement("maschinendaten-container");
        document.body.appendChild(maschine);
        document.body.querySelector('homebildschirm-container').remove();
    }

    werkzeugmenu() {
        let werkzeug = document.createElement("werkzeugdaten-container");
        document.body.appendChild(werkzeug);
        document.body.querySelector('homebildschirm-container').remove();
    }

    supportmenu() {
        let support = document.createElement("support-container");
        document.body.appendChild(support);
        document.body.querySelector('homebildschirm-container').remove();

        // Trigger POST request to display "Calling Support" on Sense HAT
        fetch('/display_support', {
            method: 'POST'
        }).then(response => response.json())
          .then(data => console.log(data.message))
          .catch(error => console.error('Error:', error));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.icon-container').addEventListener('click', () => {

            // Logik für den Klick auf die Icons
            console.log(`Icon clicked: ${this.getAttribute('icon')}`);
            switch (this.getAttribute('icon')) {
                case 'home': console.log('home');
                this.hauptmenu();
                    break;
                case 'build': console.log('wartung');
                this.werkzeugmenu();
                    break;
                case 'trending_up': console.log('maschinendaten');
                this.maschinenmenu();
                    break;
                case 'list': console.log('liste');
                    break;
                case 'settings': console.log('einstellungen');
                this.colormenu();
                    break;
                case 'shower': console.log('wasser');
                    break;
                case 'mic': console.log('headset');
                this.supportmenu();
                    break;
                case 'headset_mic': console.log('hilfe');
                    break;
                case 'help': console.log('sicherheit');
                    break;
                case 'lock': console.log('i/o');
                    break;
            }
        });
    }
}

customElements.define('icon-button', IconButton);

//Home Element
class HomeNavigationContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style> 
            .homenavigation-container {
                display: flex;
                place-items: center;
                height: 90vh;
                width: 10vw;
                margin: 3vh;
                flex-direction: row;
                z-index: 2;
                }

            @media screen and (max-width: 85vh) {
                .homenavigation-container {
                    display: flex;
                    place-items: center;
                    justify-content: center;
                    align-items: center;
                    height: auto;
                    width: 90vw;
                    margin: 3vw;
                    z-index: 2;
                }
            }
        </style>

        <div class="homenavigation-container">
            <slot></slot>
        </div>
    `;
    }
}

customElements.define('homenavigation-container', HomeNavigationContainer);

class HomebildschirmContainer extends HTMLElement {
    constructor() {
        super();
        
        // Template-Inhalt einfügen
        const templateContent = document.getElementById('homebildschirm-template').content.cloneNode(true);
        this.attachShadow({ mode: 'open' }).appendChild(templateContent);
    }
}
customElements.define('homebildschirm-container', HomebildschirmContainer);

class ColorContainer extends HTMLElement {
    constructor() {
        super();
        const templateContent = document.getElementById('farbauswahl-template').content.cloneNode(true);
        this.attachShadow({ mode: 'open' }).appendChild(templateContent);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.button-turquoise').addEventListener('click', () => {
            console.log(`Color clicked: turquoise`);
            this.setFarbe([0, 247, 255]);
        });
        this.shadowRoot.querySelector('.button-blue').addEventListener('click', () => {
            console.log(`Color clicked: blue`);
            this.setFarbe([52, 152, 219]);
        });
        this.shadowRoot.querySelector('.button-green').addEventListener('click', () => {
            console.log(`Color clicked: green`);
            this.setFarbe([46, 204, 113]);
        });
        this.shadowRoot.querySelector('.button-yellow').addEventListener('click', () => {
            console.log(`Color clicked: yellow`);
            this.setFarbe([241, 196, 15]);
        });
        this.shadowRoot.querySelector('.button-purple').addEventListener('click', () => {
            console.log(`Color clicked: purple`);
            this.setFarbe([201, 47, 225]);
        });
        this.shadowRoot.querySelector('.button-orange').addEventListener('click', () => {
            console.log(`Color clicked: orange`);
            this.setFarbe([238, 126, 29]);
        });
    }

    setFarbe(f) {
        let farbe = f;
        document.documentElement.style.setProperty("--farbe", farbe);
        fetch('/farbe', {
            method: "POST",
            body: JSON.stringify(farbe)
        })
    }
}
customElements.define('mycolor-container', ColorContainer);

class MaschinendatenContainer extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .maschinendaten-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: rgb(var(--farbe));
                    font-family: Arial, sans-serif;
                }

                .data-box {
                    display: flex;
                    justify-content: space-between;
                    width: 80%;
                    margin: 10px 0;
                    padding: 10px;
                    border: 2px solid rgb(var(--farbe));
                    border-radius: 5px;
                    background-color: transparent;
                }

                .data-box p {
                    margin: 0;
                    font-size: 1.5em;
                }

                h1 {
                    color: rgb(var(--farbe));
                }
            </style>

            <div class="maschinendaten-container">
                <h1>Maschinendaten</h1>
                <div class="data-box">
                    <p>Temperatur:</p>
                    <p id="temperature">-</p>
                </div>
                <div class="data-box">
                    <p>Luftdruck:</p>
                    <p id="pressure">-</p>
                </div>
                <div class="data-box">
                    <p>Luftfeuchtigkeit:</p>
                    <p id="humidity">-</p>
                </div>
            </div>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.updateData();
    }

    connectedCallback() {
        this.interval = setInterval(() => this.updateData(), 1000);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    async updateData() {
        try {
            const response = await fetch('/data'); 
            if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

            const data = await response.json();

            this.shadowRoot.querySelector('#temperature').innerText = data.temperature;
            this.shadowRoot.querySelector('#pressure').innerText = data.pressure;
            this.shadowRoot.querySelector('#humidity').innerText = data.humidity;
        } catch (error) {
            console.error('Fehler beim Abrufen der Maschinendaten:', error);
        }
    }
}

customElements.define('maschinendaten-container', MaschinendatenContainer);
