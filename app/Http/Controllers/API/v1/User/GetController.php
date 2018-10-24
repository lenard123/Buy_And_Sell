<?php

namespace App\Http\Controllers\API\v1\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Conf;
use App\Model\User;

class GetController extends Controller
{
    public function sellers ()
    {
        return $this->getUser(Conf::ROLE_SELLER);
    }

    public function buyers ()
    {
        return $this->getUser(Conf::ROLE_BUYER);
    }

    public function admins ()
    {
        return $this->getUser(Conf::ROLE_ADMIN);
    }

    public function user ($id)
    {
        $user = User::find($id);

        if ($user->role == Conf::ROLE_SELLER)
            $user->seller;

        return $user;
    }

    private function getUser ($role)
    {
        return User::where('role', $role)->paginate(15);
    }
}
