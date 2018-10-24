<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class LoginTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testLogin()
    {

        Artisan::call('default');

        $user = factory(\App\Model\User::class)->create();

        Log::debug($user->username);


        $response = $this->json('POST', '/api/v1/user/login', [
            'username' => $user->username,
            'password' => 'secret'
        ]);

        $response->assertStatus(200);
    }

    public function testLoginValidation()
    {

        $response = $this->json('POST', 'api/v1/user/login');

        $response->assertStatus(422);
    }

    public function testLoginWrongInput()
    {
        $response = $this->json('POST', 'api/v1/user/login', [
            'username' => 'avndlvlm',
            'password' => 'agesfafjla'
        ]);

        $response->assertStatus(401);
    }
}
