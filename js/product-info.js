let productInfoArray = [];
let productComentsArray = [];

function showProdInfo() {
  let htmlContentToAppend = "";
  let prodInfo = productInfoArray;
  htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" >
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between" id="coments">
                        <div class="mb-1">
                        <h1>${prodInfo.name}</h1> 
                        <br>
                        <h5> Precio </h3>
                        <p>${prodInfo.currency} ${prodInfo.cost} </p> 
                        <br>
                        <h5> Descripción </h3>
                        <p>${prodInfo.description}</p> 
                        <br>
                        <h5> Categoría </h3>
                        <p>${prodInfo.category}</p> 
                        <br>
                        <h5> Cantidad de vendidos </h3>
                        <p>${prodInfo.soldCount}</p> 
                        <h5> Imagenes ilustrativas </h3>
                        <p>`
                        for (let i = 0; i < prodInfo.images.length ; i++) {
                          let prodData = prodInfo.images[i];
                          htmlContentToAppend += `<span> <img src=${prodData} width="300" height="300" alt="product image" class="img-thumbnail"> </span>`;
                          
                        }
                        `</p>
                    
                </div> 
            </div>
        </div> 
        `;

  document.getElementById("prod-info-container").innerHTML +=
    htmlContentToAppend;
}

function showProdComent() {
  let htmlContentToAppend = "";
  htmlContentToAppend += `
  <br>
  <h5>Comentarios</h5>
  <br>
  
  <div class="list-group-item list-group-item-action cursor-active>
  <div class="d-flex w-100 justify-content-between">
  `
  for (let i = 0; i < productComentsArray.length; i++) {
    let coment = productComentsArray[i];
    htmlContentToAppend += `
     
      <p><b>${coment.user}</b>  ${coment.dateTime}  </p> 
      <p>${coment.description} `
      for (let x = 0; x < coment.score; x++) {
        htmlContentToAppend += `<span class="fa fa-star checked" style="right:0px;"></span>`;
      }
      for (let x = 0; x < (5-coment.score); x++) {
        htmlContentToAppend += `<span class="fa fa-star" style="right:0px;"></span>`;
      }
       
    
  }
  `</p>
  </div>
  </div>`

 document.getElementById("prod-coment-container").innerHTML += htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  let url = PRODUCT_INFO_URL + localStorage.prodID + EXT_TYPE;
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfoArray = resultObj.data;
      console.log(productInfoArray);
      showProdInfo();
    }
  });

  let urlComent = PRODUCT_INFO_COMMENTS_URL + localStorage.prodID + EXT_TYPE;
  getJSONData(urlComent).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productComentsArray = resultObj.data;
      showProdComent();
    }
  });
});
