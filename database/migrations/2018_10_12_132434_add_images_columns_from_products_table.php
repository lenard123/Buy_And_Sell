<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImagesColumnsFromProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->integer('image1_id')->unsigned()->default(3);
            $table->integer('image2_id')->unsigned()->default(3);
            $table->integer('image3_id')->unsigned()->default(3);
            $table->integer('image4_id')->unsigned()->default(3);

            $table->foreign('image1_id')->references('id')->on('images');
            $table->foreign('image2_id')->references('id')->on('images');
            $table->foreign('image3_id')->references('id')->on('images');
            $table->foreign('image4_id')->references('id')->on('images');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['image1_id']);
            $table->dropForeign('products_image2_id_foreign');
            $table->dropForeign('products_image3_id_foreign');
            $table->dropForeign('products_image4_id_foreign');
            $table->dropColumn('image1_id');
            $table->dropColumn('image2_id');
            $table->dropColumn('image3_id');
            $table->dropColumn('image4_id');
        });
    }
}
