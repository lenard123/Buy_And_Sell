<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \App\Model\Category::class => \App\Policies\CategoryPolicy::class,
        \App\Model\User::class => \App\Policies\UserPolicy::class,
        \App\Model\Product::class => \App\Policies\ProductPolicy::class,
        \App\Model\Cart::class => \App\Policies\CartPolicy::class,
        \App\Model\Order::class => \App\Policies\OrderPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}
