<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Models\Log;
use App\Models\LogAction;
use App\Models\LogCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $adminRole = Role::create(['name' => 'admin']);
        $employeeRole = Role::create(['name' => 'employee']);

        $user = User::create([
            'name' => 'admin',
            'last_name' => 'adminian',
            'password' => Hash::make('admin'),
            'mobile' => '09121234567',
            'email' => 'admin@admin.com'
        ]);

        $user->assignRole($adminRole);

        $user = User::create([
            'name' => 'حسین',
            'last_name' => 'تست',
            'mobile' => '09121234567',
            'password' => Hash::make('123456'),
            'email' => 'hosein@test.com'
        ]);

        $user->assignRole($employeeRole);

        $userObserver = User::create([
            'name' => 'کاربر ناظر',
            'last_name' => 'تستر',
            'mobile' => '09121234567',
            'password' => Hash::make('123456'),
            'email' => 'nazer@test.com'
        ]);

        $userObserver->assignRole($employeeRole);

        Priority::create(['priority_text' => 'پایین']);
        Priority::create(['priority_text' => 'متوسط']);
        Priority::create(['priority_text' => 'بالا']);
        Priority::create(['priority_text' => 'فوری']);

        Status::create(['status_text' => 'بک لاگ']);
        Status::create(['status_text' => 'برای انجام']);
        Status::create(['status_text' => 'درحال انجام']);
        Status::create(['status_text' => 'کنسل شده']);
        Status::create(['status_text' => 'در انتظار']);
        Status::create(['status_text' => 'کامل شد']);
        Status::create(['status_text' => 'نیاز به بررسی']);
        Status::create(['status_text' => 'بسته شد']);

        Department::create(['department_name' => 'تست',]);

        $project1 = Project::create([
            'title' => 'اولین تسک اتوماتیک',
            'description' => 'در توضیح این پروژه نیاز است تا الکی متن نا مفهومی نوشه شود تا کادر را پر کند و شما الکی مطالعات خودرا در زمینه های مختلف افزایش دهید لذا در این مکان وجود دارد که ما خواهیم توانست در گذ از زنجان به قشم برسیم.',
            'supervisor_id' => 2,
            'department_id' => 1,
            'priority_id' => 3,
            'observers_report' => 'در این قسمت متن نوشته شده توسط ناظر نمایش داده خواهد شد.'
        ]);

        $project2 = Project::create([
            'title' => 'تسک با الویت کم اتوماتیک',
            'description' => 'در توضیح این پروژه نیاز است تا الکی متن نا مفهومی نوشه شود تا کادر را پر کند و شما الکی مطالعات خودرا در زمینه های مختلف افزایش دهید لذا در این مکان وجود دارد که ما خواهیم توانست در گذ از زنجان به قشم برسیم.',
            'supervisor_id' => 2,
            'department_id' => 1,
            'priority_id' => 1,
            'observers_report' => 'در این قسمت متن نوشته شده توسط ناظر نمایش داده خواهد شد.'
        ]);

        $project1->members()->attach($user);
        $project1->observers()->attach($userObserver);

        $task = Task::create([
            'title' => 'اولین تسک',
            'description' => 'لازم است در این تسک شما این تسک رو انجام بدید',
            'project_id' => 1,
            'priority_id' => 3,
            'status_id' => 3,
            'estimated_proficiency' => 50,
            'deadline' => '2022-06-26',
            'estimated_time' => 5,
            'time' => 6,
            'start_at' => '2022-06-26',
            'end_at' => '2022-06-26',
            'score' => 85
        ]);

        $task->users()->attach($user);

        // ===========================
        // Project logs
        // ===========================
        LogCategory::create(['category' => 'پروژه']);

        LogAction::create(['action_text' => 'موفقیت در ایجاد پروژه']);
        LogAction::create(['action_text' => 'شکست در ایجاد پروژه']);

        LogAction::create(['action_text' => 'موفقیت در ذخیره سازی پیوست (ها)']);
        LogAction::create(['action_text' => 'شکست در ذخیره سازی پیوست (ها)']);

        LogAction::create(['action_text' => 'موفقیت در دریافت اطلاعات پروژه']);
        LogAction::create(['action_text' => 'شکست در دریافت اطلاعات پروژه']);

        LogAction::create(['action_text' => 'موفقیت در دریافت لیست کاربران پروژه']);
        LogAction::create(['action_text' => 'شکست در دریافت لیست کاربران پروژه']);

        LogAction::create(['action_text' => 'موفقیت در دریافت لیست ناظران پروژه']);
        LogAction::create(['action_text' => 'شکست در دریافت لیست ناظران پروژه']);

        LogAction::create(['action_text' => 'موفقیت در دریافت لیست پروژه ها']);
        LogAction::create(['action_text' => 'شکست در دریافت لیست پروژه ها']);

        LogAction::create(['action_text' => 'موفقیت در بروز رسانی پروژه']);
        LogAction::create(['action_text' => 'شکست در بروز رسانی پروژه']);

        LogAction::create(['action_text' => 'موفقیت در حذف پروژه']);
        LogAction::create(['action_text' => 'شکست در حذف پروژه']);
    }
}
