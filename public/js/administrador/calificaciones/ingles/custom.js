$(document).ready(function(){

  new CBPFWTabs( document.getElementById( 'tabs' ) );

  $("#subir-csv").fileinput({showCaption: false});

  var modal = document.getElementById('cargando');
  var modalConfirmar = document.getElementById('modal');

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
        url:   'obtener-secciones',
        type:  'post',
        success:  function (data) {
          $("#seccion").select2("val","");
          $('#seccion').html(data);
          modal.style.display = "none";
        }
      });
    }
  });

  $("#nucleo").change(function(){
    ocultar();
    $("#lapso").select2("val","");
    $("#curso").select2("val","");
    $("#curso").html("<option></option><option disabled>No hay cursos disponibles</option>");
    $("#seccion").select2("val","");
    $('#seccion').html("<option></option><option disabled>No hay secciones disponibles</option>");
    $("table tbody").empty();
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
      url: 'obtener-estudiantes',
      type: 'post',
      success:  function (data) {
        for(var i = 0; i < data.inscritosuba.length; i++){
          $("table tbody").append("<tr class='text-center'><td hidden>"+data.inscritosuba[i].id+"</td><td>"+(i+1)+"</td><td>"+data.inscritosuba[i].cedula+"</td><td>"+data.inscritosuba[i].estudiante.NOM_APE+"</td><td><input type='text' class='form-control primera-nota soloNumerosPunto' value='"+(data.inscritosuba[i].notaparcial != null ? data.inscritosuba[i].notaparcial.corte1 : '')+"'/></td><td><input type='text' class='form-control segunda-nota soloNumerosPunto'  value='"+(data.inscritosuba[i].notaparcial != null ? data.inscritosuba[i].notaparcial.corte2 : '')+"' /></td><td><span class='notaEscalaCien'>"+(data.inscritosuba[i].notaparcial != null ? parseInt(data.inscritosuba[i].notaparcial.corte1+data.inscritosuba[i].notaparcial.corte2) : '')+"</span></td><td><span class='nota-final'>"+(data.inscritosuba[i].notaparcial != null ? ( Math.round(((data.inscritosuba[i].notaparcial.corte1+data.inscritosuba[i].notaparcial.corte2)*20)/100) == 0 ? '1' : Math.round(((data.inscritosuba[i].notaparcial.corte1+data.inscritosuba[i].notaparcial.corte2)*20)/100) ) : '')+"</span></td><td><button type='button' class='btn btn-primary guardar' disabled><span class='fui-check'></span></button></td><td><span class='response' hidden></span></td></tr>");
        }
        validar();
        mostrar();
        modal.style.display = "none";
      }
    });
  });

  $(document).on('click','button[type=button].guardar',function(){
    var boton = $(this);
    var notas  = {};
    var i = 0;
    var id = $(this).parents('tr').children('td:first').text();
    var success = $(this).closest('td').siblings().find('span.response');

    $(this).closest('td').siblings().find('input').each(function(){
      notas[i] = $(this).val();
      i++;
    });
    boton.attr("disabled",true);
    $.ajax({
      data:  {
        id: id,
        nota1: notas[0],
        nota2: notas[1]
      },
      url:   'guardar-notas',
      type:  'post',
      success: function (data){
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
      var estudiante = {id: $(this).children(":first-child").text(), nota1: $(this).children().find('input[type=text].primera-nota').val(),
        nota2: $(this).children().find('input[type=text].segunda-nota').val()
      };
      validar.push(estudiante);
    });
    $.ajax({
      data:  {
        validar: validar
      },
      url:   'validar-notas',
      type:  'post',
      success: function (data){
        window.location = 'ingles';
      }
    });
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
      url:   'obtener-cursos-ingles',
      type:  'post',
      success:  function (data) {
        $("#curso").select2("val","");
        $('#curso').html(data);
        modal.style.display = "none";
      }
    });
  });

  $(document).on('keyup','input[type=text].primera-nota,input[type=text].segunda-nota',function(){
    if($(this).hasClass('primera-nota')){
      var nota1 = $(this).val();
      var nota2 = $(this).closest('td').siblings().find('input').val();
    }else{
      var nota1 = $(this).closest('td').siblings().find('input').val();
      var nota2 = $(this).val();
    }
    var actual = $(this);
    var nextInput = $(this).closest('td').siblings().find('input');
    var boton = $(this).closest('td').siblings().find('button[type=button].guardar');
    var notaFinalSpan = $(this).closest('td').siblings().find('span.nota-final');
    var notaEscalaCien = $(this).closest('td').siblings().find('span.notaEscalaCien');
    actual.closest('td').siblings().find('span.response').hide();
    if(actual.hasClass('primera-nota') && nota1 > 70){
      actual.addClass("has-error");
    }else if(actual.hasClass('segunda-nota') && nota2 > 30){
      actual.addClass("has-error");
    }else{
      actual.removeClass("has-error");
    }
    //Activa o desactiva el boton
    if(actual.hasClass('has-error') || nextInput.hasClass('has-error') || actual.val() == '' || nextInput.val() == ''){
      boton.attr("disabled",true);
    }else{
      boton.attr("disabled",false);
    }

    //Calculos
    if(nota1 > 70 || nota1 == ''){
      var nota1 = 0;
    }

    if(nota2 > 30 || nota2 == ''){
      var nota2 = 0;
    }
    var suma = parseInt((parseFloat(nota1)+parseFloat(nota2)));
    var total = parseInt(Math.round((suma*20)/100));

    if(nota1 == '' && nota2 == ''){
      notaFinalSpan.text('');
      notaEscalaCien.text('');
    }else if(total == 0){
      notaEscalaCien.text(1);
      notaFinalSpan.text(1);
    }else{
      notaEscalaCien.text(suma);
      notaFinalSpan.text(total);
    }
    validar();
  });
});
