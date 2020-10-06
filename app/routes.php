<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('index');
});

//Cuando se pide el formulario de Login del administrador
Route::get('administrador/login', 'AdministradorLoginController@getLogin');

//Cuando se envia el formulario de Login del administrador
Route::post('administrador/login', 'AdministradorLoginController@postLogin');

//Administradores
Route::group(array('before' => 'administradorFiltro'), function(){

	//Inicio
	Route::get('administrador/inicio', function(){
		return View::make('administrador/inicio');
	});

	//Ruta para Logout
	Route::any('administrador/logout', 'AdministradorLoginController@getLogout');
	Route::get('administrador/registrar-pelicula', 'AdministradorPeliculaController@getFormulario');
	Route::get('administrador/contar/{id_pelicula}', 'AdministradorPeliculaController@getContar');
	Route::post('administrador/postAjaxregistrarpelicula', 'AdministradorPeliculaController@postAjaxregistrarpelicula');
});
	