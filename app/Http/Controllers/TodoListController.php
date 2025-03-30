<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    // Get all tasks
    public function index()
    {
        $tasks = TodoList::all();
        return response()->json([
            'success' => true,
            'data' => $tasks
        ]);
    }

    // Get a single task
    public function show($id)
    {
        $task = TodoList::find($id);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $task
        ]);
    }

    // Add a new task
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'completed' => 'boolean'
        ]);

        $task = TodoList::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Task added successfully',
            'data' => $task
        ], 201);
    }

    // Update an existing task
    public function update(Request $request, $id)
    {
        $task = TodoList::find($id);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'completed' => 'sometimes|boolean'
        ]);

        $task->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully',
            'data' => $task
        ]);
    }

    // Delete a tasks
    public function destroy($id)
    {
        $task = TodoList::find($id);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found'
            ], 404);
        }

        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully'
        ]);
    }
}
