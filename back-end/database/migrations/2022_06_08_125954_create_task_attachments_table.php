<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_attachments', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('uploaded_by')->nullable();
            $table->unsignedBigInteger('task_id')->nullable();
            $table->string('path')->nullable();
            $table->string('name')->nullable();
            $table->string('url')->nullable();

            $table->foreign('uploaded_by')
                ->references('id')
                ->on('users')->onDelete('cascade');
            $table->foreign('task_id')
                ->references('id')
                ->on('tasks')->onDelete('cascade');

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
        Schema::dropIfExists('task_attachments');
    }
}
