$(document).ready(function(){
  $("input[type='radio']").on('change.radiocheck',function(){
    $.ajax({
      data:  {
        respuesta: $(this).val()
      },
      url:   'calificaciones/retroalimentacion',
      type:  'post',
      beforeSend: function() {
        $("#retroalimentacion").html("Firmado");
      }
    });
  });
});
