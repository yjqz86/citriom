$(document).ready(function(){

  //Mostrar el texto de comprobacion
  function mostrar(){
    $("#textoComprobacion").show();
  }

  //Ocultar el texto de comprobacion
  function ocultar(){
    $("#textoComprobacion").hide();
  }

  $("#clave,#comprobarClave").on('keyup', function() {
    if($("#comprobarClave").val() == $("#clave").val() && $("#comprobarClave").val() != '' && $("#clave").val() != ''){
      $("#crear").attr("disabled", false);
      ocultar();
    }else{
      $("#crear").attr("disabled", true);
      mostrar();
    }
  });
});
