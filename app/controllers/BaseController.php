<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

	public function auditoria($id, $operacion){
		$guardar = new Auditoria();
		$guardar->id_administrador = $id;
		$guardar->operacion = $operacion;
		$guardar->save();
	}
}
