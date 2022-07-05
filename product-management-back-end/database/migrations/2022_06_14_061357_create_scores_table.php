<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('add_by')->nullable();
            $table->unsignedBigInteger('recipient_score');
            $table->unsignedBigInteger('task_id')->nullable();
            $table->string('type')->nullable()->comment('manual or task or etc.');
            $table->string('description')->nullable();
            $table->timestamps();

            $table->foreign('add_by')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade');

            $table->foreign('recipient_score')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade');

            $table->foreign('task_id')
                ->references('id')
                ->on('tasks')
                ->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scores');
    }
}
