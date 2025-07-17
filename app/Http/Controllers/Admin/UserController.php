<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\UserGender;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

use function PHPUnit\Framework\throwException;

class UserController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $users = (User::query())
            ->select(['id', 'name', 'username', 'email', 'phone', 'avatar', 'gender', 'date_of_birth', 'address', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->latest()
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        return Inertia::render('Admin/Users/Index', [
            'page_settings' => [
                'title' => 'Pengguna',
                'subtitle' => 'Menampilkan semua data pengguna yang tersedia di platform ini'
            ],
            'users' => UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ]

        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create', [
            'page_settings' => [
                'title' => 'Tambah Pengguna',
                'subtitle' => 'Buat pengguna baru di sini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.users.store')
            ],
            'genders' => UserGender::options()

        ]);
    }

    public function store(UserRequest $request): RedirectResponse
    {
        try {
            User::create([
                'name' => $name = $request->name,
                'username' => usernameGenerator($name),
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'avatar' => $this->uploadFile($request, 'avatar', 'users'),
                'gender' => $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'address' => $request->address
            ]);
            flashMessage(MessageType::CREATED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.users.index');
        }
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'page_settings' => [
                'title' => 'Edit pengguna',
                'subtitle' => 'Edit pengguna di sini',
                'method' => 'PUT',
                'action' => route('admin.users.update', $user)
            ],
            'genders' => UserGender::options(),
            'user' => $user
        ]);
    }

    public function update(User $user, UserRequest $request): RedirectResponse
    {
        try {
            $user->update([
                'name' => $name = $request->name,
                'username' => $user->name !== $name ? usernameGenerator($name) : $user->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'avatar' => $this->updateFile($request, $user, 'avatar', 'users'),
                'gender' => $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'address' => $request->address
            ]);
            flashMessage(MessageType::UPDATED->message('pengguna'));
            return to_route('admin.users.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.users.index');
        }
    }

    public function destroy(User $user): RedirectResponse
    {
        try {
            $this->deleteFile($user, 'avatar');
            $user->delete();

            flashMessage(MessageType::DELETED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.users.index');
        }
    }
}
