<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TodoListController;
use Illuminate\Support\Facades\Route;

Route::apiResource('documents', DocumentController::class);
// routes/api.php
Route::get('/todolist', [TodoListController::class, 'index']);
Route::post('/todolist', [TodoListController::class, 'store']);
Route::get('/todolist/{id}', [TodoListController::class, 'show']);
Route::put('/todolist/{id}', [TodoListController::class, 'update']);
Route::delete('/todolist/{id}', [TodoListController::class, 'destroy']);
