class SupportView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .support-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    color: var(--activeColor);
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                }

                .support-message {
                    padding: 20px;
                    border: solid var(--activeColor) 2px;
                    border-radius: 10px;
                    background: none;
                    font-size: 2rem;
                    text-align: center;
                }
            </style>
            <div class="support-container">
                <div class="support-message">
                    Rufe Support ...
                </div>
            </div>
        `;
    }
}

customElements.define('support-view', SupportView);
