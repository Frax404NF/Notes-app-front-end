class headerSection extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block;
            }

            nav {
                background: #2d4059;
                color:rgb(255, 255, 255);
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            nav > div > h1 {
                padding: 0px 10px;
                font-family: "Poppins", sans-serif;
                font-weight: 700;
                font-style: normal;
            }

             /* Responsive styles */
            @media screen and (max-width: 768px) {
                nav {
                    grid-template-columns: 1fr;
                    text-align: center;
                }

                nav > div > h1 {
                    font-size: 1.2rem;
                }
            }

            @media screen and (max-width: 480px) {
                nav {
                    padding: 10px;
                }

                nav > div > h1 {
                    font-size: 1rem;
                }
            }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <nav>
            <div>
            <h1 class="brand-name">Personal Notes App</h1>
            </div>
        </nav>
    `;
  }
}

customElements.define("header-bar", headerSection);
