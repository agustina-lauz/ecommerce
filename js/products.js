
/* 
-Se crea una constante con la url donde vamos a acceder al json  
*/
const CARS_LIST = "https://japceibal.github.io/emercado-api/cats_products/101.json"

/* 
-Se crea un array vacío dónde se van a guardar los productos que se van a mostrar en el HTML 
*/
let productsArray = [];

/* 
-Se crea una función dónde se recorre el array trayendo la información de cada uno de los productos e insertando un div en el HTML para que se muestren 
*/
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
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
        document.getElementById("cars").innerHTML = htmlContentToAppend; 
    }
}


/* 
-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos (catId, catName, products) en productsArray.
-En CarsArray se guarda solamente la info que está en .products.
-Por último, se llama a showProductsList() pasándole por parámetro CarsArray.
*/
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARS_LIST).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            CarsArray = productsArray.products;
            showProductsList(CarsArray);
        }
    });
});