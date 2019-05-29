$( document ).ready(function() {
   
firebase.initializeApp({
  apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
  authDomain: "systemstec-69d04.firebaseapp.com",
  projectId: "systemstec-69d04",
  databaseURL: "https://systemstec-69d04.firebaseio.com/"
})  
var b=document.getElementById('articulos')
var bd2= firebase.database().ref('stock') 
     bd2.orderByChild("id").on("child_added",function(datos){
      var ww = datos.val()
      b.innerHTML+=`<option value="${ww.articulo}">${ww.articulo}</option> `  
  });
  
 var b2=document.getElementById('tablasd')
var bd21= firebase.database().ref('prestamos') 
     bd21.orderByChild("id").on("child_added",function(datos){
      var ws = datos.val()
      b2.innerHTML+=`<tr>
               <th scope="row">${datos.key}</th>
               <td>${ws.articulos}</td>
               <td>${ws.clave}</td>
               <td>${ws.cantidad}</td>
               <td>${ws.encargado}</td>
               <td>${ws.solicitante}</td>
               <td>${ws.departamento}</td>
                  </tr>`  
  });
  
});


function vert() {
  var b=document.getElementById('tablasd')
  b.innerHTML=""
var bd2= firebase.database().ref('stock') 
     bd2.orderByChild("id").on("child_added",function(datos){
      var ww = datos.val()
      b.innerHTML+=`<option value="${ww.articulo}">${ww.articulo}</option> `  
  });
  
 var b2=document.getElementById('tablasd')
 b2.innerHTML=""
var bd21= firebase.database().ref('prestamos') 
     bd21.orderByChild("id").on("child_added",function(datos){
      var ws = datos.val()
      b2.innerHTML+=`<tr>
               <th scope="row">${datos.key}</th>
               <td>${ws.articulos}</td>
               <td>${ws.clave}</td>
               <td>${ws.cantidad}</td>
               <td>${ws.encargado}</td>
               <td>${ws.solicitante}</td>
               <td>${ws.departamento}</td>
                  </tr>`  
  });
}
 

 function filtrarcateg() {
  var b21=document.getElementById('tablasd')
  b21.innerHTML=""
  var bd21= firebase.database().ref('prestamos') 
       bd21.orderByChild("departamento").equalTo($("#dep").val()).on("child_added",function(datos){
        var ws1 = datos.val()
        b21.innerHTML+=`<tr>
                 <th scope="row">${datos.key}</th>
                 <td>${ws1.articulos}</td>
                 <td>${ws1.clave}</td>
                 <td>${ws1.cantidad}</td>
                 <td>${ws1.encargado}</td>
                 <td>${ws1.solicitante}</td>
                 <td>${ws1.departamento}</td>
                    </tr>`  
    });
 }
 function clave() {
  var bd211= firebase.database().ref('stock') 
  bd211.orderByChild("articulo").equalTo($("#articulos").val()).on("child_added",function(datos){
    var x= datos.val();
    $("#clave").val(x.clave)
  })
 }
function guardar(){
  
   modificar($("#clave").val())
   arrayi={ articulo:$("#articulos").val(),
   clave: $("#cantidad").val(),
   encargado : $("#encargado").val(),
    solicitante : $("#solicitante").val(),
    departamento : $("#depa").val()}
   firebase.database().ref('prestamos').push(arrayi); 
}  
function exportTableToExcel(tableID, filename = ''){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}

function modificar(id) { 
  var c
  var ca
  var val
  var bd= firebase.database().ref('stock')

     bd.orderByChild("id").on("child_added",function(datos){
         var exe=datos.val(); 
         val=exe.clave 
         if (val==id) {
          c= datos.key;
          if ($("#cantidad").val()>(parseInt(exe.cantidad))) {
            alert('no hay suficientes articulos');
           }
           else{
            ca=exe.cantidad;
            ca=ca-($("#cantidad").val())
            var postData = {
              cantidad:ca
            };
            firebase.database().ref('/stock/'+c).update(postData);
             
           
            
           }
         }
            
     })   } 