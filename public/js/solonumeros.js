// funcion para validar solo numeros en un campo
function soloNumeros(evt){
  var code = (evt.which) ? evt.which : evt.keyCode;
  if(code==8){
    //backspace
    return true;
  }else if(code>=48 && code<=57){
    //is a number
    return true;
  }else{
    return false;
  }
}
