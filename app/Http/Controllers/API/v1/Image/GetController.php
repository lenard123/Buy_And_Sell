<?php

namespace App\Http\Controllers\API\v1\Image;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Image;

class GetController extends Controller
{
    public function __invoke ($id)
    {
    	$image = Image::find($id);
    	$path = 'storage/'.$image->path;
    	return response()->file($path);
    }
}
