<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Validation Language Lines
	|--------------------------------------------------------------------------
	|
	| The following language lines contain the default error messages used by
	| the validator class. Some of these rules have multiple versions such
	| as the size rules. Feel free to tweak each of these messages here.
	|
	*/

	"accepted"             => "El campo :attribute debe ser aceptado",
	"active_url"           => "El campo :attribute no es una URL v&aacute;lida",
	"after"                => "El campo :attribute debe ser una fecha posterior a :date",
	"alpha"                => "El campo :attribute s&oacute;lo puede contener letras",
	"alpha_dash"           => "El campo :attribute s&oacute;lo puede contener letras, n&uacute;meros y guiones",
	"alpha_num"            => "El campo :attribute s&oacute;lo puede contener letras y n&uacute;meros",
	"array"                => "El campo :attribute debe ser un arreglo",
	"before"               => "El campo :attribute debe ser una fecha anterior a :date.",
	"between"              => array(
		"numeric" => "El campo :attribute debe estar entre :min y :max d&iacute;gitos",
		"file"    => "El campo :attribute debe estar entre :min y :max kilobytes",
		"string"  => "El campo :attribute debe estar entre :min y :max caracteres",
		"array"   => "El campo :attribute debe tener entre :min y :max items",
	),
	"confirmed"            => "La confirmaci&oacute;n del campo :attribute no coincide",
	"date"                 => "El campo :attribute no es una fecha v&aacute;lida",
	"date_format"          => "El campo :attribute no coincide con el formato :format",
	"different"            => "El campo :attribute y :other debe ser diferentes",
	"digits"               => "El campo :attribute debe tener :digits d&iacute;gitos",
	"digits_between"       => "El campo :attribute entre :min y :max d&iacute;gitos",
	"email"                => "El campo :attribute debe ser una direcci&oacute;n de email v&aacute;lida",
	"exists"               => "El campo seleccionado :attribute es inv&aacute;lido",
	"image"                => "El campo :attribute debe ser una imagen",
	"in"                   => "El campo seleccionado :attribute is inv&aacute;lido",
	"integer"              => "El campo :attribute debe ser un entero",
	"ip"                   => "El campo :attribute debe ser una direcci&oacute;n IP v&aacute;lida",
	"max"                  => array(
		"numeric" => "El campo :attribute no puede ser mayor a :max",
		"file"    => "El campo :attribute no puede ser mayor de :max kilobytes",
		"string"  => "El campo :attribute no puede tener m&aacute;s de :max caracteres",
		"array"   => "El campo :attribute no puede tener m&aacute;s de :max items",
	),
	"mimes"                => "El campo :attribute debe ser un archivo de tipo: :values",
	"min"                  => array(
		"numeric" => "El campo :attribute debe ser al menos :min",
		"file"    => "El campo :attribute debe tener al menos :min kilobytes",
		"string"  => "El campo :attribute debe tener al menos :min caracteres",
		"array"   => "El campo :attribute debe tener al menos :min items",
	),
	"not_in"               => "El campo seleccionado :attribute es inv&aacute;lido",
	"numeric"              => "El campo :attribute debe ser num&eacute;rico",
	"regex"                => "El formato del campo :attribute es inv&aacute;lido",
	"required"             => "El campo :attribute es obligatorio",
	"required_if"          => "El campo :attribute es requerido cuando :other es :value",
	"required_with"        => "El campo :attribute es requerido cuando :values est&aacute; presente",
	"required_with_all"    => "El campo :attribute es requerido cuando :values est&aacute; presente",
	"required_without"     => "El campo :attribute es requerido cuando :values no est&aacute; presente",
	"required_without_all" => "El campo :attribute es requerido cuando ninguno de los :values est&aacute;n presentes",
	"same"                 => "El campo :attribute y :other deben coincidir",
	"size"                 => array(
		"numeric" => "El campo :attribute debe tener un tama&ntilde;o de :size",
		"file"    => "El campo :attribute debe tener un tama&ntilde;o de :size kilobytes",
		"string"  => "El campo :attribute debe tener :size caracteres",
		"array"   => "El campo :attribute debe contener :size items",
	),
	"unique"               => "El campo :attribute ya existe",
	"url"                  => "El formato del campo :attribute es inv&aacute;lido",

	//Validaciones Personalizadas
	"mayor_cero" => "No existe registro en la BD con esos par&aacute;metros",
	


	/*
	|--------------------------------------------------------------------------
	| Custom Validation Language Lines
	|--------------------------------------------------------------------------
	|
	| Here you may specify custom validation messages for attributes using the
	| convention "attribute.rule" to name the lines. This makes it quick to
	| specify a specific custom language line for a given attribute rule.
	|
	*/
	

	'custom' => array(
		'contrase&ntilde;a_actual' => array(
			'exists' => 'Error al escribir su contrase&ntilde;a actual',
		),
		'porcentaje' => array(
			'min' => 'El campo :attribute no puede ser menor de :min',
		),
		'evaluador' => array(
			'required_with' => 'Agregar el :attribute para cargar :values proyecto',
		),
		'calificaci&oacute;n' => array(
			'required_with' => 'Agregar la :attribute para cargar la :values proyecto',
		),
		'total' => array(
			'required_with' => 'Agregar el :attribute de proyecto para cargar la :values',
			'numeric' => 'El :attribute tiene un error',
		),
		'preguntas' => array(
			'required_with' => 'Agregar las :attribute de proyecto para cargar los :values',
		),
		'puntos' => array(
			'required_with' => 'Agregar los :attribute de proyecto para cargar las :values',
		),
	),

	
	/*
	|--------------------------------------------------------------------------
	| Custom Validation Attributes
	|--------------------------------------------------------------------------
	|
	| The following language lines are used to swap attribute place-holders
	| with something more reader friendly such as E-Mail Address instead
	| of "email". This simply helps us make messages a little cleaner.
	|
	*/

	'attributes' => array(),

);
