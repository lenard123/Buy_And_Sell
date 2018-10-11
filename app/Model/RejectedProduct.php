<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class RejectedProduct extends Model
{
    protected $fillable = ['product_id', 'reason', 'rejected_by'];
}
