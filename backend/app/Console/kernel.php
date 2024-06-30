<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\ScheduleMeals;

class Kernel extends ConsoleKernel
{
    /**
     * Define os comandos do Artisan.
     *
     * @var array
     */
    protected $commands = [
        ScheduleMeals::class,
    ];

    /**
     * Define a programação de tarefas.
     */
    protected function schedule(Schedule $schedule)
    {
        // Agende o comando para ser executado diariamente
        $schedule->command('app:schedule-meals')->daily();
    }

    /**
     * Registre os comandos do aplicativo.
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
