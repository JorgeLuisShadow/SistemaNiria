$( document ).ready(function() {
    firebase.initializeApp({
        apiKey: "AIzaSyAE5jJKOvZCVZvjFkO0NUBwgvLz4KxnNWk",
        authDomain: "systemstec-69d04.firebaseapp.com",
        projectId: "systemstec-69d04",
        databaseURL: "https://systemstec-69d04.firebaseio.com/"
      }) 
     var bd= firebase.database().ref('stock')

     bd.orderByChild("id").on("child_added",function(datos){
         
         var exe=datos.val();
         var a=document.getElementById('cuerpo'); 
         a.innerHTML+=`<tr> 
         <td>${exe.articulo}</td>
         <td>${exe.clave}</td>
         <td>${exe.cantidad/2}</td> 
         </tr>`    
     })
          
    //      
             
    
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
}); 

})
 
  function exportTableToExcel2(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'Stock.xls';
    
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
    }}
    
