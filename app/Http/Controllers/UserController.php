<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // Listar todos los usuarios
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Mostrar un usuario específico
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($user);
    }

    // Crear un nuevo usuario
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8', // mínimo 8 caracteres
                'regex:/[a-z]/', // debe contener al menos una letra minúscula
                'regex:/[A-Z]/', // debe contener al menos una letra mayúscula
                'regex:/[0-9]/', // debe contener al menos un número
                'regex:/[@$!%*#?&]/' // debe contener al menos un caracter especial
            ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Usuario creado exitosamente', 'user' => $user], 201);
    }

    // Actualizar un usuario existente
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'password' => [
                'sometimes',
                'required',
                'string',
                'min:8', // mínimo 8 caracteres
                'regex:/[a-z]/', // debe contener al menos una letra minúscula
                'regex:/[A-Z]/', // debe contener al menos una letra mayúscula
                'regex:/[0-9]/', // debe contener al menos un número
                'regex:/[@$!%*#?&]/' // debe contener al menos un caracter especial
            ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user->name = $request->get('name', $user->name);
        $user->email = $request->get('email', $user->email);
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response()->json(['message' => 'Usuario actualizado exitosamente', 'user' => $user]);
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'Usuario eliminado exitosamente']);
    }
}
