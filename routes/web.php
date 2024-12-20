<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\RoleController;
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\AirlineController;
use App\Http\Controllers\ProfileController;

// Admin Routes

// Admin Login
Route::get('/admin/login', function () {
    return Inertia::render('Admin/Auth/Login');
});
Route::post('/admin/login', [AdminController::class, 'login']);

// Admin Logout
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

// Admin Dashboard
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        Log::info('Dashboard route hit');
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // User Routes
    Route::get('/users/list', function () {
        $users = User::all();
        return Inertia::render('Admin/Users/UserList', [
            'users' => $users,
        ]);
    })->name('admin.users.list');

    Route::get('/users/create', function () {
        $roles = Role::all();
        return Inertia::render('Admin/Users/CreateUser', [
            'roles' => $roles,
        ]);
    })->name('admin.users.create');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('admin.users.store');

    Route::get('/users/{user}/edit', function (User $user) {
        $roles = Role::all();
        return Inertia::render('Admin/Users/UpdateUser', [
            'user' => $user,
            'roles' => $roles,
        ]);
    })->name('admin.users.edit');

    Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('admin.users.update');

    Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('admin.users.destroy');

    Route::delete('/users', [AdminController::class, 'destroySelectedUsers'])->name('admin.users.destroy.selected');

    // Customer routes
    Route::get('/customers/list', [AdminController::class, 'customerList'])->name('admin.customers.list');
    Route::delete('/customers/{customer}', [AdminController::class, 'destroyCustomer'])->name('admin.customers.destroy');
    Route::delete('/customers', [AdminController::class, 'destroySelectedCustomers'])->name('admin.customers.destroy.selected');

    // Role Routes
    Route::get('/roles/list', [RoleController::class, 'index'])->name('admin.roles.list');

    Route::get('/roles/create', function () {
        return Inertia::render('Admin/Roles/CreateRole');
    })->name('admin.roles.create');
    Route::post('/roles', [RoleController::class, 'store'])->name('admin.roles.store');

    Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])->name('admin.roles.edit');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('admin.roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy');

    // Airline Routes
    Route::get('/airlines/list', [AirlineController::class, 'index'])->name('maskapai.airlines.list');

    Route::get('/airlines/create', function () {
        return Inertia::render('Admin/Maskapai/CreateAirline');
    })->name('maskapai.airlines.create');
    Route::post('/airlines', [AirlineController::class, 'store'])->name('maskapai.airlines.store');

    Route::delete('/airlines/{id}', [AirlineController::class, 'destroy'])->name('maskapai.airlines.destroy');
});



// Base Web Routes

// Welcome Route
Route::get('/', function () {
    if (Auth::guard('customer')->check()) {
        return redirect('/home');
    }
    return Inertia::render('Welcome');
});

// Auth Routes
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post('/login', action: [AuthController::class, 'login']);
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
});
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:customer')->name('logout');

// Home Routes
Route::get('/home', function () {
    $userName = Auth::guard('customer')->user()->name;
    return Inertia::render('Home/Home', [
        'userName' => $userName,
    ]);
})->middleware('auth:customer');
Route::get('/explore', function () {
    return Inertia::render('Home/Explore');
})->middleware('auth:customer');

// Profile Routes
Route::get('/profile', function () {
    $userName = Auth::guard('customer')->user()->name;
    $userEmail = Auth::guard('customer')->user()->email;
    $userJenisKelamin = Auth::guard('customer')->user()->jeniskelamin;
    $userTanggalLahir = Auth::guard('customer')->user()->tanggallahir;
    return Inertia::render('Profile/Profile', [
        'userName' => $userName,
        'userEmail' => $userEmail,
        'userJenisKelamin' => $userJenisKelamin,
        'userTanggalLahir' => $userTanggalLahir,
    ]);
})->middleware('auth:customer');

Route::post('/profile/update', [ProfileController::class, 'updateProfile'])->middleware('auth:customer');

Route::get('/profile/password', function () {
    return Inertia::render('Profile/Password');
})->middleware('auth:customer');

Route::post('/profile/update-password', [ProfileController::class, 'updatePassword'])->middleware('auth:customer');
Route::delete('/profile/delete-account', [ProfileController::class, 'deleteAccount'])->middleware('auth:customer');

//
