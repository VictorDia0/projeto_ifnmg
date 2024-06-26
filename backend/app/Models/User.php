<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\MealBookings;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'cpf', 'phone_number', 'email', 'user', 'password', 'role', 'course', 'bolsista'
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function mealRequests(): HasMany
    {
        return $this->hasMany(MealRequest::class);
    }

    public function mealBookings(): HasMany
    {
        return $this->hasMany(MealBookings::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Get the attributes that should be cast.
     *
     * @return array
     */

    public function getJWTCustomClaims()
    {
        return [];
    }
}
