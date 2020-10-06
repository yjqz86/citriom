<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request){
	//
});


App::after(function($request, $response){
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/
/*Route::filter('permisosPre',function($route, $request, $value){
	$comprobar = Auth::administrador()->user()->verificarAcceso($value);
	if (!$comprobar ){
		return Redirect::guest('administrador/inicio')->with(array('mensajeError'=>'No tiene permisos para acceder a esta ruta'));
	}

});*/

Route::filter('permisosPost',function($route, $request, $value){
	$comprobarPost = Auth::administrador()->user()->verificarAccesoPostgrado($value);

	if ( !$comprobarPost){
		return Redirect::guest('administrador/inicio')->with(array('mensajeError'=>'No tiene permisos para acceder a esta ruta'));
	}

});

Route::filter('permisosBoth',function($route, $request, $value){
	$permisos = explode('-',$value);
	$comprobar = 1;
	foreach ($permisos as $key => $value) {
		if(Session::get('gradoEstudio')==1){
			$comprobar = Auth::administrador()->user()->verificarAcceso($value);

		}else if(Session::get('gradoEstudio')==2){
			$comprobar = Auth::administrador()->user()->verificarAccesoPostgrado($value);
		}
		if($comprobar){
			$check = true;
			break;
		}else{
			$check =false;
		}
		if (!$check){
			$check = true;
			break;
			//return Redirect::guest('administrador/inicio')->with(array('mensajeError'=>'No tiene permisos para acceder a esta ruta'));
		}
	}
});
Route::filter('administradorFiltro', function(){
	if (!Auth::administrador()->check()) return Redirect::guest('administrador/login')->with('mensajeLogin', 'Debe iniciar sesion primero');
});


Route::filter('regularesFiltro', function(){
	if (!Auth::regulares()->check()) return Redirect::guest('regulares/login')->with('mensajeLogin', 'Debe iniciar sesion primero');
});

Route::filter('facilitadoresFiltro', function(){
	if (!Auth::facilitadores()->check()) return Redirect::guest('facilitador/login')->with('mensajeLogin', 'Debe iniciar sesion primero');
});

Route::filter('facilitadoresActivo', function(){
	if (!Auth::facilitadores()->user()->activo != 0){
		Auth::facilitadores()->logout();
		Session::flush();
		return Redirect::to('facilitador/login')->with('mensajeLogin', 'Usted no esta activo');
	}
});

Route::filter('auth.basic', function(){
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function(){
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function(){
	if (Session::token() != Input::get('_token')){
		throw new Illuminate\Session\TokenMismatchException;
	}
});
