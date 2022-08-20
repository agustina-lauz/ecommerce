

let email = document.getElementById("email");
let password = document.getElementById("pwd");
let button = document.getElementById("logBtn");
let emailError = "Ingresa tu email";
let passError = "Ingresa tu contraseña";

function validateData(){
    return email.value.length > 0 && password.value.length > 0;
}

function redirect(){
    location.href = "main.html";
}

function alertData(){
    
}


button.addEventListener("click", e =>
    {
      if (validateData()) {
       redirect();
      } else {
        alertData();
      }

    }

 )