<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignPermissionRequest;
use App\Http\Resources\Admin\AssignPermissionResource;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Throwable;

class AssignPermissionController extends Controller
{
    public function index(): Response
    {
        $roles = Role::query()
            ->select(['id', 'name', 'created_at'])
            ->when(request()->search, function ($query, $search) {
                $query->where('name', 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, function ($query) {
                $query->orderBy(request()->field, request()->direction);
            })
            ->with(['permissions'])
            ->paginate(request()->loan ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/AssignPermissions/Index', [
            'page_settings' => [
                'title' => 'Tetapkan Izin',
                'subtitle' => 'Menampilkan seluruh data tetapkan izin yang ada di platform',
            ],
            'roles' => AssignPermissionResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function edit(Role $role): Response
    {
        return Inertia::render('Admin/AssignPermissions/Edit', [
            'page_settings' => [
                'title' => 'Sinkronisasi Izin',
                'subtitle' => 'Sinkronisasi izin di sini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.assign-permissions.update', $role),
            ],
            'role' => $role->load(['permissions']),
            'permissions' => Permission::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn ($item) => [
                'label' => $item->name,
                'value' => $item->id,
            ]),
        ]);
    }

    public function update(Role $role, AssignPermissionRequest $request): RedirectResponse
    {
        try {
            $role->syncPermissions($request->permissions);
            flashMessage("berhasil menyinkronkan izin ke role {$role->name}");

            return to_route('admin.assign-permissions.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');

            return to_route('admin.assign-permissions.index');
        }
    }
}
