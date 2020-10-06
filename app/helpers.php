<?php
  function votacion($id_pelicula){
	$usuario = Session::get('username');
			
    $usuarioVoto = DB::table('votacion')
		->select('usuario')
		->where('usuario', '=', $usuario)
		->where('id_pelicula', '=', $id_pelicula)
		->first();
		
	if($usuarioVoto==null){
		$boton = 'si';
		return $boton;
	}else{
		$boton = 'no';
		return $boton;
	}
		
  }
 
?>
