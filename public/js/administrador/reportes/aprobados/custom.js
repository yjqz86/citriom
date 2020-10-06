$(document).ready(function(){

  $("#lapsoInput").val($("#lapso").val());
  $("#modalidadInput").val($("#modalidad").val());
  $("#cursoInput").val($("#curso").val());

  $("#lapso").change(function(){
    $("#lapsoInput").val($(this).val());
  });

  $("#modalidad").change(function(){
    $("#modalidadInput").val($(this).val());
  });

  $("#curso").change(function(){
    $("#cursoInput").val($(this).val());
  });


});
