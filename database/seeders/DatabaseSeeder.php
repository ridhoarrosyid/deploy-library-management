<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create(
            [
                'name' => $name = 'Joni',
                'username' => usernameGenerator($name),
                'email' => 'joni@gmail.com'
            ]
        )->assignRole(Role::create(['name' => 'admin']));
        User::factory()->create([
            'name' => $name = "ridho",
            'username' => usernameGenerator($name),
            'email' => 'ridho@gmail.com'
        ])->assignRole(Role::create(['name' => 'operator']));
        User::factory()->create([
            'name' => $name = 'deka',
            'username' => usernameGenerator($name),
            'email' => 'deka@gmail.com'
        ])->assignRole(Role::create(['name' => 'member']));
        $this->call(PublisherSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(RouteAccessSeeder::class);
    }
}
