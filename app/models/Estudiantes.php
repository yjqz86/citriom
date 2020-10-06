<?php

  use Illuminate\Auth\UserInterface;

  class Estudiantes extends Eloquent implements UserInterface{

    protected $connection = 'secretaria';
    protected $table = 'estudiantes';
    protected $primaryKey = 'CEDULA';
    public $timestamps = false;

    public function carnet(){
      max_execution_time();
      return $this->hasOne('Carnets','cedula');
    }

    public function escuelas(){
        return $this->belongsTo('Escuelas','COD_ESC');
    }

    public function nucleos(){
      return $this->belongsTo('Nucleos','COD_NUC');
    }

    public function regimen(){
      return $this->belongsTo('Regimen','COD_REG');
    }

    public function modalidad(){
      return $this->belongsTo('Modalidad','COD_ORIGEN');
    }

    public function inscritosuba(){
      return $this->hasMany('InscritosUba','cedula');
    }

    public function movimientos(){
      max_execution_time();
      return $this->hasMany('MovimientosEstudiantes','cedula');
    }

    public function inscripcionesantiguas(){
      max_execution_time();
      return $this->hasMany('InscripcionesAntiguas','CEDULA');
    }

    public function notas(){
      max_execution_time();
      return $this->hasMany('Notas','CEDULA');
    }

    public function constancias(){
      max_execution_time();
      return $this->hasMany('ConstanciasIdiomas','CEDULA');
    }

    public function getAuthIdentifier(){
      return $this->getKey();
    }

    public function getAuthPassword(){
      return $this->password;
    }

   public function getRememberToken(){
     return null;//return $this->remember_token;
   }

   public function setRememberToken($value){
    // $this->remember_token = $value;
   }

   public function getRememberTokenName(){
    return null;// return 'remember_token';
   }

   public function setAttribute($key, $value)
  {
    $isRememberTokenAttribute = $key == $this->getRememberTokenName();
    if (!$isRememberTokenAttribute)
    {
      parent::setAttribute($key, $value);
    }
  }
  }
?>
