$(document).ready(function(){
  $('#fecha').datepicker({
    language: "es",
    autoclose: true,
    format: "yyyy-mm-dd"
  });
  $('#fecharesu').datepicker({
    language: "es",
    autoclose: true,
    format: "yyyy-mm-dd"
  });
  $("#cedulaInput").val($("#cedula").val());
  $("#tipoInput").val($("#tipo").val());

  $("#cedula").change(function(){
    $("#cedulaInput").val($(this).val());
  });

  $("#tipo").change(function(){
    $("#tipoInput").val($(this).val());
  });
});
