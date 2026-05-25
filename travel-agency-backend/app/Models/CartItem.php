<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'item_type',
        'item_id',
        'quantity'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function item()
    {
        if ($this->item_type === 'travel') {
            return $this->belongsTo(TravelDetail::class, 'item_id');
        }
        return $this->belongsTo(PackageDeal::class, 'item_id');
    }
}