firebase.initializeApp({
  apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
  authDomain: "systemstec-69d04.firebaseapp.com",
  projectId: "systemstec-69d04",
  databaseURL: "https://systemstec-69d04.firebaseio.com/"
})

/** agregar nueva */
var form = document.getElementById('partidaForm'); // Obtenemos la referencia al formulario
if (form) { // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', partidaForm1); // Al momento de enviar el formulario, ejecuta la función "contactform"
  //form.precioU.addEventListener("keypress", soloNumeros, false); //para la validacion de solo numeros
}

document.getElementById("fecha").valueAsDate = new Date();
$('#modalNuevo').on('hidden.bs.modal', function (e) {
  form.reset();
  document.getElementById("fecha").valueAsDate = new Date();
})

function partidaForm1(event) {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  const partida = document.getElementById('partida'); // Obtenemos la referencia a cada uno de nuestros elementos del formulario
  const articulo = document.getElementById('articulo');
  // const sexo = document.querySelector('input[type=radio]:checked');
  const clave = document.getElementById('clave');
  const cantidad = document.getElementById('cantidad');
  const precioU = document.getElementById("precioU");
  const fecha = document.getElementById("fecha");
  const data = {
    'partida': partida.value,
    'articulo': articulo.value,
    'clave': clave.value,
    'cantidad': cantidad.value,
    'precioU': precioU.value,
    'fecha': fecha.value
  };
  const dataStock = {
    'articulo': articulo.value,
    'clave': clave.value,
    'cantidad': cantidad.value,
  };
  const claveN = clave.value;
  const cantidadN = cantidad.value;  // Creamos un objecto con todos los elementos de nuestro formulario.
 
  insertarPartida(data); 

  insertarStock(dataStock,claveN, cantidadN, dataStock);

  validaEx(data, claveN, cantidadN, dataStock);
  form.reset(); // borramos todos los campos. 
}
var db = firebase.database();

// validacion si exite o no 
function validaEx(data2, claveN, cantidadN, dataStock) {

  var data = db.ref('stock');
 
var list= [];
  data.orderByChild("clave").equalTo(claveN).on("child_added", function (datos) {

    var v = datos.val();
    list.push({
      id: datos.key
    });

    var count =0;
      {
        if(count==0){

        alert("entro");
       
        if (v.clave == claveN) {
          var a = parseInt(v.cantidad);
          var b = parseInt(cantidadN);
          
          var cantidadT = a + b;
          
          var t = String(cantidadT);
         
          update(datos.key,t);

          if(list.length>1){
          data.child(list[0].id).remove();
          }
          count+1;
        } else {
         // insertarPartida(data2); // Enviamos la información obtenida por el usuario a la función que se encargara de guardar la información en Firebase
          //insertarStock(dataStock);
        
        }
      
      }
      
    }
  })
 


}
function update(key, cantidad) {
  var data = db.ref('stock');
  data.child(key)
    .update({ cantidad: cantidad });

}



function insertarPartida(data) {
console.log(data)
  db.ref('partidas').push(data)
    .then(function () {
      $('#modalNuevo').modal('hide')
      // alert('mensaje guardado'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
    })
    .catch(function () {
      // alert('mensaje No guardado'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
    });
  llenarTabla();

};

function insertarStock(data,claveN, cantidadN, dataStock) {
  console.log(data)
  db.ref('stock').push(data)
    .then(function () {
     // validaEx(data, claveN, cantidadN, dataStock);
    })
    .catch(function () {
      // alert('mensaje No guardado'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
    });
  llenarTabla();
}

function llenarTabla() {

  var data = db.ref('partidas');
  var table = document.getElementById('contentTable');

  if (table) {

    table.innerHTML = "";

    data.orderByChild("articulo").on("child_added", function (datos) {

      var d = datos.val();
      {
        var row = table.insertRow(0);
        var cellClave = row.insertCell(0);
        var cellPartida = row.insertCell(1);
        var cellArticulo = row.insertCell(2);
        var cellFecha = row.insertCell(3);
        var cellCantidad = row.insertCell(4);
        var cellPU = row.insertCell(5);
        var cellTotal = row.insertCell(6);
        var cellEdit = row.insertCell(7);
        var cellDelete = row.insertCell(8);

        cellArticulo.innerHTML = d.articulo;
        cellCantidad.innerHTML = d.cantidad;
        cellClave.innerHTML = d.clave;
        cellFecha.innerHTML = d.fecha;
        cellPartida.innerHTML = d.partida;
        cellPU.innerHTML = "$ " + d.precioU + " MNX";
        var iva = (d.precioU*0.16);
        
          var ct = (parseFloat(d.precioU)+parseFloat(iva));
          
          cellTotal.innerHTML = "$ " + (ct * d.cantidad).toFixed(2) + " MNX";
        cellEdit.innerHTML = '<a class="btn btn-warning" onclick="edit(\'' + datos.key + '\')"><em class="fa fa-edit" style="color:white"></em></a>';
        cellDelete.innerHTML = ' <a class="btn btn-danger" onclick="remover(\'' + datos.key + '\')"><em class="fa fa-trash-alt" style="color:white"></em></a>';

      }

    })

  }
}
this.llenarTabla();

/** filtrar */

var form2 = document.getElementById('formFilter'); // Obtenemos la referencia al formulario
if (form2) { // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  document.getElementById("fechaIni").valueAsDate = new Date();
  document.getElementById("fechaFin").valueAsDate = new Date();
  form2.addEventListener('submit', filtrarFecha); // Al momento de enviar el formulario, ejecuta la función "contactform"
}
$('#modalFiltro').on('hidden.bs.modal', function (e) {
  form2.reset();
  document.getElementById("fechaIni").valueAsDate = new Date();
  document.getElementById("fechaFin").valueAsDate = new Date();
})

function filtrarFecha() {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  var data = db.ref('partidas');

  var startDate = document.getElementById("fechaIni");
  var endDate = document.getElementById("fechaFin");

  var table = document.getElementById('contentTable');
  if (table) {

    table.innerHTML = "";

    data.orderByChild("fecha").startAt(startDate.value).endAt(endDate.value)
      .on("child_added", function (datos) {
        var d = datos.val();

        {
          var row = table.insertRow(0);
          var cellClave = row.insertCell(0);
          var cellPartida = row.insertCell(1);
          var cellArticulo = row.insertCell(2);
          var cellFecha = row.insertCell(3);
          var cellCantidad = row.insertCell(4);
          var cellPU = row.insertCell(5);
          var cellTotal = row.insertCell(6);
          var cellEdit = row.insertCell(7);
          var cellDelete = row.insertCell(8);

          cellArticulo.innerHTML = d.articulo;
          cellCantidad.innerHTML = d.cantidad;
          cellClave.innerHTML = d.clave;
          cellFecha.innerHTML = d.fecha;
          cellPartida.innerHTML = d.partida;
          cellPU.innerHTML = "$ " + d.precioU + " MNX";
          var iva = (d.precioU*0.16);
         
          var ct = (parseFloat(d.precioU)+parseFloat(iva));
         
          cellTotal.innerHTML = "$ " + (ct * d.cantidad).toFixed(2)+ " MNX";
          cellEdit.innerHTML = '<a class="btn btn-warning" onclick="edit(\'' + datos.key + '\')"><em class="fa fa-edit" style="color:white"></em></a>';
          cellDelete.innerHTML = ' <a class="btn btn-danger" onclick="remover(\'' + datos.key + '\')"><em class="fa fa-trash-alt" style="color:white"></em></a>';

        }

      });
  }
  form2.reset(); // borramos todos los campos. 
}

function confirm(key){
  $("#mi-modal").modal('show');

  r(key);
}
function r(k){



$("#modal-btn-si").on("click", function(){
  callback(true,k);
  $("#mi-modal").modal('hide');
});

$("#modal-btn-no").on("click", function(){
  callback(false,k);
  $("#mi-modal").modal('hide');
});

}

 function callback(confirm,key){
  if(confirm){
    //Acciones si el usuario confirma
    remover(key);
  }else{
    //Acciones si el usuario no confirma
    
  }
};

function remover(key) {
  var data = db.ref('partidas');
  data.child(key).remove();
  this.llenarTabla()
}



function onKeyUp(event) {
  var keycode = event.keyCode;
  if (keycode == '13') {

    var search = document.getElementById("buscar");
    buscar(search.value);
    document.getElementById("butonDeleteSearch").style.display = "initial";

  }
}
function limpiarB() {
  document.getElementById("buscar").value = ""
  this.llenarTabla();
  document.getElementById("butonDeleteSearch").style.display = "none";
}

//buscador
function buscar(value) {
  var data = db.ref('partidas');

  var table = document.getElementById('contentTable');
  if (table) {

    table.innerHTML = "";
    data.orderByChild("partida").equalTo(value).on("child_added", function (datos) {
      var d = datos.val();

      {
        var row = table.insertRow(0);
        var cellClave = row.insertCell(0);
        var cellPartida = row.insertCell(1);
        var cellArticulo = row.insertCell(2);
        var cellFecha = row.insertCell(3);
        var cellCantidad = row.insertCell(4);
        var cellPU = row.insertCell(5);
        var cellTotal = row.insertCell(6);
        var cellEdit = row.insertCell(7);
        var cellDelete = row.insertCell(8);

        cellArticulo.innerHTML = d.articulo;
        cellCantidad.innerHTML = d.cantidad;
        cellClave.innerHTML = d.clave;
        cellFecha.innerHTML = d.fecha;
        cellPartida.innerHTML = d.partida;
        cellPU.innerHTML = "$ " + d.precioU + " MNX";
        var iva = (d.precioU*0.16);
          console.log(iva)
          var ct = (parseFloat(d.precioU)+parseFloat(iva));
          console.log(ct);
          cellTotal.innerHTML = "$ " + (ct * d.cantidad).toFixed(2) + " MNX";
        cellEdit.innerHTML = '<a class="btn btn-warning" onclick="edit(\'' + datos.key + '\')"><em class="fa fa-edit" style="color:white"></em></a>';
        cellDelete.innerHTML = ' <a class="btn btn-danger" onclick="remover(\'' + datos.key + '\')"><em class="fa fa-trash-alt" style="color:white"></em></a>';

      }

    });
  }
}

//editar
function edit(key) {
  var data = db.ref('partidas');
  data.orderByChild("articulo").on("child_added", function (datos) {
    var d = datos.val();
    {
      if (key == datos.key) {
      
        document.getElementById('idEd').value = datos.key;
        document.getElementById('articuloEd').value = d.articulo;
        document.getElementById('cantidadEd').value = d.cantidad;
        document.getElementById('claveEd').value = d.clave;
        document.getElementById("fechaEd").value = d.fecha;
        document.getElementById('partidaEd').value = d.partida;
       
        
  
        document.getElementById("precioUEd").value = d.precioU;
    

      }
      
    }
  });
  $('#modalNuevoEd').modal('show')

}
var form = document.getElementById('partidaFormEd'); // Obtenemos la referencia al formulario
if (form) { // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', editar); // Al momento de enviar el formulario, ejecuta la función "contactform"
  //para la validacion de solo numeros
}
$('#modalNuevoEd').on('hidden.bs.modal', function (e) {
  form.reset();
})


function editar(event){
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
const key = document.getElementById('idEd');
const partida = document.getElementById('partidaEd'); // Obtenemos la referencia a cada uno de nuestros elementos del formulario
const articulo = document.getElementById('articuloEd');
const clave = document.getElementById('claveEd');
const cantidad = document.getElementById('cantidadEd');
const precioU = document.getElementById("precioUEd");
const fecha = document.getElementById("fechaEd");

 
  update2(key.value,partida.value,articulo.value,clave.value,cantidad.value,precioU.value,fecha.value);
}

function update2(key,partida,articulo,clave,cantidad,precioU,fecha) {
  var data = db.ref('partidas');
  data.child(key)
    .update({
      partida: partida,
      articulo: articulo,
      clave: clave,
      cantidad: cantidad,
      precioU: precioU,
      fecha: fecha
    });
    $('#modalNuevoEd').modal('hide')
    this.llenarTabla();
}




/**validaciones date */

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("fecha").setAttribute("max", today);
//document.getElementById("fecha").setAttribute("min", today);

document.getElementById("fechaFin").setAttribute("max", today);
document.getElementById("fechaIni").setAttribute("max", today);

//Solo permite introducir numeros.
function soloNumeros(e) {
  var key = window.event ? e.which : e.keyCode;
  if (key < 48 || key > 57) {
    e.preventDefault();
  }
}
//generar Excel

function descargarExcel() {
  //Creamos un Elemento Temporal en forma de enlace
  var tmpElemento = document.createElement('a');
  // obtenemos la información desde el div que lo contiene en el html
  // Obtenemos la información de la tabla
  var data_type = 'data:application/vnd.ms-excel';
  var tabla_div = document.getElementById('tablaRepo');
  var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
  tmpElemento.href = data_type + ', ' + tabla_html;
  //Asignamos el nombre a nuestro EXCEL
  var fecha = new Date();
  tmpElemento.download = 'ReportePartidas ' + fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + '.xls';
  // Simulamos el click al elemento creado para descargarlo
  tmpElemento.click();
}