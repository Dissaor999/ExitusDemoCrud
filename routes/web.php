<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AlumnoController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('alumnos', AlumnoController::class);
    
    // Route::get('alumnos', function () {
    //     return Inertia::render('Alumnos/Index');
    // })->name('alumnos.Index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
