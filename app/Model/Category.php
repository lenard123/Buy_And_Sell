<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    protected $fillable = ['id', 'name', 'desc', 'image_id', 'added_by', 'updated_by'];

    public function products ()
    {
    	return $this->hasMany('App\Model\Product');
    }

    public function user ()
    {
    	return $this->belongsTo('App\Model\User', 'added_by');
    }
}
