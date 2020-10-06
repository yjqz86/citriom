<?php
  class Accesos extends Eloquent{
    protected $table = 'accesos';
    protected $fillable = array('id_administrador','id_modulo');

    public function administrador(){
      return $this->belongsTo('Administrador','id_administrador');
    }

    public function modulo(){
      return $this->belongsTo('Modulos','id_modulo');
    }
  }
?>
