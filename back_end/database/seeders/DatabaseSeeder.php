<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
 /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'John Doe',
                'cpf' => '12345678901',
                'phone_number' => '555-1234',
                'email' => 'johndoe@example.com',
                'user' => 'johndoe',
                'password' => Hash::make('password123'),
                'role' => 'ADM',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jane Smith',
                'cpf' => '23456789012',
                'phone_number' => '555-5678',
                'email' => 'janesmith@example.com',
                'user' => 'janesmith',
                'password' => Hash::make('password123'),
                'role' => 'ALN',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('password_reset_tokens')->insert([
            [
                'email' => 'johndoe@example.com',
                'token' => Hash::make('reset_token_1'),
                'created_at' => now(),
            ],
            [
                'email' => 'janesmith@example.com',
                'token' => Hash::make('reset_token_2'),
                'created_at' => now(),
            ],
        ]);

        DB::table('sessions')->insert([
            [
                'id' => Str::random(40),
                'user_id' => 1,
                'ip_address' => '192.168.1.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'payload' => json_encode(['foo' => 'bar']),
                'last_activity' => time(),
            ],
            [
                'id' => Str::random(40),
                'user_id' => 2,
                'ip_address' => '192.168.1.2',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.1.1 Safari/602.2.14',
                'payload' => json_encode(['baz' => 'qux']),
                'last_activity' => time(),
            ],
        ]);
    }
}
