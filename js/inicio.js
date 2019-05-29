firebase.initializeApp({
    apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
    authDomain: "systemstec-69d04.firebaseapp.com",
    projectId: "systemstec-69d04",
    databaseURL: "https://systemstec-69d04.firebaseio.com/"
  })
  var db = firebase.database();
  
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
         /* var cellEdit = row.insertCell(7);
          var cellDelete = row.insertCell(8);*/
  
          cellArticulo.innerHTML = d.articulo;
          cellCantidad.innerHTML = d.cantidad;
          cellClave.innerHTML = d.clave;
          cellFecha.innerHTML = d.fecha;
          cellPartida.innerHTML = d.partida;
          cellPU.innerHTML = "$ " + d.precioU + " MNX";
          cellTotal.innerHTML = "$ " + (d.precioU * d.cantidad) + " MNX";
          /*cellEdit.innerHTML = '<a class="btn btn-warning"><em class="fa fa-edit" style="color:white"></em></a>';
          cellDelete.innerHTML = ' <a class="btn btn-danger" onclick="remover(\'' + datos.key + '\')"><em class="fa fa-trash-alt" style="color:white"></em></a>';*/
  
        }
  
      })
  
    }
  }
  this.llenarTabla();


  function llenarTablaStock(){
    var data = db.ref('stock');
    var table = document.getElementById('contentTableStock');
  
    if (table) {
  
      table.innerHTML = "";
  
      data.orderByChild("articulo").on("child_added", function (datos) {
  
        var d = datos.val();
        {
          var row = table.insertRow(0);
          var cellClave = row.insertCell(0);
         
          var cellArticulo = row.insertCell(1);
       
          var cellCantidad = row.insertCell(2);
        
         /* var cellEdit = row.insertCell(7);
          var cellDelete = row.insertCell(8);*/
  
          cellArticulo.innerHTML = d.articulo;
          cellCantidad.innerHTML = d.cantidad;
          cellClave.innerHTML = d.clave;
        
          /*cellEdit.innerHTML = '<a class="btn btn-warning"><em class="fa fa-edit" style="color:white"></em></a>';
          cellDelete.innerHTML = ' <a class="btn btn-danger" onclick="remover(\'' + datos.key + '\')"><em class="fa fa-trash-alt" style="color:white"></em></a>';*/
  
        }
  
      })
  
    }
  }
  this.llenarTablaStock();

  function descargarExcel(id,tit) {
    //Creamos un Elemento Temporal en forma de enlace
    var tmpElemento = document.createElement('a');
    // obtenemos la información desde el div que lo contiene en el html
    // Obtenemos la información de la tabla
    var data_type = 'data:application/vnd.ms-excel';
    var tabla_div = document.getElementById(id);
    var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
    tmpElemento.href = data_type + ', ' + tabla_html;
    //Asignamos el nombre a nuestro EXCEL
    var fecha = new Date();
    tmpElemento.download = 'Reporte'+tit+" "+ fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + '.xls';
    // Simulamos el click al elemento creado para descargarlo
    tmpElemento.click();
  }