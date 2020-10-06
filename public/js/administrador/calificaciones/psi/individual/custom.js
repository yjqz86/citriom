$(document).ready(function(){

  var modal = document.getElementById('modal');

  $(document).on('keyup','input[type=text]',function(){
    var actual = $(this);
    var boton = $(this).closest('td').siblings().find('button[type=button].guardar');
    actual.closest('td').siblings().find('span.response').hide();
    if(actual.val() > 100){
      actual.addClass("has-error");
    }else{
      actual.removeClass("has-error");
    }
    //Activa o desactiva el boton
    if(actual.hasClass('has-error') || actual.val() == ''){
      boton.attr("disabled",true);
    }else{
      boton.attr("disabled",false);
    }
  });

  $(document).on('click','button[type=button].guardar',function(){
    var boton = $(this);
    var id = $(this).parents('tr').children('td:first').text();
    var success = $(this).closest('td').siblings().find('span.response');
    var nota = $(this).closest('td').siblings().find('input').val();
    boton.attr("disabled",true);

    $.ajax({
      data:  {
        id: id,
        nota: nota
      },
      url:   '../../guardar-notas/psi',
      type:  'post',
      success: function (data){
        if(nota <58){
          $("#texto").html("Con esta nota no se aprueba ningun nivel");
        }else if(nota >= 58 && nota <= 72){
          $("#texto").html("Con esta nota se aprueba <strong>Nivel I</strong>");
        }else if(nota >=73 && nota <=82){
          $("#texto").html("Con esta nota se aprueba <strong>Nivel I y Nivel II</strong>");
        }else if(nota >= 83 && nota <= 92){
          $("#texto").html("Con esta nota se aprueba <strong>Nivel I, Nivel II y Nivel III</strong>");
        }else{
          $("#texto").html("Con esta nota se aprueban todos los niveles");
        }
        modal.style.display = "block";
        if(data == 1){
          success.text('Exito!');
          if(!success.hasClass('text-success')){
            success.addClass('text-success');
            success.removeClass('text-danger');
          }
          success.show();
        }else{
          success.text('Error!');
          if(!success.hasClass('text-danger')){
            success.addClass('text-danger');
            success.removeClass('response');
          }
          success.show();
        }
        boton.attr("disabled",false);
      }
    });
  });

});
