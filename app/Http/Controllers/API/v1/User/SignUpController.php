<?php

namespace App\Http\Controllers\API\v1\User;

use App\Http\Controllers\Conf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\User;
use App\Model\Seller;
use App\Model\Buyer;

class SignUpController extends Controller
{

    public function __invoke (Request $request)
    {
        $this->validateRequest($request);
        $user = new User;
        $user->fill($request->all());

        if ($request->role == Conf::ROLE_ADMIN && Auth::user()->cant('createAdmin')) 
            return Util::err('Only admin can create an admin');

        $user->role = $request->role;
        $user->password = bcrypt($request->password);
        $user->image_id = $this->getImageId($request);
        $user->save();

        if ($user->role == Conf::ROLE_SELLER)
            Seller::create(['user_id'=>$user->id, 'desc' => $request->desc]);
        elseif ($user->role == Conf::ROLE_BUYER)
            Buyer::create(['user_id'=>$user->id, 'address1'=>$request->address1, 'address2' => $request->address2]);

        return $user;

    }

    private function getImageId ($request)
    {
        $config['file'] = 'image';
        $config['directory'] = 'images/user';
        $config['default'] = 1;
        return Util::getImageId($request, $config);         
    }

    public function buyer (Request $request)
    {
    	$this->validateRequest($request);

    	$user = $this->createUser($request, Conf::ROLE_BUYER);
    	$user->save();

    	return $user;
    }

    public function seller (Request $request)
    {
    	$this->validateRequest($request);

    	$user = $this->createUser($request, Conf::ROLE_SELLER);
    	$user->save();

    	return $user;
    }

    public function admin (Request $request)
    {

    }

    private function createUser ($request, $role)
    {
    	$user = new User;
    	$user->fill($request->all());
    	$user->role = $role;
    	$user->password = bcrypt($request->password);
    	return $user;
    }

    private function validateRequest ($request)
    {
    	$this->validate($request,[
    		'username' => 'required|unique:users',
    		'password' => 'required',
            'c_password' => 'required|same:password',
            'image' => 'nullable|image',
    		'email' => 'required|email',
    		'lname' => 'required',
    		'fname' => 'required',
            'role' => 'required'
    	]);

        if ($request->role == Conf::ROLE_BUYER) 
            $this->validate($request, [
                'address1' => 'required',
                'address2' => 'required'
            ]);

        if ($request->role == Conf::ROLE_SELLER)
            $this->validate($request, [
                'desc' => 'required'
            ]);
    }
}
