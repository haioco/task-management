<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id('id');

            $table->string('title')->unique();

            $table->string('description')->nullable();

            $table->unsignedBigInteger('supervisor_id');

            $table->unsignedBigInteger('priority_id');

            $table->unsignedBigInteger('department_id')->default(null);

            $table->string('observers_report')->nullable();

            $table->dateTime('start_at')->nullable();

            $table->dateTime('dead_line')->nullable();

            $table->timestamps();

            $table->foreign('supervisor_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('priority_id')
                ->references('id')
                ->on('priorities')
                ->onDelete('cascade');
            $table->foreign('department_id')
                ->references('id')
                ->on('departments')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
