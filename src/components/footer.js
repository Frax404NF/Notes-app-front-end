class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const currentYear = new Date().getFullYear();
    const siteName = this.getAttribute("name");

    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            text-align: center;
            padding: 1.5rem;
            background-color: #2d4059;
            color: rgb(255, 255, 255);
            font-family: Arial, sans-serif;
            margin-top: auto;
            box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
            height: 100px;
          }

          .footer-content {
            max-width: 1200px;
            padding: 2rem;
            margin: 0 auto;
            font-size: 1rem;
          }

          .site-name {
            color:rgb(255, 255, 255);
            font-weight: 600;
            margin-right: 0.5rem;
          }
        </style>

        <div class="footer-content">
          <span class="site-name">${siteName}</span>&copy; ${currentYear}
        </div>
      `;
  }
}

customElements.define("footer-bar", FooterBar);
