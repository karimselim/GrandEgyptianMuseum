<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\NewPasswordController;
use App\Http\Controllers\PasswordResetLinkController;

/*
-------------------------------------------------------------------------------------------------------------------------
User Authentication
-------------------------------------------------------------------------------------------------------------------------
*/
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function()
{
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/user',[AuthController::class,'user']);
});

// Email Verification

Route::post('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verifyEmail'])->name('verification.verify');
Route::post('/email/resend', [EmailVerificationController::class, 'resendVerificationEmail'])->middleware('auth:sanctum');

//Reset Password

Route::post('/forgot-password', [PasswordResetLinkController::class, 'forgotPassword'])->middleware('api');
Route::post('/reset-password', [NewPasswordController::class, 'resetPassword'])->middleware('api')->name('password.reset');
