<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$u = App\Models\User::where('email', 'admin@bytecart.com')->first();
$u->password = password_hash('password', PASSWORD_BCRYPT, ['cost' => 12]);
$u->save();

echo "NEW_HASH: " . $u->password . "\n";
echo "VERIFY: " . (password_verify('password', $u->password) ? 'TRUE' : 'FALSE') . "\n";
