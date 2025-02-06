<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class  TodoListController extends Controller
{
    // Get all documents
    public function index()
    {
        $todolist = TodoList::all();
        return response()->json($todolist);
    }

    // Store a new document
    public function store(Request $request)
    {
        $validated = $request->validate([
            'list' => 'required|string',
        ]);

        $todolist = TodoList::create($validated);

        return response()->json($todolist, 201);
    }

    // Show a single document
    public function show($id)
    {
        $todolist = TodoList::find($id);
        if (!$todolist) {
            return response()->json(['message' => 'Document not found'], 404);
        }
        return response()->json($todolist);
    }

    // Update a document
    public function update(Request $request, $id)
    {
        $todolist = TodoList::find($id);
        if (!$todolist) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        $validated = $request->validate([
            'list' => 'sometimes|required|string',

        ]);

        $todolist->update($validated);

        return response()->json($todolist);
    }

    // Delete a document
    public function destroy($id)
    {
        $todolist = TodoList::find($id);
        if (!$todolist) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        $todolist->delete();

        return response()->json(['message' => 'Document deleted successfully']);
    }
}
