<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- CSS -->
  {{ HTML::style('dist\css\vendor\bootstrap\css\bootstrap.min.css') }}
  {{ HTML::style('dist\css\bootstrap-datetimepicker.min.css') }}
  {{ HTML::style('dist\css\flat-ui.min.css') }}
  {{ HTML::style('dist\css\datepicker.css') }}
  {{ HTML::style('dist\css\bootstrap-layout.css') }}
  {{ HTML::style('dist\css\metisMenu.min.css') }}
  {{ HTML::style('dist\css\custom-master.css') }}
  {{ HTML::style('dist\css\readonly.css') }}
</head>
<body>
  <div class="layout-container ls-top layout-sidebar-l3-md-up breakpoint-1200">
    <!--Contenido de la pagina-->
    <div class="layout-content" data-scrollable>
      <div class="container-fluid " id="cabecera">
        <div class="container-fluid header">
          <button class="navbar-toggle collapsed pull-left" data-target="#sidebar" data-toggle="sidebar">
            <span class="sr-only"></span>
          </button>
		  <h4 class="text-center hidden-xs">Pelicula</h4>
		  <a href="{{URL::to('administrador/logout')}}" class="logout">
            <span class="glyphicon glyphicon-off" data-toggle="tooltip" data-placement="bottom" title="Logout"></span>
          </a>
        </div>
        <div class="contenido">
          <div class="row">
    	<div class="col-lg-12 form-group" style="overflow-x:auto;">
    		<div class="row">
      		<div class="col-lg-12">
       	 		<h3 class="cabecera">Registro de Peliculas</h3>
      		</div>
    		</div><br/>
    		<div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button type="button" class="btn btn-primary btn-lg " data-toggle="modal" data-target="#crearModal">Registrar Pelicula</button>   
		  <div id="exito"></div>
		
        </div>
         <!-- Modal crear -->
            <div class="modal fade" id="crearModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-md" style="width: 690px;">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Pelicula</h4>
                  </div>
                  <div id="aviso" style="display: none" class="alert alert-danger" role="alert">
                    <center>Pelicula ya existente</center>
                  </div>
                  <div id="aviso2" style="display: none" class="alert alert-success" role="alert">
                    <center>Pelicula registrada correctamente</center>
                  </div>
                  <form id="guardarModal" method="GET" action="{{ url('administrador/laboratoriosCrear') }}">
                    <div class="modal-body">
                      <div class="container">
                      	<div style="display: inline-block; width: 600px">
                      		<form>
								  <div class="row">
										<div class="col-md-4">
										   	<label>Titulo<span class="glyphicon glyphicon-asterisk text-danger" style="font-size:9px;"></span></label>
										     <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Eje. Irene yo y mi otro yo">
										</div>	
										   <div class="col-md-4">
										   <label>Genero<span class="glyphicon glyphicon-asterisk text-danger" style="font-size:9px;"></span></label>
										   <select id="genero" class="form-control" name="genero">
												<option value="">Seleccione</option>
												<option value="Comedia">Comedia</option>
												<option value="Terror">Terror</option>
												<option value="infantil">Infantil</option>
												<option value="Otros">Otros</option>  												
											</select>
										   </div>										  							    
								   	</div>
								   	<div class="row">
										 <div class="col-md-4">
										   	<label>Año<span class="glyphicon glyphicon-asterisk text-danger" style="font-size:9px;"></span></label>
										     <input type="text" class="form-control" id="anio" name="anio" placeholder="1997">
										 </div>										   						    
								   	</div>
								  
						</form>
                      	</div>
                      	<div style="display: inline-block; width: 300px;">
	                      	<div class="row">
								
							</div>  
                      	</div>	                 
                      </div>
                    </div>
                  </form>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button name="boton_guardar" id="boton_guardar" class="btn btn-primary">Guardar</button>
                  </div>
                </div>
              </div>
            </div>         
     	</div>
   </div>
   <!-- tabla  -->
  	
   <div class="row">
          <div class="col-lg-12 form-group" style="overflow-x:auto;">
			   <div id="tabla"></div>
			 <table style="background: #eaeaea;" class="tabla-huma" id="tabla1">
				 <thead style="background: #2c3a49;color: white;">
					<tr class="info">
					  <td class="text-center"><strong>Pelicula</strong></td>
					  <td class="text-center"><strong>Año</strong></td>
					  <td class="text-center"><strong>Genero</strong></td>
					   <td class="text-center"><strong>Conteo</strong></td>
					  <td class="text-center"><strong>Votar</strong></td>			        
					</tr>
				 </thead>
				 <tbody>					
					@foreach($peliculas as $key => $value)
						  <tr class="text-center">
							<td class="text-center">&nbsp;&nbsp;{{$value->pelicula}}</td>
							<td class="text-center">&nbsp;&nbsp;{{$value->anio}}</td>
							<td class="text-center">&nbsp;&nbsp;{{$value->genero}} </td>
							<td class="text-center">&nbsp;&nbsp;{{$value->conteo}} </td>
							<td class="text-center">	
							  @if (votacion($value->id_pelicula) == 'si')
								  <input type="hidden" id="id_pelicula" value="{{$value->id_pelicula}}">
								  &nbsp;&nbsp;<a class="btn btn-info" href="{{URL::to('administrador/contar')}}/{{$value->id_pelicula}}">Votar</a>
							  @else
								  N/A
							  @endif
							</td>
						  </tr>
					@endforeach
				 </tbody>
			  </table>
		  </div>
	  </div>  
        </div>
      </div>
    </div>
    <div class="sidebar sidebar-left sidebar-visible-md-up sidebar-size-3 sidebar-light bg-#2C3A49 sidebar-visible sidebarcustom" data-scrollable data-position="left" id="sidebar">
      <!-- Brand -->
      <a href="#" class="sidebar-brand"></a>
      <ul class="metisMenu" id="menu">
        <li>
          <a href="{{URL::to('administrador/inicio')}}">Inicio<span class="glyphicon glyphicon-home"></span></a>
        </li>
		<li class="sub-menu">
            <a href="#" aria-expanded="false">Peliculas<span class="caret"></span><span class="glyphicon glyphicon-file"></span></a>
            <ul class="collapse" aria-expanded="false">
				<li>
					<a href="{{URL::to('administrador/registrar-pelicula')}}">Registrar Pelicula</a>
				</li>
            </ul>
		</li>   
      </ul>
    </div>
  </div>
  <style>
    .error {
      border: solid 2px #FF0000;  
    }                         
  </style>
  @section('JavaScript')
		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>-->
		
		<script type="text/javascript" language="javascript">
			$(document).ready(function(){			
				$("#boton_guardar").click(function(){
				var titulo = $("#titulo").val();
				var genero= $("#genero").val();
				var anio = $("#anio").val();
				
				var a=0;
				var b=0;
				var c=0;				
							
				if(titulo==""){
					a=0;
					$("#titulo").addClass("error");
				}else{
					a=1;
					$("#titulo").removeClass("error"); 
				}
														
				if(genero==""){
					b=0;
					$("#genero").addClass("error");
				}else{
					b=1;
					$("#genero").removeClass("error"); 
				}
															
				if(anio==""){
					c=0;
					$("#anio").addClass("error");
				}else{
					c=1;
					$("#anio").removeClass("error"); 
				}
															
				if(a==1 && b==1 && c==1){
						$.ajax({
							type: "POST",
							url: "{{URL::action('AdministradorPeliculaController@postAjaxregistrarpelicula')}}", 
							dataType: "json",
							data: {
								titulo: titulo,
								genero: genero,
								anio: anio
							},
							cache: false,
							success: function(data)
							{    
								$('#tabla').html(data.peliculas);
								$('#exito').html(data.mensaje);	
								$('#tabla1').hide();						
							}
						});
					}
				});
			}); 
		</script>
	@stop

  <!-- Script -->
  {{ HTML::script('dist\js\vendor\jquery.min.js') }}
  {{ HTML::script('dist\js\flat-ui.min.js') }}
  {{ HTML::script('js\bootstrap-layout.js') }}
  {{ HTML::script('js\metisMenu.min.js') }}
  {{ HTML::script('js\administrador\layouts\custom.js') }}
  @yield('JavaScript')
</body>
</html>
