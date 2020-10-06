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
  @yield('CSS')
  @yield('titulo')
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
		  <h4 class="text-center hidden-xs">CINE</h4>
		  <a href="{{URL::to('administrador/logout')}}" class="logout">
            <span class="glyphicon glyphicon-off" data-toggle="tooltip" data-placement="bottom" title="Logout"></span>
          </a>
        </div>
        <div class="contenido">
          BIENVENIDO
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

  <!-- Script -->
  {{ HTML::script('dist\js\vendor\jquery.min.js') }}
  {{ HTML::script('dist\js\flat-ui.min.js') }}
  {{ HTML::script('js\bootstrap-layout.js') }}
  {{ HTML::script('js\metisMenu.min.js') }}
  {{ HTML::script('js\administrador\layouts\custom.js') }}
  {{ HTML::script('js\solonumeros.js') }}
  {{ HTML::script('js\solonumerospunto.js') }}
  {{ HTML::script('js\select.js') }}
  {{ HTML::script('js\readonly.js') }}
  @yield('JavaScript')
</body>
</html>
