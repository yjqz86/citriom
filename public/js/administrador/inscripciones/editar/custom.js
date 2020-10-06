$(document).ready(function(){
  // Obtiene el modal
  var modal = document.getElementById('modal');

  // Obtiene el input que esta dentro del modal
  var inputCedula = document.getElementById('cedula-modal');

  // Cuando se hace click en cualquiera de los botones para eliminar se abre el modal
  $(document).on('click','button.eliminar',function(){
    var cedula = $(this).parents('tr').children('td:first').text();
    var id = $(this).closest('td').siblings().find('input[type=text]').val();
    $('#texto').text('Esta seguro que desea eliminar la inscripcion de '+cedula+" ?");
    inputCedula.value = id;
    modal.style.display = "block";
  });
});
