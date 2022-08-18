

let email = document.getElementById("email")
let password = document.getElementById("pwd")

function validateData(){
    return email.value.length > 0 && password.value.length > 0;
}

button.addEventListener("click", e =>
    {
        if (validateData()) {
            location.href="main.html";
        } else {
            console.log("error");
        }

       
}
 )