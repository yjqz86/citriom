$(document).ready(function(){

  $("#lapsoInput").val($("#lapso").val());
  $("#cursoInput").val($("#curso").val());
  $("#nucleoInput").val($("#nucleo").val());

  $("#lapso").change(function(){
    $("#lapsoInput").val($(this).val());
  });

  $("#curso").change(function(){
    $("#cursoInput").val($(this).val());
  });

  $("#nucleo").change(function(){
    $("#nucleoInput").val($(this).val());
  });

});
