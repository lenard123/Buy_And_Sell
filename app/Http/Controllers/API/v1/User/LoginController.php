<?php

namespace App\Http\Controllers\API\v1\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function __invoke (Request $request)
    {
    	$this->validateRequest($request);

    	if ($this->chkLogin($request)) 
    		return $this->getResult($request);
    	else 
    		return Util::err('Wrong user or pass!');

    }

    private function getResult ($request)
    {
		$result['user'] = Auth::user();
		$result['token'] = $result['user']->createToken('bas')->accessToken;
		return response()->json($result);
    }

    private function chkLogin ($request)
    {
    	return Auth::attempt($request->all());
    }

    private function validateRequest ($request)
    {
    	$this->validate($request, [
    		'username' => 'required',
    		'password' => 'required'
    	]);
    }
}
