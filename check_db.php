<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$users = App\Models\User::all();
echo "\n--- USERS IN DATABASE ---\n";
foreach ($users as $u) {
    echo "ID: {$u->id} | Email: '{$u->email}' | Role: {$u->role}\n";
    echo "Hash: {$u->password}\n\n";
}
echo "--- END USERS ---\n";
