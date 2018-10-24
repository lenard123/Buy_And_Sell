<?php

namespace App\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
    	'id', 'fname', 'lname', 'image_id', 'username', 'password', 'email',
    ];

    protected $guarded = [
    	'role', 'admin_role'
    ];

    protected $hidden = [
    	'password'
    ];

    public function carts ()
    {
    	return $this->hasMany('App\Model\Cart');
    }

    public function orders ()
    {
        return $this->hasMany('App\Model\Order');
    }

    public function seller ()
    {
        return $this->hasOne('App\Model\Seller');
    }

    public function buyer ()
    {
        return $this->hasOne('App\Model\Buyer');
    }
}
