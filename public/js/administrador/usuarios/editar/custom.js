$(document).ready(function(){
  // Obtiene el modal
  var modal = document.getElementById('modal');

  // Cuando se hace click en cualquiera de los botones para eliminar se abre el modal
  $(document).on('click','button.eliminar',function(){
    var usuario = $(this).parents('tr').children('td:nth-child(2)').text();
    $('#texto').text('Esta seguro que desea eliminar al usuario '+usuario+" ?");
    $("#usuario-modal").val(usuario);
    modal.style.display = "block";
  });
});
