@extends('administrador.layouts.master')
	@section('CSS')
		{{ HTML::style('dist\css\inicio\custom.css') }}
	@stop
	@section('titulo')
		<title>Inicio | Administrador</title>
	@stop

	@section('contenido')
	@if (Session::has('mensajeError'))
		<div class="row">
			<div class="col-lg-12 text-center">
					<div class="alert alert-danger error-msg text-center">
						<strong>{{ Session::get('mensajeError') }}</strong>
					</div>
			</div>
		</div>
	@endif
	<div class="row">
		<div class="col-lg-12 text-center">
			<img src="{{URL::to('img\logo_uba.png')}}" width="300" height="400"/>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 text-center" style="padding-bottom:80;">
			<h2 id="letras">¡Bienvenido!</h2>
		</div>
	</div>

	@stop
