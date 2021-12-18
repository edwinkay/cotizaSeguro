// construcctores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//realizando la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){
    // 1 = 1.15 // 2= 1.05// 3 = 1.35


    let cantidad;
    const base = 2000;

    console.log(`opcion: ${this.marca}`);

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;        
    
        default:
            break;
    }

    //leer el año
    const diferencia = new Date().getFullYear() - this.year;

    //cada año la diferecia es mayor en un 3%

    cantidad -= ((diferencia * 3)* cantidad) / 100;

    //si el seguro es basico se multiplica en un 30% mas
    //si es completo se sube a un 50 % mas

    if (this.tipo === 'basico') {
        cantidad*= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
}


function UI() {
    
}

//llenar la funcion de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max - 20;

    const selectorYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option')
        option.value = i;
        option.textContent = i;
        selectorYear.appendChild(option);
        
    }
}

UI.prototype.mostrarMensaje  = (mensaje, tipo) => {
    
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error')
    } else {
        div.classList.add('mensaje', 'correcto')
    }
    div.classList.add('mt-10')
    div.textContent = mensaje;

    //insertar en el html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))
    setTimeout(() => {
        div.remove();
    }, 1500);
}
UI.prototype.mostrarResultado = (total, seguro) => {
     const {marca, year, tipo} = seguro

     let textoMarca;

     switch (marca) {
         case '1':
             textoMarca = 'Americano'
             break;

         case '2':
             textoMarca = 'Asiatico'
             break;

         case '3':
             textoMarca = 'Europeo'
             break;        
     
         default:
             break;
     }


     const div = document.createElement('div');
     div.classList.add('mt-10')

     div.innerHTML = `
        <p class="header">Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize" > ${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal"> ${total}</span></p>
        
     `;

     const resultadoDiv = document.querySelector('#resultado');
     

     //mostrar spinner

     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block'

     setTimeout(() => {
        //  spinner.remove();//se carga el apinner se remueve y muestra el resultado
        spinner.style.display = 'none'
         resultadoDiv.appendChild(div);
     }, 1500);
}

//instanciar UI
const ui = new UI();



document.addEventListener('DOMContentLoaded', () => {
       ui.llenarOpciones(); //llenar las opciones con los años
})



eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault();


    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value
    

    //leer el año seleccionado
    const year = document.querySelector('#year').value
    
    
    
    //leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if (marca === ''|| year === '' || tipo === '') {
        ui.mostrarMensaje('llenar todos los campos', 'error');
        return;
    } 
        ui.mostrarMensaje('cotizando...', 'exito');

        // ocultar cotizaciones previas
        const resultados = document.querySelector('#resultado div');

        if (resultados != null) {
            resultados.remove();
        }

        // instanciar el seguro
        const seguro = new Seguro(marca, year, tipo);
        const total = seguro.cotizarSeguro();

        ui.mostrarResultado(total, seguro);
    
}