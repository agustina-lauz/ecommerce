let productsArray = [];

function showProductsList(){
    let htmlContentToAppend = "";

    for(let i = 0; i < productsArray.products.length; i++){ 
        let products = productsArray.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + " " + " - " + products.currency + " " + products.cost +`</h4> 
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list").innerHTML = htmlContentToAppend; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    let url= PRODUCTS_URL + localStorage.catID + EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            document.getElementById("catName").innerHTML = productsArray.catName; 
            showProductsList();
        }
    });
});