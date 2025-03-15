<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordResetLinkController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
    
        $status = Password::sendResetLink($request->only('email'));
    
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => trans($status),
            ], 200)
            : response()->json(['message' => trans($status),
        ], 400);
    }
    
}
