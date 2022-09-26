let email = document.getElementById("email");
let password = document.getElementById("pwd");
let button = document.getElementById("logBtn");
let usuarios = [];

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

function validateData() {
  return email.value.length > 0 && password.value.length > 0;
}

function redirect() {
  location.href = "init.html";
}

button.addEventListener("click", (e) => {
  if (validateData()) {
    usuarios = email.value;
    localStorage.setItem("usuario",usuarios);
    redirect();
  } else {
    showAlertError();
  }
});
