<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AnnouncementRequest;
use App\Http\Resources\Admin\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AnnouncementController extends Controller
{
    public function index(): Response
    {
        $announcements = Announcement::query()
            ->select(['id', 'message', 'url', 'is_active', 'created_at'])
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Announcements/Index', [
            'page_settings' => [
                'title' => 'Pengumuman',
                'subtitile' => 'Menampilkan semua data pengumuman yang tersedia pada platform ini',
            ],
            'announcements' => AnnouncementResource::collection($announcements)->additional([
                'meta' => [
                    'has_pages' => $announcements->hasPages(),
                ],
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Announcements/Create', [
            'page_settings' => [
                'title' => 'Tambah Pengumuman',
                'subtitle' => 'Tambah pengumuman di sini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.announcements.create'),
            ],
        ]);
    }

    public function store(AnnouncementRequest $request): RedirectResponse
    {
        try {
            if ($request->is_active) {
                Announcement::where('is_active', true)->update(['is_active' => false]);
            }

            Announcement::create([
                'message' => $request->message,
                'url' => $request->url,
                'is_active' => $request->is_active,
            ]);

            flashMessage(MessageType::CREATED->message('Pengumuman'));

            return to_route('admin.announcements.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');

            return to_route('admin.announcements.index');
        }
    }

    public function edit(Announcement $announcement): Response
    {
        return Inertia::render('Admin/Announcements/Edit', [
            'page_settings' => [
                'title' => 'Edit Pengumuman',
                'subtitle' => 'Edit pengumuman di sini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.announcements.update', [$announcement]),
            ],
            'announcement' => $announcement,
        ]);
    }

    public function update(Announcement $announcement, AnnouncementRequest $request): RedirectResponse
    {
        try {
            if ($request->is_active) {
                Announcement::where('is_active', true)->where('id', '!=', $announcement->id)->update(['is_active' => false]);
            }

            $announcement->update([
                'message' => $request->message,
                'url' => $request->url,
                'is_active' => $request->is_active,
            ]);

            flashMessage(MessageType::UPDATED->message('Pengumuman'));

            return to_route('admin.announcements.index');
        } catch (Throwable $e) {
            dd($e);
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');

            return to_route('admin.announcements.index');
        }
    }

    public function destroy(Announcement $announcement): RedirectResponse
    {
        try {
            $announcement->delete();
            flashMessage(MessageType::DELETED->message('Pengumuman'));

            return to_route('admin.announcements.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');

            return to_route('admin.announcements.index');
        }
    }
}
