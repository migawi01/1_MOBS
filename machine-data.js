class MachineData extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .machine-data-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    color: var(--activeColor);
                }

                .data-item {
                    display: flex;
                    justify-content: space-between;
                    width: 80%;
                    margin: 10px 0;
                    padding: 10px;
                    border: solid var(--activeColor) 2px;
                    border-radius: 5px;
                    background: none;
                }

                .data-label {
                    font-weight: bold;
                }

                .data-value {
                    font-size: 1.2rem;
                }
            </style>
            <div class="machine-data-container">
                <div class="data-item">
                    <span class="data-label">Temperatur:</span>
                    <span class="data-value" id="temperature">-- °C</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Luftdruck:</span>
                    <span class="data-value" id="pressure">-- hPa</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Luftfeuchtigkeit:</span>
                    <span class="data-value" id="humidity">-- %</span>
                </div>
            </div>
        `;
    }
}

customElements.define('machine-data', MachineData);
