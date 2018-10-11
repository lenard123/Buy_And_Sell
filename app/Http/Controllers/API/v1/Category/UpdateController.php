<?php

namespace App\Http\Controllers\API\v1\Category;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Category;

class UpdateController extends Controller
{
    public function __invoke (Request $request, $id)
    {
    	if ($request->user()->cant('update', Category::find($id))) 
    		return Util::err('You can only update category you created');

    	$this->validateRequest($request, $id);
    	$this->updateCategory($request, $id);

    	return GetController::byId($id);

    }

    private function updateCategory ($request, $id)
    {
    	$category = $request->all();
    	$category['image_id'] = $this->getImageId($request, $id);
        $category['updated_by'] = $request->user()->id;
    	Category::find($id)->update($category);
    }

    private function getImageId ($request, $id)
    {
    	$config['file'] = 'image';
    	$config['directory'] = 'images/category';
    	$config['default'] = Category::find($id)->image_id;

    	$id = Util::getImageId($request, $config);

    	if ($id != $config['default'])
    		Util::deleteImage($config['default']);

    	return $id;
    }

    private function validateRequest ($request, $id)
    {
    	$this->validate($request, [
    		'name' => ['required', Rule::unique('category')->ignore($id)],
    		'image' => 'nullable|image'
    	]);
    }
}
