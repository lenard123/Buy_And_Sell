<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response($request->user());
});


Route::prefix('v1')->group(function () {
	Route::post('user/login', 'API\v1\User\LoginController')->name('login');
	Route::post('user/signup', 'API\v1\User\SignUpController')->name('signup');
	Route::get('user/seller', 'API\v1\User\GetController@sellers');
	Route::get('user/buyer', 'API\v1\User\GetController@buyers');
	Route::get('user/admin', 'API\v1\User\GetController@admins');
	Route::get('user/{id}', 'API\v1\User\GetController@user');

	Route::get('category', 'API\v1\Category\GetController');

	//Products
	Route::get('product', 'API\v1\Product\GetController');
	Route::get('user/{id}/product', 'API\v1\Product\GetController@user');

	Route::middleware('auth:api')->group(function () {
		Route::post('category', 'API\v1\Category\AddController');
		Route::put('category/{id}', 'API\v1\Category\UpdateController');
		Route::delete('category/{id}', 'API\v1\Category\DeleteController');

		Route::post('product', 'API\v1\Product\AddController');
		Route::post('product/{id}/reject', 'API\v1\Product\RejectController');
		Route::post('product/{id}/approve', 'API\v1\Product\ApproveController');

		Route::post('cart', 'API\v1\Cart\AddController');
		Route::get('cart', 'API\v1\Cart\GetController');

		Route::post('order', 'API\v1\Order\AddController');
		Route::get('order', 'API\v1\Order\GetController');
		Route::get('order/{id}', 'API\v1\Order\GetController@byId');
		Route::post('order/{id}/cancel', 'API\v1\Order\CancelController');
		Route::post('order/{id}/complete', 'API\v1\Order\CompleteController');

		Route::post('message/{id}', 'API\v1\Message\SendController');
		Route::get('message/{id}', 'API\v1\Message\GetController@user');
		Route::get('message', 'API\v1\Message\GetController@index');
	});
});
