<?php

namespace App\Http\Controllers;

use App\Models\alumno;
use App\Http\Requests\StorealumnoRequest;
use App\Http\Requests\UpdatealumnoRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Alumnos/Index', [
            'alumnos' => alumno::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Alumnos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:alumnos',
        ]);
        alumno::create($request->all());
        return redirect()->route('alumnos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(alumno $alumno)
    {
        
        return Inertia::render('Alumnos/Show', [
            'alumno' => $alumno
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(alumno $alumno)
    {
        return Inertia::render('Alumnos/Edit', [
            'alumno' => $alumno
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, alumno $alumno)
    {
         $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:alumnos' . $alumno->id,
        ]);
        $alumno->update($request->validated());
        return redirect()->route('alumnos.Index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(alumno $alumno)
    {
        $alumno->delete();
        return redirect()->route('alumnos.Index');
    }
}
