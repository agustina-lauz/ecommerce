

let email = document.getElementById("email");
let password = document.getElementById("pwd");
let button = document.getElementById("logBtn");

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

function validateData(){
    return email.value.length > 0 && password.value.length > 0;
}

function redirect(){
    location.href = "main.html";
}

button.addEventListener("click", e =>
    {
      if (validateData()) {
       redirect();
       localStorage.setItem("usuario", email)
      } else {
        showAlertError();
      }

    }

 )