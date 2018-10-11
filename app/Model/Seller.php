<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $fillable = ['id','user_id','desc', 'status'];
}
