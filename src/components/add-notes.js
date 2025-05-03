import notesData from "../data/notes.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
  .card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(45, 64, 89, 0.1);
  display: grid;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
}

h2 {
  margin-top: 0;
  color: #2d4059;
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

form {
  display: grid;
  gap: 10px;
}

label {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: #2d4059;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

input, textarea {
  padding: 8px;
  background: #f0f4f8;
  border-radius: 4px;
  color: #2d4059;
  font-size: 1em;
  resize: vertical;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  min-height: 100px;
}

button {
  padding: 10px;
  background: #2d4059;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.9;
}

.error {
  color: red;
  font-size: 0.85em;
}

@media (max-width: 768px) {
  .card {
    padding: 15px;
    margin: 0 10px;
  }

  textarea {
    min-height: 80px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 10px;
    gap: 8px;
  }

  h2 {
    font-size: 1.1rem;
  }

  label {
    font-size: 0.9rem;
  }

  input, textarea {
    font-size: 0.9rem;
  }

  button {
    padding: 8px;
    font-size: 0.9rem;
  }

  textarea {
    min-height: 60px;
  }
}
</style>

<div class="card">
  <h2>Tambah Catatan</h2>
  <form>
    <label for="title">Judul</label>
    <input id="title" name="title" type="text" placeholder="Masukkan judul catatan" required />
    <div id="titleError" class="error"></div>

    <label for="body">Isi Catatan</label>
    <textarea id="body" name="body" placeholder="Tulis catatan Anda di sini..." required></textarea>
    <div id="bodyError" class="error"></div>

    <button type="submit">Tambah Catatan</button>
  </form>
</div>
`;

class addNotes extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.notesData = [];
  }

  connectedCallback() {
    this._form = this._shadowRoot.querySelector("form");
    this._titleInput = this._shadowRoot.querySelector("#title");
    this._bodyInput = this._shadowRoot.querySelector("#body");
    this._titleError = this._shadowRoot.querySelector("#titleError");
    this._bodyError = this._shadowRoot.querySelector("#bodyError");

    this._form.addEventListener("submit", this._handleSubmit.bind(this));
    this._titleInput.addEventListener("input", this._validateTitle.bind(this));
    this._bodyInput.addEventListener("input", this._validateBody.bind(this));
  }

  disconnectedCallback() {
    this._form.removeEventListener("submit", this._handleSubmit.bind(this));
  }

  set existingNotes(notes) {
    this.notesData = notes;
  }

  _validateTitle() {
    const title = this._titleInput.value.trim();
    if (!title) {
      this._titleError.textContent = "Judul tidak boleh kosong.";
      return false;
    }
    const isDuplicate = this.notesData.some((note) => note.title === title);
    if (isDuplicate) {
      this._titleError.textContent = "Judul sudah digunakan.";
      return false;
    }
    this._titleError.textContent = "";
    return true;
  }

  _validateBody() {
    const body = this._bodyInput.value.trim();
    if (!body) {
      this._bodyError.textContent = "Isi catatan tidak boleh kosong.";
      return false;
    }
    if (body.length < 20) {
      this._bodyError.textContent = "Isi catatan minimal 20 karakter.";
      return false;
    }
    this._bodyError.textContent = "";
    return true;
  }

  _handleSubmit(event) {
    event.preventDefault();

    const isTitleValid = this._validateTitle();
    const isBodyValid = this._validateBody();

    if (!isTitleValid || !isBodyValid) return;

    const title = this._titleInput.value.trim();
    const body = this._bodyInput.value.trim();

    const newNote = {
      id: `note-${Math.random().toString(36).substring(2, 9)}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    notesData.push(newNote);
    localStorage.setItem("notesData", JSON.stringify(notesData));

    this.dispatchEvent(new CustomEvent("note-add", { detail: newNote }));

    this._form.reset();
    this._titleError.textContent = "";
    this._bodyError.textContent = "";

    const notesList = document.querySelector("notes-list");

    if (notesList) {
      notesList.render();
    }
  }
}

customElements.define("add-notes", addNotes);
