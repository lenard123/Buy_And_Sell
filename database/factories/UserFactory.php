<?php

use Faker\Generator as Faker;
use App\Http\Controllers\Conf;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
| 
*/

$factory->define(App\Model\User::class, function (Faker $faker) {
    return [
        'fname' => $faker->name,
        'lname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'username' => 'user-'.rand(10000, 99999),
        'password' => bcrypt('secret'), // secret
    ];
});

$factory->state(App\Model\User::class, 'seller', [
    'role' => Conf::ROLE_SELLER,
]);

$factory->state(App\Model\User::class, 'admin', [
    'role' => Conf::ROLE_ADMIN,
]);
