<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignUserRequest;
use App\Http\Resources\Admin\AssignUserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Throwable;

class AssignUserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'email', 'username'])
            ->when(request()->search, function ($query, $search) {
                $query->where('email', 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, function ($query) {
                $query->orderBy(request()->field, request()->direction);
            })
            ->with(['roles'])
            ->paginate(request()->loan ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/AssignUsers/Index', [
            'page_settings' => [
                'title' => 'Tetapkan Peran',
                'subtitle' => 'Menampilkan seluruh data tetapkan peran yang ada di platform',
            ],
            'users' => AssignUserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Admin/AssignUsers/Edit', [
            'page_settings' => [
                'title' => 'Sinkronisasi Peran',
                'subtitle' => 'Sinkronisasi peran di sini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.assign-users.update', $user),
            ],
            'user' => $user->load(['roles']),
            'roles' => Role::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn ($item) => [
                'label' => $item->name,
                'value' => $item->id,
            ]),
        ]);
    }

    public function update(User $user, AssignUserRequest $request): RedirectResponse
    {
        try {
            $user->syncRoles($request->roles);
            flashMessage("berhasil menyinkronkan izin ke role {$user->name}");

            return to_route('admin.assign-users.index');
        } catch (Throwable $e) {
            dd($e);
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');

            return to_route('admin.assign-users.index');
        }
    }
}
