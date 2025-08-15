<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ReturnFineSingleResource;
use App\Models\ReturnBook;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FineController extends Controller
{
    public function create(ReturnBook $returnBook): Response|RedirectResponse
    {
        $return_book = new ReturnFineSingleResource($returnBook->load(['user', 'book', 'fine', 'loan', 'returnBookCheck']));

        if (! $return_book->fine) {
            flashMessage('Tidak ada denda di peminjaman ini', 'info');

            return to_route('admin.return-books.index');
        }

        return Inertia::render('Admin/Fines/Create', [
            'page_settings' => [
                'title' => 'Denda',
                'subtitle' => 'Selesaikan pembayaran denda terlebih dahulu',

            ],
            'return_book' => $return_book,
        ]);
    }
}
