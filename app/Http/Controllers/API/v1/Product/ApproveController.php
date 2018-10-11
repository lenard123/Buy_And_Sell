<?php

namespace App\Http\Controllers\API\v1\Product;

use App\Http\Controllers\Conf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Product;

class ApproveController extends Controller
{
    public function __invoke (Request $request, $id)
    {
    	$this->validateRequest($request);

    	$product = Product::find($id);

    	if (!$this->chkPassword($request))
    		return Util::err('Wrong password!');
    	else if ($request->user()->cant('approve', $product))
    		return Util::err('Only an admin can approve a product.');

    	$product->status = Conf::PRODUCT_APPROVE;
    	$product->save();

    	return $product;

    }

    private function chkPassword (Request $request)
    {
    	return Hash::check($request->password, $request->user()->password);
    }

    private function validateRequest (Request $request)
    {
    	$this->validate($request, [
    		'password' => 'required'
    	]);
    }
}
