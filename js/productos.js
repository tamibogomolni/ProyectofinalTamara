/* --- VARIABLES --- */

/* ---- ARRAYS ----*/

var favoritos = [];

/* ---- FLUJO ----*/

findStorageArr("misFavoritos", favoritos);
carritoBadge();

/* --- EVENTOS --- */

$( `#productsSelect`).change(function() {
    showSelect();
}); 

/* ---- FUNCIONES ---- */

function findProduct(where, idItem){
    return where.find(producto => producto.id == idItem); 
}

function findProductIndex(where, idItem) {
    return where.findIndex(producto => producto.idArticulo === idItem); 
}

function showSelect(){
    const elemento = document.getElementById("products-container");
    $( elemento ).html("");
    var valorOption = document.getElementById('productsSelect').value; 

    if(valorOption == 1){
        valorOptionSelect=1;
        addProductItem();
    }
    else if (valorOption == 2){
        valorOptionSelect=2;
        addProductFavoriteItem();
    }
}

function addProductItem () {
    for (let i = 0 ; i < productos.length; i++) {
        addHTMLProducto(productos[i]); 
    }
}

function addProductFavoriteItem () {
    for (let i = 0 ; i < favoritos.length; i++) {
        var favoriteProduct = findProduct(productos, favoritos[i].idArticulo);
        addHTMLProducto(favoriteProduct); 
    }
}

function getRootContainerProducts() {
    return document.querySelector("#products-container")
}

function addNewElemet(tag) {
    return document.createElement(tag)
}

function addHTMLProducto (producto) {
    const container = getRootContainerProducts();
    const childContainer = addNewElemet('div');
    const btnFavoritos = addNewElemet('button');
    const spanFavoritosIn = addNewElemet('span');
    const spanFavoritosOut = addNewElemet('span');
    const image = addNewElemet('img');
    const bodyContainer = addNewElemet('div');
    const bodyTitle = addNewElemet ('h5');
    const bodyPrice = addNewElemet ('p');
    const btnShop = addNewElemet ('button');
    const btnStock = addNewElemet ('button');

    childContainer.className = "card";
    childContainer.setAttribute("style","width: 18rem;");
    btnFavoritos.setAttribute("type","button");
    btnFavoritos.className = "btn btn-favorito";
    spanFavoritosOut.className = "material-icons material-icons-outlined";
    spanFavoritosOut.textContent = "favorite_border";
    spanFavoritosOut.setAttribute("id","fvrtOut"+producto.id);
    spanFavoritosIn.className = "material-icons material-icons-outlined";
    spanFavoritosIn.textContent = "favorite";
    spanFavoritosIn.setAttribute("id","fvrtIn"+producto.id);
    spanFavoritosIn.setAttribute("style","display:none");
    image.className = "card-img-top";
    image.setAttribute("alt","Torta Personalizada");
    image.setAttribute("src",producto.img);
    bodyContainer.className = "card-body";
    bodyTitle.className = "card-title";
    bodyPrice.className = "card-text";
    btnShop.className = "btn btn-primary btn-shop";
    btnShop.setAttribute("type","button");
    btnShop.setAttribute("id","btn"+producto.id);
    btnShop.setAttribute("value",producto.id);
    btnShop.textContent = "Agregar al Carrito";
    btnStock.className = "btn btn-stock";
    btnStock.setAttribute("type","button");
    btnStock.setAttribute("id","btnStock"+producto.id);
    btnStock.textContent = "Sin Stock";
    if(producto.stock > 0){
        btnStock.setAttribute("style","display:none");
    } else {
        btnShop.setAttribute("style","display:none");
    }

    container.appendChild(childContainer);
    childContainer.appendChild(btnFavoritos);
    btnFavoritos.appendChild(spanFavoritosIn);
    btnFavoritos.appendChild(spanFavoritosOut);
    childContainer.appendChild(image);
    childContainer.appendChild(bodyContainer);
    bodyContainer.appendChild(bodyTitle);
    bodyContainer.appendChild(bodyPrice);
    childContainer.appendChild(btnShop);
    childContainer.appendChild(btnStock);

    bodyTitle.textContent = producto.nombre;
    bodyPrice.textContent = "$ "+producto.precio;

    $( `#btn${producto.id}`).click(function() {
        verificarStock(producto.id)
    });   
    $( `#fvrtOut${producto.id}`).click(function() {
        newFavorito(producto.id)
    }); 

    $( `#fvrtIn${producto.id}`).click(function() {
        removeFavorito(producto.id);
    }); 

    isFavorito(producto.id);

}

function verificarStock(idProd){
    let producto = findProduct(productos, idProd); 
    if(producto.stock === 1){
        $(`#btn${producto.id}`).fadeOut(400);
        $(`#btnStock`+producto.id).delay(400).fadeIn(400);
        addItemCarrito(producto);
    }else if (producto.stock > 1){
        addItemCarrito(producto);
    }else if(producto.stock === 0){
        return stock = 0; 
    }
}

function addItemCarrito(newProduct){
    newProduct.stock -= 1;
    let productoIndex = findProductIndex(carrito, newProduct.id); 
    if (productoIndex >= 0) {
        carrito[productoIndex].cantidad += 1;
    } else {
        carrito.push({idArticulo:newProduct.id, articulo:newProduct.nombre, cantidad:1, precio:newProduct.precio, imagen:newProduct.img});
    }  
    saveStorage(carrito, "Carrito");
    carritoBadge();
    stateCart();
}

function newFavorito(idItem){
    let isFavorite = findProductIndex(favoritos, idItem);
    let producto = findProduct(productos, idItem); 
    favoritos.push({idArticulo:producto.id, articulo:producto.nombre,imagen:producto.img});
    var fvrtAnimate = $( `#fvrtOut${producto.id}`);
    fvrtAnimate.animate({fontSize:'30px'},200);
    fvrtAnimate.animate({fontSize:'20px'},200);
    fvrtAnimate.animate({fontSize:'30px'},200);
    fvrtAnimate.animate({fontSize:'24px'},200);
    fvrtAnimate.fadeOut(400);
    $(`#fvrtIn${producto.id}`).delay(1200).fadeIn(400);
    saveStorage(favoritos, "sFavoritos");
}

function removeFavorito(idItem){
    let producto = findProduct(productos, idItem); 
    let id = findProductIndex(favoritos, idItem); 
    favoritos.splice(id,1);
    var fvrtAnimate = $( `#fvrtIn${producto.id}`);
    fvrtAnimate.animate({fontSize:'30px'},200);
    fvrtAnimate.animate({fontSize:'20px'},200);
    fvrtAnimate.animate({fontSize:'30px'},200);
    fvrtAnimate.animate({fontSize:'24px'},200);
    fvrtAnimate.fadeOut(400);
    $(`#fvrtOut${producto.id}`).delay(1200).fadeIn(400);
    saveStorage(favoritos, "sFavoritos");
}

function isFavorito(idItem){
    let isFavorite = findProductIndex(favoritos, idItem);
    if (isFavorite >= 0){
        const spanFavoritosIn = document.getElementById("fvrtIn"+idItem);
        const spanFavoritosOut = document.getElementById("fvrtOut"+idItem);

        spanFavoritosOut.setAttribute("style","display:none");
        spanFavoritosIn.setAttribute("style","display:block");
    } 
}

function carritoBadge(){
    const container = document.getElementById('carritoBadge');
    var num = 0;
    for (let x = 0 ; x < carrito.length; x++) {
        num += carrito[x].cantidad;
    }
    container.textContent = num;
}



