$(document).ready(function(){
  //Variables
  var pago1;
  var pago2;
  var pago3;
  var total;
  var cancelado;
  var restante;

  var modal = document.getElementById('cargando');

  function mostrarPagos(){
    document.getElementById('pagos').style.display = 'block';
  }

  function ocultarPagos(){
    $("#tabla tbody tr:not(:first)").remove();
    $("#filaInicial").show();
    pago1 = null;
    pago2 = null;
    pago3 = null;
    total = null;
    cancelado = null;
    restante = null;
    $("#banco1").val('');
    $("#tipoPago1").val('');
    $("#referenciaPago1").val('');
    $("#fechaPago1").val('');
    $("#montoPago1").val('');
    $("#banco2").val('');
    $("#tipoPago2").val('');
    $("#referenciaPago2").val('');
    $("#fechaPago2").val('');
    $("#montoPago2").val('');
    $("#banco3").val('');
    $("#tipoPago3").val('');
    $("#referenciaPago3").val('');
    $("#fechaPago3").val('');
    $("#montoPago3").val('');
    document.getElementById('pagos').style.display = 'none';
  }

  $('#fecha').datepicker({
    language: "es",
    autoclose: true,
    format: "yyyy-mm-dd"
  });

  $("#turno").change(function(){
    modal.style.display = "block";
    $.ajax({
      data:  {
        curso: $('#curso').val(),
        turno: $('#turno').val()
      },
      url:   'inscripcion/obtener-secciones',
      type:  'post',
      success:  function (data) {
        $("#seccion").select2("val","");
        $('#seccion').html(data);
        $('#aula').val('');
        $('#horario').val('');
        ocultarPagos();
        modal.style.display = "none";
      }
    });
  });

  $("#seccion").change(function(){
    modal.style.display = "block";
    $.ajax({
      data:  {
        curso: $('#curso').val(),
        turno: $('#turno').val(),
        seccion: $('#seccion').val()
      },
      url:   'inscripcion/obtener-final',
      type:  'post',
      success:  function (data) {
        $("#aula").val(data.aula);
        $('#horario').val(data.horario);
        ocultarPagos();
        total = parseFloat(data.precio);
        mostrarPagos();
        comprobarMontos();
        modal.style.display = "none";
      }
    });
  });

  $("#curso").change(function(){
    modal.style.display = "block";
    $.ajax({
      data:  {
        curso: $('#curso').val()
      },
      url:   'inscripcion/obtener-turnos',
      type:  'post',
      success:  function (data) {
        $("#turno").select2("val", "");
        $("#seccion").select2("val","");
        $("#aula").val(null);
        $("#horario").val(null);
        $("#seccion").html('<option></option>');
        $('#turno').html(data);
        if(data.search('disabled')){
          $("#seccion").append('<option disabled>No hay secciones disponibles</option>');
        }
        ocultarPagos();
        modal.style.display = "none";
      }
    });
  });

  $("#agregarPago").click(function(){
    if($("#tipoPago").val() != '' && $("#referencia").val() != '' && $("#fecha").val() != '' && $("#monto").val() != '' && $("#banco").val() != ''){
      //Guarda las cosas
      var banco = $("#banco").val();
      var bancoTexto = $("#banco option:selected").text();
      var tipoPago = $("#tipoPago").val();
      var tipoPagoTexto = $("#tipoPago option:selected").text();
      var referencia = $("#referencia").val();
      var fecha = $("#fecha").val();
      var monto = parseFloat($("#monto").val());
      //Remueve la fila inicial
      $("#filaInicial").hide();
      //Reinicia
      $("#banco").select2("val", "");
      $("#tipoPago").select2("val", "");
      $("#referencia").val('');
      $("#fecha").val('');
      $("#monto").val('');
      //El id
      var id;
      //Guarda las cosas en las variables y setea el id
      if(pago1 == null){
        pago1 = {'banco': banco, 'tipoPago': tipoPago, 'referencia': referencia, 'fecha': fecha, 'monto': parseFloat(monto)};
        $("#banco1").val(pago1.banco);
        $("#tipoPago1").val(pago1.tipoPago);
        $("#referenciaPago1").val(pago1.referencia);
        $("#fechaPago1").val(pago1.fecha);
        $("#montoPago1").val(pago1.monto);
        id = 'pago1';
      }else if(pago2 == null){
        pago2 = {'banco': banco, 'tipoPago': tipoPago, 'referencia': referencia, 'fecha': fecha, 'monto': parseFloat(monto)};
        $("#banco2").val(pago2.banco);
        $("#tipoPago2").val(pago2.tipoPago);
        $("#referenciaPago2").val(pago2.referencia);
        $("#fechaPago2").val(pago2.fecha);
        $("#montoPago2").val(pago2.monto);
        id = 'pago2';
      }else if(pago3 == null){
        pago3 = {'banco': banco, 'tipoPago': tipoPago, 'referencia': referencia, 'fecha': fecha, 'monto': parseFloat(monto)};
        $("#banco3").val(pago3.banco);
        $("#tipoPago3").val(pago3.tipoPago);
        $("#referenciaPago3").val(pago3.referencia);
        $("#fechaPago3").val(pago3.fecha);
        $("#montoPago3").val(pago3.monto);
        id = 'pago3';
      }
      comprobarMontos();
      //Verifica el numero de filas para deshabilitar el boton
      if($('#tabla tbody tr').length >= 3){
        $("#agregarPago").attr("disabled", true);
      }
      //Añade las cosas a la tabla
      $('table tbody').append(
        "<tr><td>"+bancoTexto+"</td><td>"+tipoPagoTexto+"</td><td>"+referencia+"</td><td>"+fecha+"</td><td>"+monto+"</td><td><button type='button' class='btn btn-danger' id='"+id+"'><span class='fui-cross'></span></button></td></tr>"
      );
    }
  });

  function comprobarMontos(){
    //Revisar aqui, se buguea porque los otros pagos no existen
    if(pago1 != null && pago2 != null && pago3 != null){
      cancelado = pago1.monto + pago2.monto + pago3.monto;
    }else if(pago1 != null && pago2 != null){
      cancelado = pago1.monto + pago2.monto;
    }else if(pago1 != null && pago3 != null){
      cancelado = pago1.monto + pago3.monto;
    }else if(pago2 != null && pago3 != null){
      cancelado = pago2.monto + pago3.monto;
    }else if(pago1 != null && pago2 == null && pago3 == null){
      cancelado = pago1.monto;
    }else if(pago2 != null && pago1 == null && pago3 == null){
      cancelado = pago2.monto;
    }else if(pago3 != null && pago1 == null && pago3 == null){
      cancelado = pago3.monto;
    }else{
      cancelado = 0;
    }
    restante = parseFloat(total) - parseFloat(cancelado);
    $("#cancelado").text(cancelado);
    $("#restante").text(restante);
    if(restante <= 0){
      $("#restante").text(0);
      $('#enviar').attr("disabled", false);
      $("#agregarPago").attr("disabled", true);
    }else{
      $('#enviar').attr("disabled", true);
      $("#agregarPago").attr("disabled", false);
    }
  }
  //Elimina las filas
  $(document).on("click", '#pago1', function(){
    $("#pago1").parents('tr').remove();
    pago1 = null;
    $("#banco1").val('');
    $("#tipoPago1").val('');
    $("#referenciaPago1").val('');
    $("#fechaPago1").val('');
    $("#montoPago1").val('');
    comprobaciones();
  });

  $(document).on("click", '#pago2', function(){
    $("#pago2").parents('tr').remove();
    pago2 = null;
    $("#banco2").val('');
    $("#tipoPago2").val('');
    $("#referenciaPago2").val('');
    $("#fechaPago2").val('');
    $("#montoPago2").val('');
    comprobaciones();
  });

  $(document).on("click", '#pago3', function(){
    $("#pago3").parents('tr').remove();
    pago3 = null;
    $("#banco3").val('');
    $("#tipoPago3").val('');
    $("#referenciaPago3").val('');
    $("#fechaPago3").val('');
    $("#montoPago3").val('');
    comprobaciones();
  });

  //Comprueba para deshabilitar el boton y para poner la fila inicial
  function comprobaciones(){
    if($('#tabla tbody tr').length <= 4){
      $('#agregarPago').attr("disabled", false);
    }
    if($('#tabla tbody tr').length == 1){
      $("#filaInicial").show();
    }
    comprobarMontos();
  }

  $("#preguntaAsocim").change(function(){
    $("#detalleAsocim").val('');
    if($(this).val() == 'Si'){
      $("#detalleAsocim").attr("disabled",false);
      $("#detalleAsocim").attr("required",true);
    }else{
      $("#detalleAsocim").attr("disabled",true);
      $("#detalleAsocim").attr("required",false);
    }
  });

});
