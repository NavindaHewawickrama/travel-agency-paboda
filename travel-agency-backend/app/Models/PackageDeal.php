<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageDeal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'destinations',
        'price',
        'duration',
        'image_url',
        'max_people',
        'includes'
    ];

    protected $casts = [
        'price' => 'decimal:2'
    ];
}