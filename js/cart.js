let userID = 25801;
let currentCart = [];


function showCartList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCart.articles.length; i++) {
        let buyProducts = currentCart.articles[i];
        cost = parseInt(buyProducts.unitCost * buyProducts.count);
        htmlContentToAppend += `
        <tr>
          <td><img src="${buyProducts.image}" alt="productImage" width="75" height="50"></td>
          <td>${buyProducts.name}</td>
          <td>${buyProducts.currency}<span id="bpCost"> ${buyProducts.unitCost}</span></td>
          <td><input id="count" oninput=calculate(); type="number" min="1" style="width:50px;" text-align:center;" value="${buyProducts.count}"></td>
          <td>${buyProducts.currency} <span id="subtotal">${cost}</span></td>
        </tr>
        `
    }
    document.getElementById("cartItems").innerHTML += htmlContentToAppend;

}

function calculate() {
  let cantidad = document.getElementById("count").value;
  let costo = document.getElementById("bpCost").innerHTML;
  console.log(cantidad);
  console.log(costo);
  
  let result = parseInt(cantidad * costo);

  document.getElementById("subtotal").innerHTML = `${result}`;
}


document.addEventListener("DOMContentLoaded", function (e) {
    let url = CART_INFO_URL + userID + EXT_TYPE;
    getJSONData(url).then(function (resultObj) {
      if (resultObj.status === "ok") {
        currentCart = resultObj.data;
        console.log(currentCart)
        showCartList();
      }
    });
   
  });