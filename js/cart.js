let userID = 25801;
let currentCart = [];
let checkTransfer = document.getElementById("checkTransfer");
let checkCard = document.getElementById("checkCard");
let btnCheckout = document.getElementById("btnCheckout");

document.addEventListener("DOMContentLoaded", function (e) {
  let url = CART_INFO_URL + userID + EXT_TYPE;
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCart = resultObj.data;
      console.log(currentCart);
      showCartList();
      calculateSubtotal();
      calculateTotal();
    }
  });

  checkTransfer.addEventListener("click", () => {
    selectPayMethod();
  });
  checkCard.addEventListener("click", () => {
    selectPayMethod();
  });
  btnCheckout.addEventListener("click", () => {
    validaShipment();
    validarAddress();
    validaPayMethod();
  
    if (validaShipment() && validarAddress() && validaPayMethod()){
      showAlert();
    }


  });
});

function showCartList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentCart.articles.length; i++) {
    let buyProducts = currentCart.articles[i];
    cost = parseInt(buyProducts.unitCost * buyProducts.count);
    sendCost = parseInt(buyProducts.unitCost * 0.15);
    htmlContentToAppend += `
        <tr>
          <td><img src="${buyProducts.image}" alt="productImage" width="75" height="50"></td>
          <td>${buyProducts.name}</td>
          <td>${buyProducts.currency}<span id="bpCost"> ${buyProducts.unitCost}</span></td>
          <td><input id="count" oninput=calculateSubtotal(); type="number" min="1" style="width:50px;" text-align:center;" value="${buyProducts.count}"></td>
          <td>${buyProducts.currency} <span id="subtotal">${cost}</span></td>
        </tr>
        `;
  }
  document.getElementById("cartItems").innerHTML += htmlContentToAppend;
  document.getElementById("costsSubtotal").innerHTML = `${cost}`;
  document.getElementById("costsSend").innerHTML = `${sendCost}`;
}

function selectPayMethod() {
  let cardNumber = document.getElementById("inputCard");
  let cvvNumber = document.getElementById("inputCvv");
  let expirationDate = document.getElementById("inputExpiration");
  let bankAccount = document.getElementById("inputCuenta");

  if (checkTransfer.checked) {
    cardNumber.setAttribute("disabled", " ");
    cvvNumber.setAttribute("disabled", " ");
    expirationDate.setAttribute("disabled", " ");
    bankAccount.removeAttribute("disabled", " ");
    document.getElementById("selection").innerHTML = `Transferencia bancaria.`;
    document.getElementById("alertPayMethod").remove();
    return true;
  } else if (checkCard.checked) {
    cardNumber.removeAttribute("disabled");
    cvvNumber.removeAttribute("disabled");
    expirationDate.removeAttribute("disabled");
    bankAccount.setAttribute("disabled", " ");
    document.getElementById("selection").innerHTML = `Tarjeta de crédito.`;
    document.getElementById("alertPayMethod").remove();
    return true;
  } else {
    cardNumber.removeAttribute("disabled");
    cvvNumber.removeAttribute("disabled");
    expirationDate.removeAttribute("disabled");
    bankAccount.removeAttribute("disabled");
    return true;
  }
}

function validarAddress() {
  let street = document.getElementById("inputCalle");
  let numberStreet = document.getElementById("inputNumeroPuerta");
  let corner = document.getElementById("inputEsquina");

  if (street.value.length < 1) {
    street.classList.add("is-invalid");
  } else {
    street.classList.remove("is-invalid");
  }
  if (numberStreet.value.length < 1) {
    numberStreet.classList.add("is-invalid");
  } else {
    numberStreet.classList.remove("is-invalid");
  }
  if (corner.value.length < 1) {
    corner.classList.add("is-invalid");
  } else {
    corner.classList.remove("is-invalid");
  }
}

function validaPayMethod() {
  if (!checkCard.checked && !checkTransfer.checked) {
    document.getElementById(
      "alertPayMethod"
    ).innerHTML = `<p style='vertical-align: middle;
    padding: .375rem .75rem;
    margin-left: 20px;'> Debe seleccionar un método de pago.</p> `;
  }
}

function validaShipment() {
  let premium = document.getElementById("percentagePremium");
  let express = document.getElementById("percentageExpress");
  let standard = document.getElementById("percentageStandard");
  if (premium.checked || standard.checked || express.checked) {
    document.getElementById("alertShipment").remove();
  } else {
    document.getElementById(
      "alertShipment"
    ).innerHTML = `<p style='vertical-align: middle;
    padding: .375rem .75rem;
    margin-left: 20px;'> Debe seleccionar un tipo de envío.</p> `;
  }
}

function showAlert() {
  document.getElementById("alertSuccess").removeAttribute("style");
}

function calculateSubtotal() {
  let cantidad = document.getElementById("count").value;
  let costo = document.getElementById("bpCost").innerHTML;

  let result = parseInt(cantidad * costo);

  document.getElementById("subtotal").innerHTML = `${result}`;
  document.getElementById("costsSubtotal").innerHTML = `${result}`;
}

function calculateTotal() {
  let send = document.getElementById("costsSend").innerHTML;
  let sub = document.getElementById("subtotal").innerHTML;

  let resultTotal = parseInt(send) + parseInt(sub);

  document.getElementById("costsTotal").innerHTML = `${resultTotal}`;
}
