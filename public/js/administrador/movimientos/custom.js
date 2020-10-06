$(document).ready(function(){
  var nota = null;
  // Obtiene el modal
  var modal = document.getElementById('modal');
  //Mostrar
  function mostrar(){
    document.getElementById('mostrar').style.display = 'block';
  }

  function ocultar(){
    document.getElementById('mostrar').style.display = 'none';
  }

  //Cuando la cedula cambie
  $("#cedula").change(function(){
    $("#movimiento").select2("val", "");
    $("#lapso").select2("val", "");
    $("#mostrar").hide();
    $("#profesionalIdiomas").hide();
    $("#normal").hide();
    $.ajax({
      data:  {
        cedula: $('#cedula').val()
      },
      url:   'movimientos/obtener-estudiante',
      type:  'post',

      beforeSend: function(){
        $('#nombres').val('Buscando...');
        $('#escuela').val('Buscando...');
        $('#nucleo').val('Buscando...');
        $('#modalidad').val('Buscando...');
        $('#regimen').val('Buscando...');
        $('#telefono').val('Buscando...');
      },
      success:  function (data) {
        $('#nombres').val(data.nombres);
        $('#escuela').val(data.escuela);
        $('#nucleo').val(data.nucleo);
        $("#modalidad").val(data.modalidad);
        $('#regimen').val(data.regimen);
        $('#telefono').val(data.telefono);
        if(data.nombres == 'No encontrado'){
          ocultar();
        }else{
          mostrar();
        }
      }
    });
  });

  $("#movimiento").change(function(){
    if($(this).val() == 7 ||$(this).val() == 9){
      $("#normal").show();
      $("#profesionalIdiomas").hide();
      $("#observaciones").attr('required',false);
    }else{
      $("#profesionalIdiomas").show();
      $("#observaciones").attr('required',true);
      $("#normal").hide();
    }
  });

  $("#lapso").change(function(){
    $("#guardar").attr("disabled",false);
  });

  $("#guardar").click(function(){
    $("#cargando").show();
    $.ajax({
      data:  {
        cedula: $('#cedula').val()
      },
      url:   'movimientos/obtener-notas',
      type:  'post',
      success:  function (data) {
        $("#modal div.principal").html('<table style="margin:auto;"><thead><th class="text-center">Cédula</th><th class="text-center">Lapso</th><th class="text-center">Nivel</th><th class="text-center">Sección</th><th class="text-center">Nota</th><th class="text-center">Guardar</th></thead><tbody></tbody></table>');
        for(var i = 0; i < data.length; i++){
          $("#modal div.principal table tbody").append("<tr><td>"+data[i].CEDULA+"</td><td class='lapso'>"+data[i].LAPSO+"</td><td>"+data[i].COD_MAT+"</td><td>"+data[i].SECCION+"</td><td><input type='text' class='form-control nota' value='"+data[i].NOTA+"'/></td><td><button type='button' class='btn btn-primary guardar' disabled><span class='fui-check'></span></button></td></tr>");
        }
        $("#modal").show();
        $("#cargando").hide();
      }
    });
  });

  $(document).on("keyup","input.nota",function(){
    if($(this).val() > 20){
      $(this).addClass("has-error");
      $(this).parents("td").siblings().find('button.guardar').attr("disabled",true);
    }else{
      $(this).parents("td").siblings().find('button.guardar').attr("disabled",false);
      $(this).removeClass("has-error");
    }
  });

  $(document).on("click","button.guardar",function(){
    var calificacion = $(this).parents("td").siblings().find('input').val();
    var lapso = $(this).parents("tr").children('td.lapso').text();
    nota = [calificacion,lapso];
    $("#modal div.principal").html("<label><strong>Observaciones</strong></label><textarea class='form-control field' rows='5' cols='50' id='textareaObservaciones'></textarea>");
    $("button.cerrar").hide();
    $("#aceptar").show();
  });

  //Cosas del modal
  $(document).on("click", '.cerrar' ,function(){
    if(nota == null){
      modal.style.display = "none";
    }
  });

  window.onclick = function(event) {
    if (event.target == modal && nota == null){
      modal.style.display = "none";
    }
  }

  $(document).on("keyup","textarea",function(){
    if($(this).val() != ''){
      $("#aceptar").attr("disabled",false);
    }else{
      $("#aceptar").attr("disabled",true);
    }
  });

  $("#aceptar").click(function(){
    $("#cargando").show();
    $.ajax({
      data:  {
        cedula: $('#cedula').val(),
        nota: nota,
        observacion : $("#textareaObservaciones").val(),
        lapso: $("#lapso").val()
      },
      url:   'movimientos/acta-enmienda',
      type:  'post',
      success:  function (data) {
        window.location = 'movimientos';
      }
    });
  });
});
