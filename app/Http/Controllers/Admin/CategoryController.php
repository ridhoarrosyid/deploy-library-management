<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\Admin\CategoryResourse;
use App\Models\Category;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CategoryController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->get();
        return Inertia::render('Admin/Categories/Index', [
            'categories' => CategoryResourse::collection($categories),
            'page_settings' => [
                'title' => 'Kategory',
                'subtitle' => 'Menampilkan semua kategory yang ada di platform ini'
            ]
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Create', [
            'page_settings' => [
                'title' => 'Tambah Kategori',
                'subtitle' => 'Buat kategori baru di sini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.categories.store')
            ]
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        try {
            Category::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'description' => $request->description,
                'cover' => $this->uploadFile($request, 'cover', 'categories')
            ]);

            flashMessage(MessageType::CREATED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.categories.index');
        }
    }
    public function edit()
    {
        return '';
    }
}
