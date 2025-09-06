<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class alumno extends Model
{
    /** @use HasFactory<\Database\Factories\AlumnoFactory> */
    use HasFactory;
    
    protected $table = 'alumnos';
    protected $fillable = [
        'nombre',
        'apellido',
        'email',
    ];
}