<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/', // al menos una letra minúscula
                'regex:/[A-Z]/', // al menos una letra mayúscula
                'regex:/[0-9]/', // al menos un número
                'regex:/[!@#$%^&*(),.?":{}|<>]/' // al menos un carácter especial
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciales inválidas'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'No se pudo crear el token'], 500);
        }

        return response()->json(['token' => $token]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        try {
            auth()->logout();
            return response()->json(['message' => 'Sesión cerrada correctamente']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'No se pudo cerrar la sesión'], 500);
        }
    }

    public function user(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json($user);
    }
}
