/* --- VARIABLES --- */

var compraTotal = 0; 
var stock = 1 ;

/* ---- ARRAYS ----*/

var productos = [];

/* ---- CONSTRUCTOR DE OBJETOS ---- */

class ItemCarrito {
	constructor (obj){
		this.idArticulo= obj.idArticulo;
        this.articulo= obj.articulo; 
        this.cantidad= obj.cantidad; 
        this.imagen= obj.imagen;
        this.precio= obj.precio;
	}
}

class ItemFavoritos {
	constructor (obj){
		this.idArticulo= obj.idArticulo;
        this.articulo= obj.articulo; 
        this.imagen= obj.imagen;
	}
}

/* ---- FLUJO ----*/

const productosURL = "./productos.json";

$(document).ready(()=>{
    $.getJSON(productosURL, function(respuesta, estado){
        if(estado ==="success"){
            productos = respuesta;
            for (const producto of productos){
                showSelect();
            }
            return productos;
        }else{alert("Ups! Hubo un problema.");}
    });
});

/* ---- FUNCIONES ---- */

function saveStorage(arr, nombre){
    var guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor)};
    guardarLocal("mi"+nombre, JSON.stringify(arr));
}

function findStorageArr(listaGuardada, arr){
    var almacenados = JSON.parse(localStorage.getItem(listaGuardada));
    for (const objeto of almacenados){
        if(arr == carrito){
            carrito.push(new ItemCarrito(objeto));
        } else if (arr == favoritos){
            favoritos.push(new ItemFavoritos(objeto));
        }
    } 
}

