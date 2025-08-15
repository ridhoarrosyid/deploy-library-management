<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookFrontSingleResource;
use App\Http\Resources\CategoryFrontResource;
use App\Models\Book;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class BookFrontController extends Controller
{
    public function index(): Response
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->whereHas('books')
            ->with(['books' => fn ($query) => $query->limit(4)])
            ->latest('created_at')
            ->get();

        return Inertia::render('Front/Books/Index', [
            'page_settings' => [
                'title' => 'Buku',
                'subtitle' => 'Menampilkan semua buku yang ada di platform ini',
            ],
            'categories' => CategoryFrontResource::collection($categories),
        ]);
    }

    public function show(Book $book): Response
    {
        return Inertia::render('Front/Books/Show', [
            'page_settings' => [
                'title' => $book->title,
                'subtitle' => "Menampilkan detail informasi buku {$book->title}",

            ],
            'book' => new BookFrontSingleResource($book->load(['category', 'publisher', 'stock'])),
        ]);
    }
}
