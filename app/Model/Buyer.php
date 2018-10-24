<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    protected $fillable = ['user_id', 'address1', 'address2'];
}
