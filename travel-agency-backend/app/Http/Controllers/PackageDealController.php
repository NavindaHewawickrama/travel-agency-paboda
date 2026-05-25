<?php

namespace App\Http\Controllers;

use App\Models\PackageDeal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PackageDealController extends Controller
{
    public function index()
    {
        return response()->json(PackageDeal::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'image_url' => 'nullable|url',
            'max_people' => 'required|integer|min:1',
            'destinations' => 'nullable|string',
            'includes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $package = PackageDeal::create($request->all());
        return response()->json($package, 201);
    }

    public function show($id)
    {
        $package = PackageDeal::findOrFail($id);
        return response()->json($package);
    }

    public function update(Request $request, $id)
    {
        $package = PackageDeal::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'duration' => 'sometimes|integer|min:1',
            'image_url' => 'nullable|url',
            'max_people' => 'sometimes|integer|min:1',
            'destinations' => 'nullable|string',
            'includes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $package->update($request->all());
        return response()->json($package);
    }

    public function destroy($id)
    {
        PackageDeal::findOrFail($id)->delete();
        return response()->json(['message' => 'Package deleted successfully']);
    }
}