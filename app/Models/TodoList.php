<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;

    // Specify the table name if it differs from the plural form
    protected $table = 'todolist'; // Ensure this matches the table name in your migration
    
    // Add fillable properties for mass assignment
    protected $fillable = ['list'];
}
