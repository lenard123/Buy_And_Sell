<?php

namespace App\Http\Controllers\API\v1\Product;

use App\Http\Controllers\Conf;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Product;

class AddController extends Controller
{
    public function __invoke(Request $request)
    {
    	$this->validateRequest($request);

    	if ($request->user()->cant('create', Product::class))
    		return Util::err('You are not allowed to create a product.');

    	return $this->insertProduct($request);
    }

    private function insertProduct ($request)
    {
    	$product = new Product;
    	$product->fill($request->all());
    	$product->user_id   = $request->user()->id;
        $product->image_id  = $this->getImageId($request, 'image1');
        $product->image1_id = $this->getImageId($request, 'image2');
        $product->image2_id = $this->getImageId($request, 'image3');
        $product->image3_id = $this->getImageId($request, 'image4');
        $product->image4_id = $this->getImageId($request, 'image5');
    	$product->save();
    	return $product;
    }

    private function getImageId($request, $file)
    {
    	$config['file'] = $file;
    	$config['directory'] = 'images/product';
    	$config['default'] = Conf::IMAGE_PRODUCT;
    	return Util::getImageId($request, $config);	
    }

    private function validateRequest ($request)
    {
    	$this->validate($request, [
    		'category_id'=> 'required|exists:category,id',
    		'name' => 'required',
    		'price' => 'required|numeric',
    		'qty' => 'required|numeric',
    	]);
    }
}
