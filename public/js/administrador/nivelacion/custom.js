$(document).ready(function(){

  var modal = document.getElementById('cargando');
  var modalAlerta = document.getElementById('modal');

  String.prototype.capitalize = function(lower) {
      return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  $("#nucleo").change(function(){
    $("#curso").select2("val", "");
    $("#modalidad").select2("val", "");
    $("#curso").html('<option></option><option disabled>No hay cursos disponibles</option>');
    $("#modalidad").html('<option></option><option disabled>No hay modalidades disponibles</option>');
    $.ajax({
      data:  {
        nucleo: $('#nucleo').val()
      },
      url: 'nivelacion/obtener-modalidades',
      type:  'post',
      success:  function (data) {
        $('#modalidad').html(data);
      }
    });
  });

  $("#modalidad").change(function(){
    $("#curso").select2("val", "");
    $("#curso").html('<option></option><option disabled>No hay cursos disponibles</option>');
    $.ajax({
      data:  {
        nucleo: $('#nucleo').val(),
        modalidad: $('#modalidad').val()
      },
      url: 'nivelacion/obtener-cursos',
      type:  'post',
      success:  function (data) {
        $('#curso').html(data);
      }
    });
  });

  $("#buscar").click(function(){
    if($('#nucleo').val() != '' && $('#modalidad').val() != '' && $('#lapso').val() != '' && $('#regimen').val() != '' && $('#curso').val() != ''){
      modal.style.display = "block";
      $("#origen").select2("val", "");
      $("#origen").html('<option></option><option value=null disabled>No hay secciones disponibles</option>');
      $("#destino").select2("val", "");
      $("#destino").html('<option></option><option value=null disabled>No hay secciones disponibles</option>');
      $.ajax({
        data:  {
          nucleo: $('#nucleo').val(),
          modalidad: $('#modalidad').val(),
          lapso : $('#lapso').val(),
          regimen: $('#regimen').val(),
          curso: $('#curso').val()
        },
        url: 'nivelacion/obtener-origen',
        type:  'post',
        success:  function (data) {
          $('#origen').html(data);
          modal.style.display = "none";
        }
      });
    }

  });

  $("#origen").change(function(){
    modal.style.display = "block";
    $("#destino").select2("val", "");
    $("#destino").html('<option></option><option value=null disabled>No hay secciones disponibles</option>');
    $.ajax({
      data:  {
        nucleo: $('#nucleo').val(),
        modalidad: $('#modalidad').val(),
        lapso : $('#lapso').val(),
        regimen: $('#regimen').val(),
        curso: $('#curso').val(),
        origen: $("#origen option:selected").text()
      },
      url: 'nivelacion/obtener-destino',
      type:  'post',
      success:  function (data) {
        $('#destino').html(data);
        modal.style.display = "none";
      }
    });
  });

  $("#nucleo, #modalidad, #lapso, #regimen, #curso").change(function(){
    $("#origen").select2("val", "");
    $("#origen").html('<option></option><option value=null disabled>No hay secciones disponibles</option>');
    $("#destino").select2("val", "");
    $("#destino").html('<option></option><option value=null disabled>No hay secciones disponibles</option>');
  });

  $("#destino").change(function(){
    reiniciar();
    llenarTablas();
  });

  $("#selectAll").on('change.radiocheck', function(){
    $("#selectBottom").prop('checked',false);
    $("#selectTop").prop('checked',false);
    if($(this).is(":checked")){
      $(this).parents('table').find('tbody tr').each(function(){
        $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',true);
      });
    }else{
      $(this).parents('table').find('tbody tr').each(function(){
        $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',false);
      });
    }
  });

  $("#nivelar").click(function(){
    var estudiantes = [];
    $("#tablaOrigen").find('tbody tr').each(function(){
      var box = $(this).find('td:first-child label.checkbox').children(':first-child');
      if(box.is(":checked")){
        estudiantes.push(box.val());
      }
    });
    if(estudiantes.length >= 1 && estudiantes.length <= $("#cupos").val()){
      modal.style.display = "block";
      $.ajax({
        data:  {
          idDestino: $('#destino').val(),
          arrayEstudiantes: estudiantes
        },
        url: 'nivelacion/nivelar-secciones',
        type:  'post',
        success:  function (data) {
          reiniciar();
          llenarTablas();
        }
      });
      modal.style.display = "none";
    }else if(estudiantes.length > $("#cupos").val()){
      modalAlerta.style.display = "block";
    }

  });

  $("#selectTop").on('change.radiocheck', function(){
    $("#selectAll").prop('checked',false);
    $("#selectBottom").prop('checked',false);
    var cantidad = $("#tablaOrigen").find('tbody tr').length;
    var mitad = parseInt(cantidad/2);
    var prueba = $(this).is(":checked");

    $("#tablaOrigen").find('tbody tr').each(function(count){
      if(count <= mitad){
        if(prueba){
          $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',true);
        }else{
          $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',false);
        }
      }else{
        $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',false);
      }
    });
  });

  $("#selectBottom").on('change.radiocheck', function(){
    $("#selectAll").prop('checked',false);
    $("#selectTop").prop('checked',false);
    var cantidad = $("#tablaOrigen").find('tbody tr').length;
    var mitad = parseInt(cantidad/2);
    var prueba = $(this).is(":checked");

    $("#tablaOrigen").find('tbody tr').each(function(count){
      if(count >= mitad){
        if(prueba){
          $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',true);
        }else{
          $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',false);
        }
      }else{
        $(this).find('td:first-child label.checkbox').children(':first-child').prop('checked',false);
      }
    });
  });

  function reiniciar(){
    $("#tablaOrigen tbody").html("<tr><td colspan=3>No hay alumnos.</td></tr>");
    $("#tablaDestino tbody").html("<tr><td colspan=2>No hay alumnos.</td></tr>");
    //Desactiva los botones
    $("#selectAll").attr('disabled',true);
    $("#selectTop").attr('disabled',true);
    $("#selectBottom").attr('disabled',true);
    $("#nivelar").attr('disabled',true);

    $("#seccionOrigen").text('');
    $("#seccionDestino").text('');
    $("#totalOrigen").text(0);
    $("#totalDestino").text(0);

  }

  $("#nucleo, #modalidad, #lapso, #regimen, #curso, #origen").change(function(){
    reiniciar();
  });

  function llenarTablas(){
    modal.style.display = "block";
    $("#seccionOrigen").text($("#origen option:selected").text());
    $("#seccionDestino").text($("#destino option:selected").text());
    $("#tablaOrigen tbody").html("");
    $("#tablaDestino tbody").html("");
    $.ajax({
      data:  {
        idOrigen: $('#origen').val()
      },
      url: 'nivelacion/obtener-estudiantes-origen',
      type:  'post',
      success:  function (data) {
        //Si lo logra, hace otra peticion
        $.ajax({
          data:  {
            idDestino: $('#destino').val()
          },
          url: 'nivelacion/obtener-estudiantes-destino',
          type:  'post',
          success:  function (data1) {
            //Activa el boton
            $("#selectAll").prop('disabled',false);
            $("#selectTop").prop('disabled',false);
            $("#selectBottom").prop('disabled',false);

            $("#selectAll").prop('checked',false);
            $("#selectTop").prop('checked',false);
            $("#selectBottom").prop('checked',false);

            $("#nivelar").prop('disabled',false);
            if(data.inscritosuba.length <= 0){
              $("#tablaOrigen tbody").html("<tr><td colspan=3>No hay alumnos.</td></tr>");
              $("#nivelar").prop('disabled',true);
            }else{
              //Rellena el origen
              for(i = 0; i < data.inscritosuba.length; i++){
                $("#tablaOrigen tbody").append("<tr><td><label class='checkbox'><input type='checkbox' value='"+data.inscritosuba[i].id+"' data-toggle='checkbox' class='custom-checkbox'/><span class='icons'><span class='icon-unchecked'></span><span class='icon-checked'></span></span></label></td><td>"+data.inscritosuba[i].cedula+"</td><td>"+data.inscritosuba[i].estudiante.NOM_APE.capitalize(true)+"</td></tr>");
              }
            }
            $("#totalOrigen").text(data.inscritosuba.length);
            if(data1.inscritosuba.length <= 0){
              $("#tablaDestino tbody").html("<tr><td colspan=2>No hay alumnos.</td></tr>");
            }else{
              //Rellena el destino
              for(i = 0; i < data1.inscritosuba.length; i++){
                $("#tablaDestino tbody").append("<tr><td>"+data1.inscritosuba[i].cedula+"</td><td>"+data1.inscritosuba[i].estudiante.NOM_APE.capitalize(true)+"</td></tr>");
              }
            }
            $("#cupos").val(data1.cupos - data1.inscritosuba.length);
            $("#totalDestino").text(data1.inscritosuba.length);
            modal.style.display = "none";
          }
        });
      }
    });
  }

});
