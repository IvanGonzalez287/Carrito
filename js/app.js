const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito=[];



cargarEventListener();

function cargarEventListener()
{
    ///Agragando curso
    listaCursos.addEventListener('click',agregarCurso);

    ///elimina curso
    carrito.addEventListener('click', eliminarCurso)

    ///vaciar carrito
    btnVaciarCarrito.addEventListener('click', ev=>
    {
        ev.preventDefault();
        articulosCarrito=[];
    
        carritoHtml();
    });

}



/*******************////Funciones del carrito******************/

////Agregar Curso////////
function agregarCurso(ev)
{
    ev.preventDefault();
    if(ev.target.classList.contains('agregar-carrito'))
        leerDatosCurso(ev.target.parentElement.parentElement);
        
}

///////////eliminar curso
function eliminarCurso(ev)
{
    ev.preventDefault();

    if(ev.target.classList.contains('borrar-curso'))
    {
        const cursoId= ev.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso=>curso.id != cursoId);
        carritoHtml();
    }     
}




//////////Curso Pulsado////////
function leerDatosCurso(dataCurso)
{
    const info={
        imagen: dataCurso.querySelector('img').src,
        nombre: dataCurso.querySelector('h4').textContent,
        precio: dataCurso.querySelector('.precio span').textContent,
        id: dataCurso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    ///buscamos en el array
    const existe = articulosCarrito.some(curso =>curso.id === info.id);
    if(existe)
    {
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === info.id)
            {
                curso.cantidad +=1;
                return curso;
            }
            else            
                return curso;           
                
        });

        articulosCarrito = [...cursos];
    }
    else
        articulosCarrito=[...articulosCarrito, info];

    carritoHtml();
    console.log(articulosCarrito);
}

/////////////Agregando los cursos//////////////////

function carritoHtml()
{
    limpiarHTML();

    articulosCarrito.forEach (curso =>
    {
        const{imagen, nombre, precio, cantidad, id}= curso;
        const row = document.createElement('tr');
        
        row.innerHTML=`
            <td><img src='${imagen}' width='100'></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id='${id}'> X</a></td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){

    while(contenedorCarrito.firstChild)
    {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    
}
