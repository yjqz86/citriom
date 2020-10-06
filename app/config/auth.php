<?php

return array(

    'multi' => array(
        'administrador' => array(
            'driver' => 'eloquent',
            'model' => 'Administrador'
        ),
        'regulares' => array(
            'driver' => 'eloquent',
            'model' => 'Estudiantes'
        ),
        'facilitadores' => array(
            'driver' => 'eloquent',
            'model' => 'Facilitadores'
        )
    ),

    'reminder' => array(

        'email' => 'emails.auth.reminder',

        'table' => 'password_reminders',

        'expire' => 10,

    ),

);
