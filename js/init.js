const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
  
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function redirectCart() {
  window.location = "cart.html";
}

function redirectProfile() {
  window.location = "my-profile.html";
}

function signOff() {
  localStorage.clear();
  window.location = "index.html";
}

function refreshProfile(){
  
  let userProfile = JSON.parse(localStorage.getItem("profile"));

  document.getElementById("fName").value = userProfile.first_name;
  document.getElementById("sName").value = userProfile.second_name;
  document.getElementById("fLastname").value = userProfile.first_lastname;
  document.getElementById("sLastname").value = userProfile.second_lastname;
  document.getElementById("pEmail").value = userProfile.email;
  document.getElementById("phone").value = userProfile.phone;
  document.getElementById("picPerfil").setAttribute("src", localStorage.getItem("profile", userProfile.inputPhoto)); 
}

document.getElementById("user").innerText = localStorage.getItem("usuario");
document.getElementById("pEmail").value = localStorage.getItem("usuario");

refreshProfile();