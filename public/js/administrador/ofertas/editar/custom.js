$(document).ready(function(){
  //Horas
  $('#horaEntrada,#horaSalida').timepicker({defaultTime:null});
  //Fechas
  $('#fechaInicio,#fechaFin').datepicker({
    language: "es",
    autoclose: true,
    format: "yyyy-mm-dd"
  });

  $('#fechaApertura').datetimepicker({
    locale: "es",
    format: "Y-MM-DD HH:m",
    minDate: $('#fechaApertura').val()
  });

  $('#fechaCierre').datetimepicker({
    locale: "es",
    format: "Y-MM-DD H:m",
    minDate: $('#fechaCierre').val()
  });

  if($("#niveles").val().indexOf('C') != -1){
    //Desactiva las horas y pone de texto 'VIRTUAL'
    document.getElementById('horaSalida').readOnly=true;
    document.getElementById('horaSalida').disabled=true;
    document.getElementById('horaSalida').value='VIRTUAL';
    document.getElementById('horaEntrada').readOnly=true;
    document.getElementById('horaEntrada').disabled=true;
    document.getElementById('horaEntrada').value='VIRTUAL';
  }

  $("#nucleo").change(function(){
    //Resetea todo
    $("#modalidad").select2("val", "");
    $('#modalidad').html('<option></option><option disabled>No hay modalidades disponibles</option>');
    $("#niveles").select2("val", "");
    $('#niveles').html('<option></option><option disabled>No hay niveles disponibles</option>');
    $("#nuevoIngreso").select2("val", "");
    $('#nuevoIngreso').html('<option></option><option disabled>No hay opciones disponibles</option>');
    $("#turno").select2("val", "");
    $('#turno').html('<option></option><option disabled>No hay turnos disponibles</option>');
    $("#aulas").select2("val", "");
    $('#aulas').html('<option></option><option disabled>No hay aulas disponibles</option>');
    $("#dias").select2("val", "");
    $('#dias').html('<option></option><option disabled>No hay dias disponibles</option>');
    document.getElementById('horaSalida').readOnly=false;
    document.getElementById('horaEntrada').value=null;
    document.getElementById('horaEntrada').readOnly=false;
    document.getElementById('horaSalida').value=null;
    //Si la palabra San Joquin no existe, quiere decir que es cualquiera de los otros y deben desactivarse las modalidades
    if ($('#nucleo').val() != 0){
      $('#modalidad').html('<option></option><option value="0">0 - Maracay y Nucleos</option>');
    }else{
      $.ajax({
        data:  {
          nucleo: $('#nucleo').val()
        },
        url: '../obtener-modalidades',
        type:  'post',
        success:  function (data) {
          $('#modalidad').html(data);
        }
      });
    }
  });

  $("#modalidad").change(function(){
      //Resetea todo
      $("#niveles").select2("val", "");
      $('#niveles').html('<option></option><option disabled>No hay niveles disponibles</option>');
      $("#nuevoIngreso").select2("val", "");
      $('#nuevoIngreso').html('<option></option><option disabled>No hay opciones disponibles</option>');
      $("#turno").select2("val", "");
      $('#turno').html('<option></option><option disabled>No hay turnos disponibles</option>');
      $("#aulas").select2("val", "");
      $('#aulas').html('<option></option><option disabled>No hay aulas disponibles</option>');
      $("#dias").select2("val", "");
      $('#dias').html('<option></option><option disabled>No hay dias disponibles</option>');
      document.getElementById('horaSalida').value=null;
      document.getElementById('horaSalida').readOnly=false;
      document.getElementById('horaSalida').disabled=false;
      document.getElementById('horaEntrada').value=null;
      document.getElementById('horaEntrada').readOnly=false;
      document.getElementById('horaEntrada').disabled=false;

      $.ajax({
        data:  {
          nucleo: $('#nucleo').val(),
          modalidad: $('#modalidad').val()
        },
        url: '../obtener-niveles',
        type:  'post',
        success:  function (data) {
          $('#niveles').html(data);
        }
      });
  });

  //Operaciones al seleccionar un nivel
  $("#niveles").change(function(){
    //Resetea todo
    $("#turno").select2("val", "");
    $('#turno').html('<option></option><option disabled>No hay turnos disponibles</option>');
    $("#aulas").select2("val", "");
    $('#aulas').html('<option></option><option disabled>No hay aulas disponibles</option>');
    $("#dias").select2("val", "");
    $('#dias').html('<option></option><option disabled>No hay dias disponibles</option>');
    document.getElementById('horaSalida').value=null;
    document.getElementById('horaSalida').readOnly=false;
    document.getElementById('horaSalida').disabled=false;
    document.getElementById('horaEntrada').value=null;
    document.getElementById('horaEntrada').readOnly=false;
    document.getElementById('horaEntrada').disabled=false;
    if($("#niveles").val() == 'CSS300' || $("#niveles").val() == 'ITD300' || $("#niveles").val() == 'PSI800' || $("#niveles").val() == 'PSI900'){
      $("#nuevoIngreso").select2("val", "");
      $('#nuevoIngreso').html('<option></option><option value="1">Si</option><option value="0">No</option>');
    }else{
      $("#nuevoIngreso").select2("val", "");
      $('#nuevoIngreso').html('<option></option><option value="0">No</option>');
    }
    if ($('#niveles').val().indexOf('C') != -1 ){
      //Activa solo la opcion Semi-Presencial
      $('#turno').html('<option></option><option value="Semi-Presencial">Semi-Presencial</option>');
      //Activa solo el Aula Virtual
      $('#aulas').html('<option></option><option value="VIRTUAL">VIRTUAL</option>');
      //Pone los dias virtuales
      $('#dias').html('<option></option><option value="VIRTUAL">VIRTUAL</option>');
      //Desactiva las horas y pone de texto 'VIRTUAL'
      document.getElementById('horaSalida').readOnly=true;
      document.getElementById('horaSalida').disabled=true;
      document.getElementById('horaSalida').value='VIRTUAL';
      document.getElementById('horaEntrada').readOnly=true;
      document.getElementById('horaEntrada').disabled=true;
      document.getElementById('horaEntrada').value='VIRTUAL';

    }else{
      //Devuelve los turnos
      $.ajax({
        data:  null,
        url: '../obtener-italiano',
        type:  'post',
        success:  function (data) {
          $('#turno').html(data.turnos);
          $('#dias').html(data.dias);
          $('#aulas').html(data.aulas);
        }
      });
      //Vuelve a poner las horas
      document.getElementById('horaSalida').value=null;
      document.getElementById('horaSalida').readOnly=false;
      document.getElementById('horaSalida').disabled=false;
      document.getElementById('horaEntrada').value=null;
      document.getElementById('horaEntrada').readOnly=false;
      document.getElementById('horaEntrada').disabled=false;
    }
  });

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
