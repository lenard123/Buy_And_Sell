<?php

namespace App\Http\Controllers\API\v1\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Category;

class DeleteController extends Controller
{
    public function __invoke (Request $request, $id)
    {

        //Get Category
        $category = Category::find($id);

    	//Check if user has ability to delete a category
    	if ($request->user()->cant('delete', $category))
    		return Util::err('You can only delete the category that you made.');

        $image_id = $category->image_id;

    	//Check if the category contains products
    	if ($category->products->count() > 0) 
    		return Util::err('Failed to delete, Category contains products.');
    	
    	//Delete category
    	$category->delete();

        
        //Delete category image
        Util::deleteImage($image_id);


    	//Return all remaining category
    	return GetController::all();

    }
}
