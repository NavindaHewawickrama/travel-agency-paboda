<?php

namespace App\Http\Controllers;

use App\Models\TravelDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TravelDetailController extends Controller
{
    public function index()
    {
        return response()->json(TravelDetail::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'destination' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'image_url' => 'nullable|url',
            'available_seats' => 'required|integer|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $travel = TravelDetail::create($request->all());
        return response()->json($travel, 201);
    }

    public function show($id)
    {
        $travel = TravelDetail::findOrFail($id);
        return response()->json($travel);
    }

    public function update(Request $request, $id)
    {
        $travel = TravelDetail::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'destination' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'duration' => 'sometimes|integer|min:1',
            'image_url' => 'nullable|url',
            'available_seats' => 'sometimes|integer|min:0',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $travel->update($request->all());
        return response()->json($travel);
    }

    public function destroy($id)
    {
        TravelDetail::findOrFail($id)->delete();
        return response()->json(['message' => 'Travel deleted successfully']);
    }
}