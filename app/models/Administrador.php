<?php

  use Illuminate\Auth\UserInterface;

  class Administrador extends Eloquent implements UserInterface{
     protected $table = 'administradores';
     protected $fillable = array('cedula','nombres','apellidos','username', 'password');

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

    public function accesos(){
      return $this->hasMany('Accesos','id_administrador');
    }

    public function accesosPostgrado(){
      return $this->hasMany('AccesosPostgrado','id_administrador');
    }

    public function auditoria(){
      return $this->hasMany('Auditoria','id_administrador');
    }

    public function verificarAcceso($id){
      $cuenta = $this->accesos()->where('id_modulo',$id)->count();
      if($cuenta > 0){
        return true;
      }else{
        return false;
      }
    }
  }
?>
