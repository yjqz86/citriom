$(document).ready(function(){

  $("#cedula").change(function(){
    $("#usuario").val($("#cedula").val());
  });
  
});
