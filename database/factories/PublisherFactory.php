<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Publisher>
 */
class PublisherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $name = fake('id_ID')->company(),
            'slug' => str()->lower(str()->slug($name) . str()->random(4)),
            'address' => fake('id_ID')->address(),
            'email' => fake('id_ID')->unique()->safeEmail(),
            'phone' => fake('id_ID')->phoneNumber()
        ];
    }
}
