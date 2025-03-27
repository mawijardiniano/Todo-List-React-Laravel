<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoListController;

Route::get('/tasks', [TodoListController::class, 'index']);
Route::get('/tasks/{id}', [TodoListController::class, 'show']);
Route::post('/tasks', [TodoListController::class, 'store']);
Route::put('/tasks/{id}', [TodoListController::class, 'update']);
Route::delete('/tasks/{id}', [TodoListController::class, 'destroy']);
