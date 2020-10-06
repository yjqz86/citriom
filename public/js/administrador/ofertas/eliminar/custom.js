$(document).ready(function(){
  // Obtiene el modal
  var modal = document.getElementById('modal');

  // Obtiene el input que esta dentro del modal
  var inputId = document.getElementById('id-modal');

  // Cuando se hace click en cualquiera de los botones para eliminar se abre el modal
  $(document).on('click','button.eliminar',function(){
    var idOferta = $(this).parents('tr').children('td:first').text();
    $('#texto').text('Esta seguro que desea eliminar la oferta '+idOferta+" ?");
    inputId.value = idOferta;
    modal.style.display = "block";
  });
});
