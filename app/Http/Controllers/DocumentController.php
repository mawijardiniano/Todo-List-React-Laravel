<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    // Get all documents
    public function index()
    {
        $documents = Document::all();
        return response()->json($documents);
    }

    // Store a new document
    public function store(Request $request)
    {
        $validated = $request->validate([
            'agency' => 'required|string',
            'name' => 'required|string',
            'purposeOfLetter' => 'required|string',
            'date' => 'required|date',
            'type' => 'required|in:incoming,outgoing',
        ]);

        $document = Document::create($validated);

        return response()->json($document, 201);
    }

    // Show a single document
    public function show($id)
    {
        $document = Document::find($id);
        if (!$document) {
            return response()->json(['message' => 'Document not found'], 404);
        }
        return response()->json($document);
    }

    // Update a document
    public function update(Request $request, $id)
    {
        $document = Document::find($id);
        if (!$document) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        $validated = $request->validate([
            'agency' => 'sometimes|required|string',
            'name' => 'sometimes|required|string',
            'purposeOfLetter' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'type' => 'sometimes|required|in:incoming,outgoing',
        ]);

        $document->update($validated);

        return response()->json($document);
    }

    // Delete a document
    public function destroy($id)
    {
        $document = Document::find($id);
        if (!$document) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        $document->delete();

        return response()->json(['message' => 'Document deleted successfully']);
    }
}
