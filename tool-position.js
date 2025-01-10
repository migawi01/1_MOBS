class ToolPosition extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .tool-position-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    color: var(--activeColor);
                }

                .position-item {
                    display: flex;
                    justify-content: space-between;
                    width: 80%;
                    margin: 10px 0;
                    padding: 10px;
                    border: solid var(--activeColor) 2px;
                    border-radius: 5px;
                    background: none;
                }

                .position-label {
                    font-weight: bold;
                }

                .position-value {
                    font-size: 1.2rem;
                }
            </style>
            <div class="tool-position-container">
                <div class="position-item">
                    <span class="position-label">Yaw:</span>
                    <span class="position-value" id="yaw">--.--</span>
                </div>
                <div class="position-item">
                    <span class="position-label">Pitch:</span>
                    <span class="position-value" id="pitch">--.--</span>
                </div>
                <div class="position-item">
                    <span class="position-label">Roll:</span>
                    <span class="position-value" id="roll">--.--</span>
                </div>
            </div>
        `;
    }
}

customElements.define('tool-position', ToolPosition);
