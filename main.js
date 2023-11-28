class formValidate {
  constructor() {
    this.form = document.querySelector(".form");
    this.events();
  }

  events() {
    this.form.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validsFilds = this.isvalid();
    result.innerHTML = "";

    if (validsFilds) {
      result.innerHTML = "Formulário enviado";
    }
  }

  isvalid() {
    let valid = true;
    for (let errorText of this.form.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let fild of this.form.querySelectorAll(".box")) {
      if (!fild.value) {
        const label = fild.previousElementSibling.innerText;
        this.createError(fild, `* campo "${label}" não pode estar vazio`);
        valid = false;
      }
      if (fild.classList.contains("cpf")) {
        if (!this.validateCpf(fild)) valid = false;
      }
      if (fild.classList.contains("user")) {
        if (!this.validateUser(fild)) valid = false;
      }
      if (fild.classList.contains("password")) {
        if (!this.validatePassword(fild)) valid = false;
      }
      if (fild.classList.contains("confirm-password")) {
        if (!this.validatePassword(fild)) valid = false;
        if (!this.confirmPassword(fild)) valid = false;
      }
    }
    return valid;
  }

  validateCpf(fild) {
    const cpf = new ValidateCpf(fild.value);
    if (!cpf.verifyCpf()) {
      this.createError(fild, "* Cpf inválido");
      return false;
    }
    return true;
  }

  validateUser(fild) {
    const user = new ValidadeUser(fild.value);
    if (!user.verifyString()) {
      this.createError(fild, "* Usúario só pode conter letras e/ou números");
      return false;
    }
    if (!user.verifyUserLength()) {
      this.createError(fild, "* usúario deve ter entre 3 e 12 caracteres");
      return false;
    }
    return true;
  }

  validatePassword(fild) {
    if (!(fild.value.length >= 6 && fild.value.length <= 12)) {
      this.createError(fild, "* Senha precisa ter entre 6 e 12 caracteres");
      return false;
    }
    return true;
  }

  confirmPassword(fild) {
    const pass = this.form.querySelector(".password");
    const confirmPass = this.form.querySelector(".confirm-password");
    if (pass.value !== confirmPass.value) {
      this.createError(fild, "* Senhas devem ser iguais");
      return false;
    }
    return true;
  }

  createError(fild, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    fild.insertAdjacentElement("afterend", div);
  }
}

const validate = new formValidate();
