<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Conf;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class SignupTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testSignUp()
    {
        Artisan::call('default');

        $response = $this->json('POST', 'api/v1/user/signup', [
            'username' => 'test',
            'password' => 'test',
            'c_password' => 'test',
            'email' => 'test@test.com',
            'lname' => 'test',
            'fname' => 'test',
            'role' => Conf::ROLE_BUYER
        ]); 

        $response->assertStatus(201);
    }

    public function testSignUpValidation()
    {
        $response = $this->json('POST', 'api/v1/user/signup');

        $response->assertStatus(422);
    }

    public function testSignUpImageUpload()
    {
        Artisan::call('default');

        Storage::fake('avatars');

        $response = $this->json('POST', 'api/v1/user/signup', [
            'username' => 'test',
            'password' => 'test',
            'c_password' => 'test',
            'email' => 'test@test.com',
            'lname' => 'test',
            'fname' => 'test',
            'role' => Conf::ROLE_BUYER,
            'image' => UploadedFile::fake()->image('avatars.jpg')
        ]); 

        $response->assertStatus(201);        
    }
}
