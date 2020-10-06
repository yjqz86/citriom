$(document).ready(function(){

  var modal = document.getElementById('cargando');
  var modalConfirmar = document.getElementById('modal');
  var modal2 = document.getElementById('modal2');

  // When the user clicks on <span> (x), close the modal
  $(document).on("click", '.cerrar' ,function() {
      modal2.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal2) {
          modal2.style.display = "none";
      }
  }

  function mostrar(){
    document.getElementById('tablita').style.display = 'block';
  }

  function ocultar(){
    document.getElementById('tablita').style.display = 'none';
  }

  function validar(){
    $("table tbody").children("tr").each(function(){
      var continuar = true;
      $(this).children().find("input").each(function(){
        if($(this).val() == '' || $(this).hasClass('has-error')){
          $("#validar").attr("disabled",true);
          continuar = false;
          return false;
        }else{
          $("#validar").attr("disabled",false);
        }
      });
      return continuar;
    });
  }

  $("#nucleo").change(function(){
    ocultar();
    $("#lapso").select2("val","");
    $("#curso").select2("val","");
    $("#curso").html("<option></option><option disabled>No hay cursos disponibles</option>");
    $("#seccion").select2("val","");
    $('#seccion').html("<option></option><option disabled>No hay secciones disponibles</option>");
    $("table tbody").empty();
  });

  $("#lapso").change(function(){
    ocultar();
    $("#curso").select2("val","");
    $('#curso').html("<option></option><option disabled>No hay cursos disponibles</option>");
    $("#seccion").select2("val","");
    $('#seccion').html("<option></option><option disabled>No hay secciones disponibles</option>");
    $("table tbody").empty();
    modal.style.display = "block";
    $.ajax({
      data:  {
        nucleo: $("#nucleo").val(),
        lapso: $('#lapso').val(),
      },
      url:   'obtener-cursos-psi-postgrado',
      type:  'post',
      success:  function (data) {
        $("#curso").select2("val","");
        $('#curso').html(data);
        modal.style.display = "none";
      }
    });
  });

  $("#curso").change(function(){
    ocultar();
    $("#seccion").select2("val","");
    $('#seccion').html("<option></option><option disabled>No hay secciones disponibles</option>");
    $("table tbody").empty();
    modal.style.display = "block";
    if($("#lapso").val() != '' && $("#nucleo").val()){
      $.ajax({
        data:  {
          curso: $('#curso').val(),
          nucleo: $('#nucleo').val(),
          lapso: $('#lapso').val(),
        },
        url:   'obtener-secciones-psi',
        type:  'post',
        success:  function (data) {
          $("#seccion").select2("val","");
          $('#seccion').html(data);
          modal.style.display = "none";
        }
      });
    }
  });

  $("#seccion").change(function(){
    $("table tbody").empty();
    modal.style.display = "block";
    $.ajax({
      data:  {
        curso: $('#curso').val(),
        nucleo: $('#nucleo').val(),
        lapso: $('#lapso').val(),
        seccion: $("#seccion").val()
      },
      url:   'obtener-estudiantes-psi',
      type:  'post',
      success:  function (data) {
        for(var i = 0; i < data.inscritosposgrado.length; i++){
          $("table tbody").append("<tr class='text-center'><td hidden>"+data.inscritosposgrado[i].id+"</td><td>"+(i+1)+"</td><td>"+data.inscritosposgrado[i].cedula+"</td><td>"+data.inscritosposgrado[i].estudiante.nombres+"  "+data.inscritosposgrado[i].estudiante.apellidos+"</td><td><input type='text' class='form-control soloNumerosPunto' maxlength = '4' value='"+(data.inscritosposgrado[i].notaparcial != null ? data.inscritosposgrado[i].notaparcial.corte1 : '')+"'/></td><td><button type='button' class='btn btn-primary guardar' disabled><span class='fui-check'></span></button></td><td><span class='response' hidden></span></td></tr>");
        }
        validar();
        mostrar();
        modal.style.display = "none";
      }
    });
  });

  $(document).on('keyup','input[type=text]',function(){
    var actual = $(this);
    var boton = $(this).closest('td').siblings().find('button[type=button].guardar');
    actual.closest('td').siblings().find('span.response').hide();
    if(actual.val() > 100){
      actual.addClass("has-error");
    }else{
      actual.removeClass("has-error");
    }
    //Activa o desactiva el boton
    if(actual.hasClass('has-error') || actual.val() == ''){
      boton.attr("disabled",true);
    }else{
      boton.attr("disabled",false);
    }
    validar();
  });

  $(document).on('click','button[type=button].guardar',function(){
    var boton = $(this);
    var id = $(this).parents('tr').children('td:first').text();
    var success = $(this).closest('td').siblings().find('span.response');
    boton.attr("disabled",true);
    var nota = $(this).closest('td').siblings().find('input').val();
    $.ajax({
      data:  {
        id: id,
        nota: nota
      },
      url:   'guardar-notas/psi-postgrado',
      type:  'post',
      success: function (data){
        if(nota <58){
          $("#texto").html("Con esta nota no se aprueba ningun nivel");
        }else if(nota >= 58 && nota <= 72){
          $("#texto").html("Con esta nota se aprueba <strong>Nivel I</strong>");
        }else if(nota >=73 && nota <=82){
          $("#texto").html("Con esta nota se aprueba <strong>Nivel I y Nivel II</strong>");
        }else if(nota >= 83 && nota <= 92){
          $("#texto").html("Con esta nota se aprueba <strong>Nivel I, Nivel II y Nivel III</strong>");
        }else{
          $("#texto").html("Con esta nota se aprueban todos los niveles");
        }
        modal2.style.display = "block";
        if(data == 1){
          success.text('Exito!');
          if(!success.hasClass('text-success')){
            success.addClass('text-success');
            success.removeClass('text-danger');
          }
          success.show();
        }else{
          success.text('Error!');
          if(!success.hasClass('text-danger')){
            success.addClass('text-danger');
            success.removeClass('response');
          }
          success.show();
        }
        boton.attr("disabled",false);
      }
    });
  });

  $("#validar").click(function(){
    modalConfirmar.style.display = "block";
  });

  $("#aceptarValidar").click(function(){
    modalConfirmar.style.display = "none";
    modal.style.display = "block";
    var validar = [];
    $("table tbody tr").each(function(){
      var estudiante = {id: $(this).children(":first-child").text(), nota: $(this).children().find('input[type=text]').val()
      };
      validar.push(estudiante);
    });
    $.ajax({
      data:  {
        validar: validar
      },
      url:   'validar-notas/psi-postgrado',
      type:  'post',
      success: function (data){
        window.location = 'psi';
      }
    });
  });
});
