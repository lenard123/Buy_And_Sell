<?php

use Illuminate\Database\Seeder;
use App\Model\Category;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::updateOrCreate(['name'=>'Uncategorized'], [
        	'desc' => 'This Category contains products randomly.',
            'added_by' => 1,
        ]);
    }
}
