<?php

namespace App\Http\Controllers\API\v1\Product;

use App\Http\Controllers\Conf;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Product;
use App\Model\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class GetController extends Controller
{

    public function __construct (Request $request) 
    {
        Log::debug(json_encode(\App\Model\Image::all()));
        if ($request->status != 'approve')
            $this->middleware('auth:api');
    }

    public function __invoke (Request $request)
    {
        if ($request->status=='approve')
            return $this->approve($request);
        else if ($request->status=='pending')
            return $this->pending($request);
        else if ($request->status=='rejected')
            return $this->rejected($request);
        else
            return $this->all($request);
    }

    public function all ($request)
    {
        if (Auth::user()->can('viewAll', Product::class))
            return $this->getProduct([]);
        else
            return Util::err('Only an admin can view all products.');
    }

    public function pending ($request) 
    {
        if (Auth::user()->can('viewPending', Product::class))
            return $this->getProduct(['status'=>Conf::PRODUCT_PENDING]);
        else
            return Util::err('Only an admin can view all pending products');
    }

    public function approve (Request $request)
    {
        $params = ['status'=>Conf::PRODUCT_APPROVE];
        if (!is_null($request->category_id))
            $params['category_id'] = $request->category_id;
        return $this->getProduct($params);
    }

    public function show (int $id) : Product {
        $product = Product::find($id);
        $product->category_name = Category::find($product->category_id)
                                            ->name;
        $product->desc;
        return $product;
    }

    public function rejected ($request)
    {
        if (Auth::user()->can('viewRejected', Product::class))
            return $this->getProduct(['status'=>Conf::PRODUCT_REJECT]);
        else
            return Util::err('Only an admin can view all rejected products');
    }

    public function user (Request $request, $id)
    {

        $params = [];
        $params['user_id'] = $id;
        
        $status = [
            'approve'=>Conf::PRODUCT_APPROVE,
            'rejected' => Conf::PRODUCT_REJECT,
            'pending'=> Conf::PRODUCT_PENDING
        ];

        if (!is_null($request->category_id))
            $params['category_id'] = $request->category_id;
        if (!is_null($request->status))
            $params['status'] = $status[$request->status];


    	return $this->getProduct($params);
    }

    private function getProduct($param, $pp = 5)
    {
        $product = Product::select('products.id')
                            ->addSelect('category_id')
                            ->addSelect('products.image_id')
                            ->addSelect('image1_id')
                            ->addSelect('image2_id')
                            ->addSelect('image3_id')
                            ->addSelect('image4_id')
                            ->addSelect('name')
                            ->addSelect('price')
                            ->addSelect('qty')
                            ->addSelect('user_id')
                            ->addSelect('status')
                            ->addSelect(
                                DB::raw('users.fname as user_name')
                              )
                            ->addSelect(
                                DB::raw('users.image_id as user_image_id')
                              )
                            ->join('users', 'users.id', '=', 'products.user_id')
                            ->where($param)
                            ->orderBy('products.created_at', 'desc')
                            ->paginate($pp);
        return $product;
    }
}
