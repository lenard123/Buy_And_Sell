<?php

use App\Http\Controllers\Conf;
use Illuminate\Database\Seeder;
use App\Model\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

    	$data = [
            'username' => 'admin',
            'password' => bcrypt('admin'),
            'email' => 'lenard.mangayayam@gmail.com',
            'fname' => 'Lenard',
            'lname' => 'Mangay-ayam'
        ];
        $user = User::firstOrNew(['id'=>1], $data);
        $user->role = Conf::ROLE_ADMIN;
        $user->admin_role= Conf::ADMIN_ROLE_MAIN;
        $user->save();
    }
}
