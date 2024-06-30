<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\MealRequest;
use Carbon\Carbon;

class ScheduleMeals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:schedule-meals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Schedule meals for students for the next 15 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Obtém todos os alunos bolsistas
        $alunos = User::where('role', 'bolsista')->get();

        // Agenda refeições para os próximos 15 dias
        for ($i = 0; $i < 15; $i++) {
            $data = Carbon::now()->addDays($i)->toDateString();
            foreach ($alunos as $aluno) {
                MealRequest::updateOrCreate(
                    ['user_id' => $aluno->id, 'request_date' => $data],
                    ['meal_id' => 1, 'quantity' => 1, 'status' => 'pending']
                );
            }
        }

        $this->info('Refeições agendadas com sucesso!');
        return 0;
    }
}
