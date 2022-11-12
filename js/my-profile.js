let firstName = document.getElementById("fName");
let secondName = document.getElementById("sName");
let firstLastname = document.getElementById("fLastname");
let secondLastname = document.getElementById("sLastname");
let email = document.getElementById("pEmail");
let phone = document.getElementById("phone");
let saveChanges = document.getElementById("btnSave");

document.addEventListener("DOMContentLoaded", function (e) {
  
  saveChanges.addEventListener("click", (e) => {
    validateDataProfile();
    saveDataProfile();
                                                                                                                                   
  });

  

});


function validateDataProfile() {
  if (
    firstName.value.length < 1 &&
    firstLastname.value.length < 1 &&
    email.value.length < 1
  ) {
    firstName.classList.add("is-invalid");
    firstLastname.classList.add("is-invalid");
    email.classList.add("is-invalid");
  } else if (
    firstName.value.length > 0 &&
    firstLastname.value.length < 1 &&
    email.value.length < 1
  ) {
    firstLastname.classList.add("is-invalid");
    email.classList.add("is-invalid");
  } else if (
    firstName.value.length > 0 &&
    firstLastname.value.length > 0 &&
    email.value.length < 1
  ) {
    email.classList.add("is-invalid");
  } else if (
    firstName.value.length > 0 &&
    firstLastname.value.length < 1 &&
    email.value.length > 0
  ) {
    firstLastname.classList.add("is-invalid");
  } else if (
    firstName.value.length < 1 &&
    firstLastname.value.length < 1 &&
    email.value.length > 0
  ) {
    firstName.classList.add("is-invalid");
    firstLastname.classList.add("is-invalid");
    
  } else {
    firstName.classList.remove("is-invalid");
    firstLastname.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
  }
}

function saveDataProfile() {
  if (
    firstName.value.length > 0 &&
    firstLastname.value.length > 0 &&
    email.value.length > 0
  ) {
    let user = {};
    user.first_name = document.getElementById("fName").value;
    user.second_name = document.getElementById("sName").value;
    user.first_lastname = document.getElementById("fLastname").value;
    user.second_lastname = document.getElementById("sLastname").value;
    user.email = localStorage.getItem("usuario");
    user.phone = document.getElementById("phone").value;

    let data = JSON.stringify(user);

    localStorage.setItem("profile", data);
     
  }
}

