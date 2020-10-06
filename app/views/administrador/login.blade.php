<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  {{ HTML::style('dist\css\vendor\bootstrap\css\bootstrap.min.css') }}
  {{ HTML::style('dist\css\flat-ui.min.css') }}
  <title>Login</title>
</head>
<!-- Estilos -->
<style>

body{
  background-color: #1abc9c;
  height: 100%;
  width: 100%;
  margin-top: 17%;
}

span{
  font-size: 30px;
  color: #fff;
  font-weight: bold;
}

.login-form{
  width: 70%;
  margin: 0 auto;
}

.texto{
  font-family:Helvetica,Arial,sans-serif;
  color: #bdc3c7;
  font-size: 15px;
}

</style>

<body>
  <div class='container'>
    <div class='row'>
      <div class='col-lg-1'></div> <!-- Columna de relleno -->
      <!-- Primera columna (Columna de la imagen) -->
      <div class='col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center'>
        <h4>Bienvenido, <span>Usuario</span></h4>
      </div>
      <!-- Segunda columna (Columna del formulario) -->
        <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center'>
          {{ Form::open(array('url' => 'administrador/login', 'class' => 'login-form')) }}
            <h4>Login</h4>
            @if (Session::has('mensajeLogin'))
              <p style="color:red;">{{ Session::get('mensajeLogin') }}</p>
            @endif
            <div class="form-group">
              {{ Form::text('username', NULL, array('placeholder'=>'Usuario', 'class' => 'form-control login-field', 'required'))}}
              <label class="login-field-icon fui-user" for="username"></label>
            </div>
            <div class="form-group">
              {{ Form::password('password', array('class' => 'form-control login-field', 'placeholder'=>'Contraseña', 'required' )) }}
              <label class="login-field-icon fui-lock" for="password"></label>
            </div>
            {{ Form::submit('Iniciar Sesión', array('class'=>'btn btn-primary btn-lg btn-block')) }}
          {{ Form::close() }}
        </div>
      <div class='col-lg-1'></div> <!-- Columna de relleno -->
    </div>
  </div>
  </body>
</html>
