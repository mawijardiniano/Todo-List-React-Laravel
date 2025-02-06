<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewTodoListTable extends Migration
{
    public function up()
    {
        Schema::create('todolist', function (Blueprint $table) {
            $table->id();
            $table->string('list');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('todolist');
    }
}
