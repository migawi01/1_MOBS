class ColorSelection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .color-selection-container {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    grid-gap: 30px;
                    padding: 3%;
                    overflow: hidden;
                }

                .color-button {
                    height: 80vh;
                    min-height: 400px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .color-button:hover {
                    opacity: 0.7;
                }
            </style>
            <div class="color-selection-container">
                <button class="color-button" style="background-color: rgba(30, 143, 255, 0.3); border-color: dodgerblue" data-color="rgba(30, 143, 255, 0.8)" hover-color="rgba(30, 143, 255, 0.3)"></button>
                <button class="color-button" style="background-color: rgba(210, 105, 30, 0.3); border-color: chocolate" data-color="rgba(210, 105, 30, 0.8)" hover-color="rgba(210, 105, 30, 0.3)"></button>
                <button class="color-button" style="background-color: rgba(0, 250, 154, 0.3); border-color: mediumspringgreen" data-color="rgba(0, 250, 154, 0.8)" hover-color="rgba(0, 250, 154, 0.3)"></button>
                <button class="color-button" style="background-color: rgba(172, 255, 47, 0.3); border-color: greenyellow" data-color="rgba(172, 255, 47, 0.8)" hover-color="rgba(172, 255, 47, 0.3)"></button>
                <button class="color-button" style="background-color: rgba(255, 255, 0, 0.3); border-color: yellow" data-color="rgba(255, 255, 0, 0.8)" hover-color="rgba(255, 255, 0, 0.3)"></button>
                <button class="color-button" style="background-color: rgba(255, 0, 255, 0.3); border-color: fuchsia" data-color="rgba(255, 0, 255, 0.8)" hover-color="rgba(255, 0, 255, 0.3)"></button>
            </div>
        `;

        this.shadowRoot.querySelectorAll('.color-button').forEach(button => {
            button.addEventListener('click', () => {
                const activeColor = button.getAttribute('data-color');
                const hoverColor = button.getAttribute('hover-color');
                this.setColor(activeColor);
                this.setHoverColor(hoverColor);
            });
        });
    }

    setColor(color) {
        document.documentElement.style.setProperty('--activeColor', color);
    }

    setHoverColor(color) {
        document.documentElement.style.setProperty('--hoverColor', color);
    }
}

customElements.define('color-selection', ColorSelection);
