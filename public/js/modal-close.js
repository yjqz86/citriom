$(document).ready(function(){
  // Obtiene el modal
  var modal = document.getElementById('modal');

  // When the user clicks on <span> (x), close the modal
  $(document).on("click", '.cerrar' ,function() {
      modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
