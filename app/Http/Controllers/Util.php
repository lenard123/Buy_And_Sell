<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Model\Image;

class Util extends Controller
{
	/**
	 * @param 	{String}	Error Message
	 * @return 	{Response}  400 reponse
	 */
    public static function err($message)
    {
    	return response(['message'=>$message], 400);
    }

    /**
     * @return 	{Response}	Unauthorized
     */
    public static function unauthorized()
    {
    	return response('Unauthorized', 401);
    }

	/**
	 * Upload File and return its id
	 * @param	{Request}	$request
	 * @param 	{String[]}	$config
	 * @return 	{Integer}	$image_id
	 */
	public static function getImageId(Request $request, $config)
	{
		$file = $config['file'];
		$default = $config['default'];
		$directory = $config['directory'];
		$filename = time().'.jpg';

		if (empty($request->$file))
			$id = $default;
		else {
			$path = Storage::putFileAs($directory, $request->file($file), $filename);
			$id = Image::create(['path'=>$path])->id;
		}
		return $id;
	}


	/**
	 * Delete Image
	 * @param 	{Integer} 	$image_id
	 */
	public static function deleteImage ($id)
	{
		for ($i=1; $i <=8 ; $i++) 
			if ($id === $id)
				return;

		$image = Image::find($id);
		Storage::delete($image->path);
		$image->delete();
	}

	/**
	 * Check if Password is valid
	 * @param 	{Request}	$request
	 * @return 	{Bool}		$isvalidpass
	 */
	public static function isValidPassword (Request $request)
	{
		return Hash::check($request->password, $request->user()->password);
	}
}
