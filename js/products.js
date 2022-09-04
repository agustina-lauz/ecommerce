let productsArray = [];
let minCount = undefined;
let maxCount = undefined;

function sortProductsAsc() {
  let products = productsArray.products;
  products.sort(function (a, b) {
    if (a.cost < b.cost) {return -1;}
    if (a.cost > b.cost) {return 1;}
    return 0;
  });
  
}
function sortProductsDesc() {
  let products = productsArray.products;
  products.sort(function (a, b) {
    if (a.cost > b.cost) {return -1;}
    if (a.cost < b.cost) {return 1;}
    return 0;
  });
 
}

function sortProductsDescCount() {
  let products = productsArray.products;
  products.sort(function (a, b) {
    let aCount = parseInt(a.soldCount);
    let bCount = parseInt(b.soldCount);

    if (aCount > bCount) {return -1;}
    if (aCount < bCount) {return 1;}
    return 0;
  });
}
  

function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < productsArray.products.length; i++) {
    let products = productsArray.products[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(products.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(products.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image +`" alt="product image" class="img-thumbnail"></div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` + products.name + " " + " - " + products.currency + " " + products.cost +`</h4> 
                        <p> ` + products.description + `</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    document.getElementById("cat-list").innerHTML = htmlContentToAppend;
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
  let url = PRODUCTS_URL + localStorage.catID + EXT_TYPE;
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      document.getElementById("catName").innerHTML = productsArray.catName;
      showProductsList();
      
    }
  });

  document.getElementById("sortAscProd").addEventListener("click", function () {
    sortProductsAsc();
    showProductsList();
  });


  document.getElementById("sortDescProd").addEventListener("click", function () {
    sortProductsDesc();
    showProductsList();
  });

  document.getElementById("sortByCountProd").addEventListener("click", function () {
    sortProductsDescCount();
    showProductsList();
  });

  

  document
    .getElementById("rangeFilterCost")
    .addEventListener("click", function () {
      minCount = document.getElementById("rangeFilterCostMin").value;
      maxCount = document.getElementById("rangeFilterCostMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProductsList();
    });

  document
    .getElementById("clearRangeFilterCost")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList();
    });
});
