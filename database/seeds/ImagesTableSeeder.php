<?php

use App\Http\Controllers\Conf;
use Illuminate\Database\Seeder;
use App\Model\Image;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $default = [
        	[['id'=> Conf::IMAGE_USER], ['path'=> 'images/user.jpg']],
        	[['id'=> Conf::IMAGE_CATEGORY], ['path'=> 'images/category.jpg']],
        	[['id'=> Conf::IMAGE_PRODUCT], ['path'=> 'images/product.jpg']],
            [['id'=> Conf::IMAGE_BUYER], ['path'=> 'images/buyer.jpg']],
            [['id'=> Conf::IMAGE_SELLER], ['path'=> 'images/seller.jpg']],
            [['id'=> Conf::IMAGE_SLIDE_1], ['path'=> 'images/slide1.png']],
            [['id'=> Conf::IMAGE_SLIDE_2], ['path'=> 'images/slide2.png']],
            [['id'=> Conf::IMAGE_SLIDE_3], ['path'=> 'images/slide3.png']],
        ];

        foreach ($default as $key => $value) {
        	Image::updateOrCreate($value[0], $value[1]);
        }
    }
}
