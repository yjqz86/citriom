$(document).ready(function(){
  //El MetisMenu
  $("#menu").metisMenu();
  //Tooltip del Logout
  $('[data-toggle="tooltip"]').tooltip();
  //Collapsar todo
  $("#sidebar").mouseleave(function(event){
    $("li.active").children("a").click();
  });
});
