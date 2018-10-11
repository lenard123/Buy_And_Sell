<?php

namespace App\Http\Controllers\API\v1\Category;

use App\Http\Controllers\Conf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Category;

class AddController extends Controller
{
    public function __invoke (Request $request)
    {
    	if ($request->user()->cant('create', Category::class))
    		return Util::unauthorized();

    	$this->validateRequest($request);

    	return $this->insertCategory($request);

    }

    private function insertCategory ($request)
    {
    	$category = $request->all();
    	$category['image_id'] = $this->getImageId($request);
        $category['added_by'] = Auth::id();
    	
        $cat = Category::create($category);
        return GetController::byId($cat->id);
    }

    private function getImageId ($request)
    {
    	$config['file'] = 'image';
    	$config['directory'] = 'images/category';
    	$config['default'] = Conf::IMAGE_CATEGORY;
    	return Util::getImageId($request, $config);	
    }

    private function validateRequest ($request)
    {
    	$this->validate($request, [
    		'name' => 'required|unique:category',
    		'image' => 'nullable|image'
    	]);
    }
}
