<?php

  use Illuminate\Auth\UserInterface;

  class Facilitadores extends Eloquent implements UserInterface{

      protected $table = 'facilitadores';
      protected $primaryKey = 'cedula';
      protected $fillable = array('cedula','username','password','nombres','direccion','telefono','activo','email','remember_token','created_at','updated_at');

      public function ofertauba(){
          return $this->hasMany('OfertaUba','facilitador');
      }

      public function getAuthIdentifier(){
        return $this->getKey();
      }

      public function getAuthPassword(){
        return $this->password;
      }

     public function getRememberToken(){
       return $this->remember_token;
     }

     public function setRememberToken($value){
       $this->remember_token = $value;
     }

     public function getRememberTokenName(){
       return 'remember_token';
     }

     public function nucleos(){
      return $this->belongsTo('Nucleos','cod_nucleo');
     }

     public function condicionprofesor(){
      return $this->belongsTo('CondicionProfesor','condicion');
     }
  }
?>
