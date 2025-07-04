<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PublisherRequest;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class PublisherController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $publishers = Publisher::query()
            ->select(['id', 'name', 'address', 'email', 'phone', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        return Inertia::render('Admin/Publishers/Index', [
            'page_settings' => [
                'title' => 'Penerbit',
                'subtitle' => 'Menampilkan semua data penerbit yang ada di platform ini'
            ],
            'publishers' => PublisherResource::collection($publishers)->additional([
                'meta' => [
                    'has_pages' => $publishers->hasPages()
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
        return Inertia::render('Admin/Publishers/Create', [
            'page_settings' => [
                'title' => 'Tambah Penerbit',
                'subtitle' => 'Buat penerbit baru di sini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.publishers.store')
            ]
        ]);
    }

    public function store(PublisherRequest $request): RedirectResponse
    {
        try {
            Publisher::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->uploadFile($request, 'logo', 'publisher')
            ]);

            flashMessage(MessageType::CREATED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.publishers.index');
        }
    }

    public function edit(Publisher $publisher): Response
    {
        return Inertia::render('Admin/Publishers/Edit', [
            'page_settings' => [
                'title' => 'Edit',
                'subtitle' => 'Edit data penerbit. Tekan simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.publishers.update', $publisher)
            ],
            'publisher' => $publisher
        ]);
    }

    public function update(Publisher $publisher, PublisherRequest $request): RedirectResponse
    {
        try {
            $publisher->update([
                'name' => $name = $request->name,
                'slug' => $publisher->name !== $name ?  str()->lower(str()->slug($name) . str()->random(4)) : $publisher->name,
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->updateFile($request, $publisher, 'logo', 'publisher')
            ]);

            flashMessage(MessageType::UPDATED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.publishers.index');
        }
    }

    public function destroy(Publisher $publisher): RedirectResponse
    {
        try {
            $this->deleteFile($publisher, 'logo');
            $publisher->delete();
            flashMessage(MessageType::DELETED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.publishers.index');
        }
    }
}
