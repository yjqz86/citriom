$(document).ready(function(){
  $("#check-cedula").change(function(){
    if($("#check-cedula").is(":checked")){
      $("#texto").attr("disabled", false);
      $("#usuario").attr("disabled", true);
    }else{
      $("#texto").attr("disabled", true);
      $("#usuario").attr("disabled", false);
    }
  });
});
