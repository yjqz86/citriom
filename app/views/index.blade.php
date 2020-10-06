@extends('layouts.master')
  @section('CSS')
      {{ HTML::style('dist\css\index\custom.css') }}
  @stop
  @section('titulo')
    <title>Inicio</title>
  @stop
  @section('contenido')
  <div class='jumbotron' id='jumbotron'>
    <div class="col-lg-2"></div>
    <div class='col-lg-5' id="textoPrincipal">
      <!-- Primera Fila -->
      <h1 class="text-center">¡Bienvenido!</h1>
      <!-- Segunda Fila -->
      
    </div>
    
    <div class="col-lg-3"></div>
  </div>
  <div class='container-fluid'>
    <!-- Primera Fila -->
    <!-- Segunda Fila -->
    <div class='row'>
      <div class='col-lg-2'></div> <!--Columna Relleno-->
      <!--Primera columna-->
    </div>

  @stop
  @section('JavaScript')
  @stop
