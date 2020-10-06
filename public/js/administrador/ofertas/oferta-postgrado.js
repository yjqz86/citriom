$(document).ready(function(){
  $("#nivel").change(function(){
    $.ajax({
      type: 'post',
      url: 'obtener-carrera',
      data:{
        nivel: $('#nivel').val()
      },
      success: function(data){
        $('#carrera').html(data);
      }
    });

    $.ajax({
      type:  'post',
      url: 'obtener-curso',
      data:  {
        nivel: $('#nivel').val()
      },
      success:  function (data) {
        $('#curso').html(data);
      }
    });

    $("#carrera").select2("val", "");
    $('#carrera').html('<option></option><option disabled>No hay carreras disponibles</option>');
    $("#curso").select2("val", "");
    $('#curso').html('<option></option><option disabled>No hay cursos disponibles</option>');
    $("#nucleo").select2("val", "");
    $('#nucleo').html('<option></option><option disabled>No hay nucleos disponibles</option>');
  });

  $("#carrera").change(function(){
    $.ajax({
      type:  'post',
      url: 'obtener-nucleo',
      data:  {
        carrera: $('#carrera').val()
      },
      success:  function (data) {
        $('#nucleo').html(data);
      }
    });
    $("#nucleo").select2("val", "");
    $('#nucleo').html('<option></option><option disabled>No hay nucleos disponibles</option>');
    $("#curso").select2("val", "");
  });


  $("#nucleo").change(function(){
    $("#curso").select2("val", "");
  });

  //Busca el nombre del facilitador
  $("#cedulaFacilitador").change(function(){
    $.ajax({
      data:  {
        cedulaFacilitador: $('#cedulaFacilitador').val()
      },
      url:   'obtener-facilitador',
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

  //Horas
  $('#horaEntrada,#horaSalida').timepicker({defaultTime:null});
  //Fechas
  $('#fechaInicio,#fechaFin').datepicker({
    language: "es",
    autoclose: true,
    format: "yyyy-mm-dd"
  });

  $('#fechaApertura,#fechaCierre').datetimepicker({
    locale: "es",
    format: "Y-MM-DD HH:m"
  });

  if ($('#turno').val().indexOf('Semi-Presencial')){

    document.getElementById('horaSalida').readOnly=true;
    document.getElementById('horaSalida').disabled=true;
    document.getElementById('horaSalida').value='VIRTUAL';
    document.getElementById('horaEntrada').readOnly=true;
    document.getElementById('horaEntrada').disabled=true;
    document.getElementById('horaEntrada').value='VIRTUAL';

  }

});
