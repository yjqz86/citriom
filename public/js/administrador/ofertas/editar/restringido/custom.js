$(document).ready(function(){
  //Busca el nombre del facilitador
  $("#cedulaFacilitador").change(function(){
    $.ajax({
      data:  {
        cedulaFacilitador: $('#cedulaFacilitador').val()
      },
      url:   '../obtener-facilitador',
      type:  'post',
      beforeSend: function(){
        $("#nombreFacilitador").val('Buscando...');
      },
      success:  function (data) {
        if(data != 'TEMPORAL'){
          $("#nombreFacilitador").val(data.nombres);
        }else{
          $("#nombreFacilitador").val(data);
        }
        if(!data){
          $("#nombreFacilitador").val('Facilitador no encontrado');
        }
      }
    });
  });

});
