$(document).ready(function(){
  $(document).on('keypress', 'input.soloNumerosPunto', function(event){
  		var charCode = (event.which) ? event.which : event.keyCode
      if ((charCode != 46 || $(this).val().indexOf('.') != -1) && (charCode < 48 || charCode > 57)){
        return false;
      }
      return true;
  	});
});
