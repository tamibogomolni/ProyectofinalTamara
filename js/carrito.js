/* ---- ARRAYS ----*/

var carrito = []; 
var advertencia = 0; 

/* ---- FLUJO CARRITO ----*/

findStorageArr("miCarrito", carrito);

window.onload = stateCart;

/* ---- EVENTOS ---- */

$( `#buyButton`).click(function() {
    alert("Gracias por tu compra.Total a abonar: $" + compraTotal);
}); 

$( `#emptyBag`).click(function() {
    deleteBag();
}); 

$( `.priceContainer`).change(function() {
    console.log(123);
    totalBag();
}); 

/* ---- FUNCIONES ---- */

function stateCart(){
    if (carrito.length===0) {
        bolsaVacia();
        advertencia +=1; 
    } else {
        showCart();
        if (advertencia === 0){
            advertencia +=1; 
            alert("Hey tu lista de productos puede estar desactualizada. Vacia tu bolsa y vuelve a vargar los productos. ")
        }    
    }
}

function showCart () {
    if (carrito.length===0) {
        deleteHTMLCarrito();
        bolsaVacia();
    } else{
        deleteHTMLCarrito();
        totalBag();
        for (var i = 0; i < carrito.length; i++) {
            addHTMLItemCarrito (carrito[i]);
        }
        const carritoFooter = document.getElementById("carritoFooter");
        carritoFooter.setAttribute("style", "display:block");
    } 
}

function addNewElement(tag) {
    return document.createElement(tag);
}

function getRootItemCarrito() {
    return document.querySelector("#contenedorCarrito");
}

function addHTMLItemCarrito (producto) {
    let total = producto.precio * producto.cantidad; 

    const container = getRootItemCarrito();
    const childContainer = addNewElement('div');
    const cardFirstContainer = addNewElement('div');
    const imgCardContainer = addNewElement('div');
    const imgCard = addNewElement('img');
    const cardSecondContainer = addNewElement('div');
    const bodyCardContainer = addNewElement('div');
    const spanTrash = addNewElement('span');
    const titleItem = addNewElement('p');
    const quantityContainer = addNewElement('div');
    const quantityAdd = addNewElement('span');
    const quantityItem = addNewElement('p');
    const quantitySubtract = addNewElement('span');
    const priceItem = addNewElement('p');

    childContainer.className = "card mb-3",
    childContainer.setAttribute("style","max-width: 540px;");
    cardFirstContainer.className = "row g-0";
    imgCardContainer.className = "col-md-4";
    imgCard.className = "img-fluid rounded-start";
    imgCard.setAttribute("src",producto.imagen);
    cardSecondContainer.className = "col-md-8";
    bodyCardContainer.className = "card-body";
    spanTrash.className = "material-icons material-icons-outlined delete-icon";
    spanTrash.setAttribute("id", "trash"+producto.idArticulo);
    spanTrash.setAttribute("value", producto.idArticulo);
    spanTrash.textContent = "delete";
    titleItem.className = "card-title";
    titleItem.textContent = producto.articulo;
    quantityContainer.className = "inline-display";
    quantityAdd.className = "material-icons material-icons-outlined";
    quantityAdd.setAttribute("id", "add"+producto.idArticulo);
    quantityAdd.setAttribute("value", producto.idArticulo);
    quantityAdd.textContent = "add";
    quantityItem.className = "card-text text-muted";
    priceItem.className = "card-text text-muted";
    quantityItem.textContent = producto.cantidad;
    quantitySubtract.className = "material-icons material-icons-outlined";
    quantitySubtract.setAttribute("id", "remove"+producto.idArticulo);
    quantitySubtract.setAttribute("value", producto.idArticulo);
    quantitySubtract.textContent = "remove";
    priceItem.setAttribute("class", "priceContainer")
    priceItem.textContent = "$ "+total;

    container.appendChild(childContainer);
    childContainer.appendChild(cardFirstContainer);
    cardFirstContainer.appendChild(imgCardContainer);
    imgCardContainer.appendChild(imgCard);
    cardFirstContainer.appendChild(cardSecondContainer);
    cardSecondContainer.appendChild(bodyCardContainer);
    bodyCardContainer.appendChild(spanTrash);
    bodyCardContainer.appendChild(titleItem);
    bodyCardContainer.appendChild(quantityContainer);
    quantityContainer.appendChild(quantityAdd);
    quantityContainer.appendChild(quantityItem);
    quantityContainer.appendChild(quantitySubtract);
    bodyCardContainer.appendChild(priceItem);

    $( `#add${producto.idArticulo}`).click(function() {
        stock=1;
        verificarStock(producto.idArticulo);
        if (stock === 0){
            alert("Ups! Este producto ya no tienen stock disponible.");
        }
    });   

    $( `#remove${producto.idArticulo}`).click(function() {
        removeUnit(producto.idArticulo);
    });   

     $( `#trash${producto.idArticulo}`).click(function() {
        removeProduct(producto.idArticulo);
    }); 
}

function bolsaVacia(){
    const container = getRootItemCarrito();
    const childText = addNewElement('p');
    childText.setAttribute("id","bolsaVacia");
    childText.textContent = "Ups! No tienes productos en la bolsa";
    container.appendChild(childText);
    const carritoFooter = document.getElementById("carritoFooter");
    carritoFooter.setAttribute("style", "display:none");

}

function deleteHTMLCarrito(){
    const elemento = document.getElementById("contenedorCarrito");
    $( elemento ).html("");
}

function removeUnit(idProd){
    let id = findProductIndex(carrito, idProd); 
    if (carrito[id].cantidad > 1 ){
        carrito[id].cantidad -= 1;
        addStock(carrito[id].idArticulo, 1);
        showCart();
    } else {
        removeProduct(idProd);
    }
    saveStorage(carrito, "Carrito");
    carritoBadge();
}
              
function addStock(idProd, cant){
    let producto = findProduct(productos, idProd); 
    if (producto.stock === 0){
        $(`#btnStock`+producto.id).fadeOut(400);
        $(`#btn${producto.id}`).delay(400).fadeIn(400);
    }
}

function removeProduct(idProd){
    let id = findProductIndex(carrito, idProd); 
    addStock(carrito[id].idArticulo, carrito[id].cantidad);
    carrito.splice(id,1);
    showCart (); 
    saveStorage(carrito, "Carrito");
    carritoBadge();
}

function totalBag(){
    compraTotal = 0; 
    for (var i = 0; i < carrito.length; i++) {
        compraTotal += (carrito[i].cantidad * carrito[i].precio);
    }
    const totalContainer = document.getElementById("importeTotal");
    totalContainer.textContent = "$ "+compraTotal;
}

function deleteBag(){
    for (var i = 0; i < carrito.length; i++) {
        addStock(carrito[i].idArticulo, carrito[i].cantidad);
    }
    carrito = [];
    compraTotal = 0; 
    saveStorage(carrito, "Carrito");
    showCart (); 
    carritoBadge();
}