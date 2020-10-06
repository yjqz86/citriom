<?php

	class AdministradorPeliculaController extends BaseController{

		public function getFormulario(){
			$usuario = Session::get('username');
			
			$peliculas = DB::table('peliculas')
					->select('id_pelicula','pelicula','anio','genero','conteo')
					->get();
				
			return View::make('administrador/crear')->with(array('filtro'=>null,'mensajeError'=>false,'peliculas'=>$peliculas));	
		}
		
		public function postAjaxregistrarpelicula(){	
			if (Request::ajax()) {
				$titulo = Input::get('titulo');
				$genero = Input::get('genero');
				$anio = Input::get('anio');
				
				$pelicula = DB::table('peliculas')
					->select('pelicula')
					->where('pelicula', '=', $titulo)
					->first();
					
				if($pelicula==null){
					$guardar=DB::table('peliculas')
						->insert(array(
							'pelicula' => $titulo,
							'genero' => $genero,
							'anio' => $anio,
							'conteo' => 0
					));
					$mensaje = '<div style="width:100%" class="alert alert-success error-msg text-center">Exitoso</div>';
				}else{
					$mensaje = '<div style="width:100%" class="alert alert-danger error-msg text-center">Ya existe</div>';
			
				}
				
				$peliculas = DB::table('peliculas')
						->select('id_pelicula','pelicula','anio','genero','conteo')
						->get();
					

				$arreglo =  '';		
			    $arreglo.= '<table class="tabla-huma">';
						$arreglo.= '<thead>';
							$arreglo.= '<tr class="info">';
								$arreglo.= '<td><strong>Pelicula</strong></td>';
								$arreglo.= '<td><strong>Año</strong></td>';
								$arreglo.= '<td><strong>Genero</strong></td>';
								$arreglo.= '<td><strong>Conteo</strong></td>';
								$arreglo.= '<td><strong>Votar</strong></td>';
							$arreglo.= '</tr>';
						$arreglo.= '</thead>';
						$arreglo.= '<tbody>';
							foreach($peliculas as $key1 => $value1){					
								$arreglo.= '<tr class="info">';
							$arreglo.= '<td>'.$value1->pelicula.'</td>';
									$arreglo.= '<td>'.$value1->anio.'</td>';
									$arreglo.= '<td>'.$value1->genero.'</td>';
									$arreglo.= '<td>'.$value1->conteo.'</td>';
									if(votacion($value1->id_pelicula) == "si"){
										$arreglo.= '<td><input type="hidden" id="id_pelicula" value="'.$value1->id_pelicula.'">&nbsp;&nbsp;<a class="btn btn-info" href="http://localhost/citriom/public/administrador/contar/'.$value1->id_pelicula.'">Votar</a></td>';
									}else{
										$arreglo.= '<td>N/A</td>';
									}
							}
							$arreglo.= '</tr>';	
						$arreglo.= '</tbody>';
					$arreglo.= '</table>';
				
				return Response::json(array(
					'mensaje' => $mensaje,
					'peliculas' => $arreglo
				));
			}
		}
		
		public function getContar($id_pelicula){
			
			$usuario = Session::get('username');
	
			$usuarioVoto = DB::table('votacion')
					->select('usuario')
					->where('usuario', '=', $usuario)
					->where('id_pelicula', '=', $id_pelicula)
					->first();
					
				if($usuarioVoto==null){
					$guardar=DB::table('votacion')
						->insert(array(
							'id_pelicula' => $id_pelicula,
							'usuario' => $usuario
						));
						
					$votacion = DB::table('peliculas')
							->select('conteo')
							->where('id_pelicula', '=', $id_pelicula)
							->first();
						
					$conteo = $votacion->conteo + 1;
							
					$guardar = DB::table('peliculas')
							->where('id_pelicula', $id_pelicula)
							->update(array('conteo' => $conteo));

					$peliculas = DB::table('peliculas')
						->select('id_pelicula','pelicula','anio','genero','conteo')
						->get();

					return View::make('administrador/crear')->with(array('filtro'=>null,'mensajeError'=>false,'peliculas'=>$peliculas));	
				}else{
					$peliculas = DB::table('peliculas')
						->select('id_pelicula','pelicula','anio','genero','conteo')
						->get();
					return View::make('administrador/crear')->with(array('filtro'=>null,'mensajeError'=>false,'peliculas'=>$peliculas));	
				}
			
		}
	}
?>
