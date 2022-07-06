<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->nullable();

            $table->unsignedBigInteger('action_id')->nullable();

            $table->unsignedBigInteger('category_id')->nullable();

            $table->string('description')->nullable();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('action_id')->references('id')->on('log_actions');
            $table->foreign('category_id')->references('id')->on('log_categories');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
    }
}
