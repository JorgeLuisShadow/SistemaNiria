firebase.initializeApp({
  apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
  authDomain: "systemstec-69d04.firebaseapp.com",
  projectId: "systemstec-69d04",
  databaseURL: "https://systemstec-69d04.firebaseio.com/"
})
var db = firebase.database();

/** agregar nueva */
var form = document.getElementById('equiposForm'); // Obtenemos la referencia al formulario
if (form) { // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', partidaForm1); // Al momento de enviar el formulario, ejecuta la función "contactform"
  //para la validacion de solo numeros
}
$('#modalNuevo1').on('hidden.bs.modal', function (e) {
  form.reset();

})

function partidaForm1(event) {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)

  const articulo = document.getElementById('articulo');
  const departamento = document.getElementById('departamento');
  const encargado = document.getElementById('encargado');
  const descripcion = document.getElementById('descripcion');
  const nSerie = document.getElementById("nSerie");
  const nMac = document.getElementById("nMac");
  const nIp = document.getElementById("nIp");


  const data = {
    'departamento': departamento.value,
    'articulo': articulo.value,
    'encargado': encargado.value,
    'descripcion': descripcion.value,
    'nSerie': nSerie.value,
    'nMac': nMac.value,
    'nIp': nIp.value
  };
  insertarEquipos(data);
  form.reset(); // borramos todos los campos. 
}

function insertarEquipos(data) {


  db.ref('equipos').push(data)
    .then(function () {
      $('#modalNuevo1').modal('hide')
      // alert('mensaje guardado'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
    })
    .catch(function () {
      // alert('mensaje No guardado'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
    });
  llenarTabla();

};

function llenarTabla() {

  var data = db.ref('equipos');
  var table = document.getElementById('contentTable');

  if (table) {

    table.innerHTML = "";

    data.orderByChild("articulo").on("child_added", function (datos) {

      var d = datos.val();

      {
        var row = table.insertRow(0);
        var cellArticulo = row.insertCell(0);
        var cellDpto = row.insertCell(1);
        var cellEncargado = row.insertCell(2);
        var cellDescripcion = row.insertCell(3);

        var cellNSerie = row.insertCell(4);
        var cellNMac = row.insertCell(5);
        var cellNIp = row.insertCell(6);

        var cellEdit = row.insertCell(7);
        var cellDelete = row.insertCell(8);

        cellArticulo.innerHTML = d.articulo;
        cellDpto.innerHTML = d.departamento;
        cellDescripcion.innerHTML = d.descripcion;
        cellEncargado.innerHTML = d.encargado;
        cellNSerie.innerHTML = d.nSerie;
        cellNMac.innerHTML = d.nMac;
        cellNIp.innerHTML = d.nIp;

        cellEdit.innerHTML = '<a class="btn btn-warning" onclick="edit(\'' + datos.key + '\')"><em class="fa fa-edit" style="color:white"></em></a>';
        cellDelete.innerHTML = ' <a class="btn btn-danger" onclick="remover(\'' + datos.key + '\')"><em class="fa fa-trash-alt" style="color:white"></em></a>';

      }

    })

  }
}
this.llenarTabla();

function remover(key) {
  var data = db.ref('equipos');
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
  var data = db.ref('equipos');

  var table = document.getElementById('contentTable');
  if (table) {

    table.innerHTML = "";
    data.orderByChild("departamento").equalTo(value).on("child_added", function (datos) {
      var d = datos.val();

      {
        var row = table.insertRow(0);
        var cellArticulo = row.insertCell(0);
        var cellDpto = row.insertCell(1);
        var cellEncargado = row.insertCell(2);
        var cellDescripcion = row.insertCell(3);

        var cellNSerie = row.insertCell(4);
        var cellNMac = row.insertCell(5);
        var cellNIp = row.insertCell(6);

        var cellEdit = row.insertCell(7);
        var cellDelete = row.insertCell(8);

        cellArticulo.innerHTML = d.articulo;
        cellDpto.innerHTML = d.departamento;
        cellDescripcion.innerHTML = d.descripcion;
        cellEncargado.innerHTML = d.encargado;
        cellNSerie.innerHTML = d.nSerie;
        cellNMac.innerHTML = d.nMac;
        cellNIp.innerHTML = d.nIp;

        cellEdit.innerHTML = '<a class="btn btn-warning" onclick="edit(\'' + datos.key + '\')"><em class="fa fa-edit" style="color:white"></em></a>';
        cellDelete.innerHTML = ' <a class="btn btn-danger" onclick="remover(\'' + datos.key + '\')"><em class="fa fa-trash-alt" style="color:white"></em></a>';

      }

    });
  }
}

//editar

let keyG ='';

function edit(key) {
  var data = db.ref('equipos');
  data.orderByChild("articulo").on("child_added", function (datos) {
    var d = datos.val();

    {
      if (key == datos.key) {
        document.getElementById('idEd').value = datos.key;
        document.getElementById('articuloEd').value = d.articulo;
        document.getElementById('departamentoEd').value = d.departamento;
        document.getElementById('encargadoEd').value = d.encargado;
        document.getElementById('descripcionEd').value = d.descripcion;
        document.getElementById("nSerieEd").value = d.nSerie;
        document.getElementById("nMacEd").value = d.nMac;
        document.getElementById("nIpEd").value = d.nIp;


      }
      
    }
  });
  $('#modalNuevo2').modal('show')

}

var form = document.getElementById('equiposForm1'); // Obtenemos la referencia al formulario
if (form) { // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', editar); // Al momento de enviar el formulario, ejecuta la función "contactform"
  //para la validacion de solo numeros
}
$('#modalNuevo2').on('hidden.bs.modal', function (e) {
  form.reset();
})

function editar(event){
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
const key = document.getElementById('idEd');
  const articulo = document.getElementById('articuloEd');
  const departamento = document.getElementById('departamentoEd');
  const encargado = document.getElementById('encargadoEd');
  const descripcion = document.getElementById('descripcionEd');
  const nSerie = document.getElementById("nSerieEd");
  const nMac = document.getElementById("nMacEd");
  const nIp = document.getElementById("nIpEd");

  const data = {
    departamento: departamento.value,
    articulo: articulo.value,
    encargado: encargado.value,
    descripcion: descripcion.value,
    nSerie: nSerie.value,
    nMac: nMac.value,
    nIp: nIp.value
  };
  update2(key.value,departamento.value,articulo.value,encargado.value,descripcion.value,nSerie.value,nMac.value,nIp.value);
}

function update2(key,departamento,articulo,encargado,descripcion,nSerie,nMac,nIp) {
  var data = db.ref('equipos');
  data.child(key)
    .update({
      departamento: departamento,
      articulo: articulo,
      encargado: encargado,
      descripcion: descripcion,
      nSerie: nSerie,
      nMac: nMac,
      nIp: nIp
    });
    $('#modalNuevo2').modal('hide')
    this.llenarTabla();
}

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
  tmpElemento.download = 'ReporteEq.Computo ' + fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + '.xls';
  // Simulamos el click al elemento creado para descargarlo
  tmpElemento.click();
}