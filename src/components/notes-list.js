import notesData from "../data/notes.js";

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block;
                width: 100%;
            }

            .notes-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1em;
                padding: 1em;
            }

            .card {
                background-color: white;
                opacity: 0.8;
                border: none;
                border-radius: 10px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                padding: 1em;
                transition: transform 0.2s;
            }

            .card:hover {
                transform: translateY(-5px);
            }

            .date {
                font-size: 0.70em;
                margin-top: -9px;
                color: #666;
            }

            .desc {
                padding-top: 1em;
                font-size: 0.90em;
                color: #333;
                line-height: 1.5;
            }

            h4 {
                margin: 0 0 0.5em 0;
                color: #222;
                font-size: 1.2em;
            }
        `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    const container = document.createElement("div");
    container.className = "notes-container";

    notesData.forEach((note) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <h4>${note.title}</h4>
                <p class="desc">${note.body}</p>
                <br>
            `;
      container.appendChild(card);
    });

    this._shadowRoot.appendChild(container);
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("notes-list", NotesList);
