<?php

namespace App\Http\Controllers\API\v1\Product;

use App\Http\Controllers\Conf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Product;
use App\Model\RejectedProduct;

class RejectController extends Controller
{
    public function __invoke(Request $request, $id)
    {
    	$this->validateRequest($request);

    	$product = Product::find($id);

    	if (!$this->chkPassword($request)) 
    		return Util::err('Wrong password!');
    	else if ($request->user()->cant('reject', $product))
    		return Util::err('Only an admin can reject a product');
    	
    	return $this->reject($request, $product);

    }

    private function reject (Request $request, Product $product)
    {
    	$product->status = Conf::PRODUCT_REJECT;

    	$rejected_product = RejectedProduct::firstOrNew(['product_id'=>$product->id]);
    	$rejected_product->reject_by = $request->user()->id;
    	$rejected_product->reason = $request->reason;
    	$rejected_product->save();

    	$product->save();

    	return $product;
    }

    private function validateRequest (Request $request)
    {
	   	$this->validate($request, [
    		'reason' => 'required',
    		'password' => 'required'
    	]);

    }

    private function chkPassword (Request $request)
    {
     	return Hash::check($request->password, $request->user()->password);
    }
}
