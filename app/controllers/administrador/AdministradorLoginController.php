<?php

	class AdministradorLoginController extends BaseController{
	
		public function getLogin(){
			//Si esta logueado devuelve el inicio
			if(Auth::administrador()->check()){
				return Redirect::to('administrador/inicio');
			}else{
				$gradosEstudio = "";
				return View::make('administrador/login')
					->with('gradosEstudios',$gradosEstudio);
			}
		}

		public function postLogin(){
			$username = Input::get('username');
			if (Auth::administrador()->attempt(array(//para autenticar el usuario
				'username' => Input::get('username'),
				'password'  => Input::get('password'),
			))){
				Session::put('username',$username);
				return Redirect::intended('administrador/inicio');
			}else{
				return Redirect::to('administrador/login')->with('mensajeLogin', 'Ingreso invalido');
			}
		}

		public function getLogout(){
			if (!Auth::administrador()->logout()){
				Session::flush();
				return Redirect::to('administrador/login');
			}else{
				return Redirect::back();
			}
		}
	}
?>
