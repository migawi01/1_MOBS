class MainMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .menu-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 30px;
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                    min-height: 300px;
                    padding: 2%;
                }

                .menu-button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    border: solid var(--activeColor) 2px;
                    color: var(--activeColor);
                    border-radius: 10px;
                    background: none;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .menu-button:hover {
                    background-color: var(--hoverColor);
                }

                .menu-button:active {
                    background-color: var(--activeColor);
                }

                .material-icons {
                    font-size: 3rem;
                }
            </style>
            <div class="menu-container">
                <button class="menu-button"><span class="material-icons">build</span></button>
                <button class="menu-button"><span class="material-icons">trending_up</span></button>
                <button class="menu-button"><span class="material-icons">list</span></button>
                <button class="menu-button"><span class="material-icons">settings</span></button>
                <button class="menu-button"><span class="material-icons">shower</span></button>
                <button class="menu-button"><span class="material-icons">headset_mic</span></button>
                <button class="menu-button"><span class="material-icons">help</span></button>
                <button class="menu-button"><span class="material-icons">lock</span></button>
                <button class="menu-button"><span class="material-icons">power_settings_new</span></button>
            </div>
        `;
    }
}

customElements.define('main-menu', MainMenu);
