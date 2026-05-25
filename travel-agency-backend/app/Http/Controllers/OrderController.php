<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\CartItem;
use App\Models\TravelDetail;
use App\Models\PackageDeal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('item')
            ->get();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with('item')->findOrFail($id);
        return response()->json($order);
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string'
        ]);

        $userId = $request->user()->id;
        $cartItems = CartItem::where('user_id', $userId)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        DB::beginTransaction();

        try {
            foreach ($cartItems as $cartItem) {
                $item = $cartItem->item;
                $totalPrice = $item->price * $cartItem->quantity;

                Order::create([
                    'user_id' => $userId,
                    'item_type' => $cartItem->item_type,
                    'item_id' => $cartItem->item_id,
                    'quantity' => $cartItem->quantity,
                    'total_price' => $totalPrice,
                    'status' => 'paid',
                    'payment_method' => $request->payment_method,
                    'booking_date' => now()
                ]);

                // Update available seats if it's a travel item
                if ($cartItem->item_type === 'travel') {
                    $travel = TravelDetail::find($cartItem->item_id);
                    if ($travel) {
                        $travel->available_seats -= $cartItem->quantity;
                        $travel->save();
                    }
                }
            }

            // Clear cart
            CartItem::where('user_id', $userId)->delete();

            DB::commit();

            return response()->json(['message' => 'Order placed successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Checkout failed', 'error' => $e->getMessage()], 500);
        }
    }
}