<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\TravelDetail;
use App\Models\PackageDeal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $cartItems = CartItem::where('user_id', $userId)->get();

        $items = [];
        foreach ($cartItems as $cartItem) {
            $item = $cartItem->item;
            if ($item) {
                $items[] = [
                    'id' => $cartItem->id,
                    'cart_id' => $cartItem->id,
                    'item_type' => $cartItem->item_type,
                    'item_id' => $cartItem->item_id,
                    'name' => $cartItem->item_type === 'travel' ? $item->title : $item->name,
                    'price' => $item->price,
                    'quantity' => $cartItem->quantity,
                    'image_url' => $item->image_url
                ];
            }
        }

        return response()->json($items);
    }

    public function addToCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item_type' => 'required|in:travel,package',
            'item_id' => 'required|integer',
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verify item exists
        if ($request->item_type === 'travel') {
            TravelDetail::findOrFail($request->item_id);
        } else {
            PackageDeal::findOrFail($request->item_id);
        }

        $userId = $request->user()->id;

        $cartItem = CartItem::where('user_id', $userId)
            ->where('item_type', $request->item_type)
            ->where('item_id', $request->item_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => $userId,
                'item_type' => $request->item_type,
                'item_id' => $request->item_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json(['message' => 'Item added to cart successfully']);
    }

    public function updateQuantity(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $cartItem = CartItem::findOrFail($id);

        // Make sure the cart item belongs to the authenticated user
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json(['message' => 'Cart updated successfully']);
    }

    public function removeFromCart(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);

        // Make sure the cart item belongs to the authenticated user
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Item removed from cart']);
    }

    public function clearCart(Request $request)
    {
        CartItem::where('user_id', $request->user()->id)->delete();
        return response()->json(['message' => 'Cart cleared successfully']);
    }
}