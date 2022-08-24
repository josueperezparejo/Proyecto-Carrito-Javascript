const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let artiulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos de Local Storage 
    document.addEventListener('DOMContentLoaded', () => {
        artiulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        artiulosCarrito = []; //Resetear el arreglo
        limpiarHTML();
    });
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo de articulosCarrito por el "data-id"
        artiulosCarrito = artiulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
    }
}

// Lee el contenido del HTML al que le dimos "click"
function leerDatosCurso(curso) {
    // console.log(curso)

    // Crear un objeto con el contenido del curso actual 
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    // Revisa si un elemento ya existe en el carrito
    const existe = artiulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        // Actualizamos la cantidad
        const cursos = artiulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado 
            } else {
                return curso; // Retorna los objetos que no son los duplicados
            }
        });
        artiulosCarrito = [...cursos];
    } else {
        // Agrega elementos al arreglo de carrito
    }
    
    // Agrega elementos al arreglo de carrito
    artiulosCarrito = [...artiulosCarrito, infoCurso];

    console.log(artiulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML 
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    artiulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src= "${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;  
        
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito de compras al Storage 
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(artiulosCarrito));
}

// Elimina los curso del tbody
function limpiarHTML() {
    // Forma Lenta
    // contenedorCarrito.innerHTML = '';

    // Forma Rapida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}