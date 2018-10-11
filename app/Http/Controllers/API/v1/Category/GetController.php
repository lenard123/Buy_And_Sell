<?php

namespace App\Http\Controllers\API\v1\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Category;
use App\Model\User;

class GetController extends Controller
{
    public function __invoke ()
    {
    	return GetController::all();
    }

    public static function byId ($id)
    {
        $category = Category::find($id);
        $user = User::find($category->added_by);
        $category->added_by = $user->fname.' '.$user->lname;
        if (!is_null($category->updated_by)){
            $user = User::find($category->updated_by);
            $category->updated_by = $user->fname.' '.$user->lname;
        }
        return $category;
    }

    public static function all()
    {
    	$categories = Category::all();
    	$categories = $categories->each(function($category, $key){
    		$user = User::find($category->added_by);
    		$category->added_by = $user->fname.' '.$user->lname;

    		if (!is_null($category->updated_by)) {
    			$user = User::find($category->updated_by);
    			$category->updated_by = $user->fname.' '.$user->lname;
    		}    			

    	});
    	return $categories;    	
    }
}
