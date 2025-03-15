<?php

namespace App\Http\Controllers\Auth;


use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields=$request->validate(
            [
                'name'=>'required|string|max:255',
                'email'=>'required|string|max:255|email|unique:users,email',
                'password'=>'required|string|min:8|confirmed',
            ]
            );
         
            $user=User::create([
                'name'=>$fields['name'],
                'email'=>$fields['email'],
                'password'=>Hash::make($fields['password']),
            ]);

    // Fire the Registered event to send a verification email
    // event(new Registered($user));

          $user->sendEmailVerificationNotification();

            $token= $user->createToken('auth_token')->plainTextToken;

            return response()->json(
                [
                    'message'=>'Registration successful. Please check your email for verification.',
                     'user'=>$user,
                     'token'=>$token,
                ],201
            );
    }


    public function login(Request $request)
    {
           $request->validate(
            [
                'email'=>'required|string|email',
                'password'=>'required|string',
            ]
            );
         
            if(!Auth::attempt($request->only('email','password')))
            {
               return response()->json([
                'message'=>'Invalid email or password',
               ],401);
            } 

            $user=User::where('email',$request->email)->firstOrFail();

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
        
            // Check if email is verified
            if (!$user->hasVerifiedEmail()) {
                return response()->json(['message' => 'Please verify your email before logging in.'], 403);
            }

            $token= $user->createToken('auth_token')->plainTextToken;

            return response()->json(
                [
                    'message'=>'Login successfully.',
                     'user'=>$user,
                     'token'=>$token,
                ],200
            );
    }

    //Get Authenticated User
    public function user(Request $request)
    {
        return response()->json($request->user());
    }


    public function logout(Request $request)
    {
          

        $request->user()->currentAccessToken()->delete();

            return response()->json(
                [
                    'message'=>'Logout Successfully.',
                ],200
            );
    }
    

}
