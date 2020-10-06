<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" href="">
  <!-- Css -->
  {{ HTML::style('dist\css\vendor\bootstrap\css\bootstrap.min.css') }}
  {{ HTML::style('dist\css\flat-ui.min.css') }}
  {{ HTML::style('dist\css\custom.css') }}
  {{ HTML::style('dist\css\footer\custom.css') }}

  @yield('CSS')

  @yield('titulo')
</head>
<body>
  <header>
    <div class='container'>
      <nav class='navbar navbar-default' role='navigation'>
        <!-- Para dispositivos moviles -->
        <div class='navbar-header'>
          <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#navbar1'>
            <span class="sr-only">Menu</span>
          </button>
          <a class='navbar-brand' href="#">CINE</a>
        </div>
        <!-- Elementos barra de navegacion -->
        <div class="navbar-right"> <!-- pone todo alineado a la derecha -->
          <div class='collapse navbar-collapse' id='navbar1'>
            <ul class='nav navbar-nav'>
              <li class='active'><a href='#'>Inicio</a></li>
              <!-- Lista Servicios -->
              <li class='dropdwon'>
                <a href='#' class='dropdown-toggle' data-toggle='dropdown' data-hover='dropdown' data-close-others='true' role='button'>
                  Servicios<span class='caret'></span>
                </a>      
				<ul class='dropdown-menu'>
                  <!-- Sublista -->
                  <li class='dropdown-submenu'>
                    <a href="{{URL::to('administrador/login')}}"><!-- class='dropdown-toggle' tabindex='-1' data-toggle='dropdown' role='button' -->
						Usuario
                    </a>                   
                  </li>                 
                </ul>
              </li> <!-- Lista Servicios -->
            </ul> <!-- Toda la barra de navegacion -->
          </div>
        </div> <!-- Alinea a la derecha -->
      </nav>
    </div> <!-- Container (el que centra la navbar) -->
  </header>
  @yield('contenido')
  <!-- Script -->
  {{ HTML::script('dist\js\vendor\jquery.min.js') }}
  {{ HTML::script('dist\js\flat-ui.min.js') }}
  {{ HTML::script('js\bootstrap-hover-dropdown.min.js') }}
  @yield('JavaScript')
</body>
</html>
