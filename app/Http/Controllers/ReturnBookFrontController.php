<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReturnBookFrontResource;
use App\Http\Resources\ReturnBookFrontSingleResource;
use App\Models\Book;
use App\Models\Loan;
use App\Models\ReturnBook;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReturnBookFrontController extends Controller
{
    public function index(): Response
    {
        $returnBooks = ReturnBook::query()
            ->select(['id', 'return_book_code', 'loan_id', 'book_id', 'status', 'user_id', 'return_date', 'created_at'])
            ->where('user_id', auth()->user()->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
            ->latest()
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('Front/ReturnBooks/Index', [
            'page_settings' => [
                'title' => 'Pengembalian Buku',
                'subtitle' => 'Menampilkan seluruh data pengembalian buku Anda yang ada di platform.'
            ],
            'return_books' => ReturnBookFrontResource::collection($returnBooks)->additional([
                'meta' => [
                    'has_pages' => $returnBooks->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ],
            'page_data' => [
                'returned' => ReturnBook::query()->member(auth()->user()->id)->returned()->count(),
                'fine' => ReturnBook::query()->member(auth()->user()->id)->fine()->count(),
                'checked' => ReturnBook::query()->member(auth()->user()->id)->checked()->count(),

            ]

        ]);
    }

    public function store(Book $book, Loan $loan): RedirectResponse
    {
        $return_book = $loan->returnBook()->create([
            'return_book_code' => str()->lower(str()->random(10)),
            'book_id' => $book->id,
            'user_id' => auth()->user()->id,
            'return_date' => Carbon::today()
        ]);

        flashMessage('Buku Anda sedang dilakukan pengecekan oleh petugas kami.');
        return to_route('front.return-books.show', [$return_book->return_book_code]);
    }

    public function show(ReturnBook $return_book): Response
    {
        return Inertia::render('Front/ReturnBooks/Show', [
            'page_settings' => [
                'title' => 'Detail Pengembailan Buku',
                'subtitle' => 'Dapat melihat detail pengembalian buku yang Anda kembalikan'
            ],
            'return_book' => new ReturnBookFrontSingleResource($return_book->load(['book', 'user', 'loan', 'fine', 'returnBookCheck']))
        ]);
    }
}
