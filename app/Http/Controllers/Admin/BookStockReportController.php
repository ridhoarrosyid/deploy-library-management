<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StockRequest;
use App\Http\Resources\Admin\StockResource;
use App\Models\Stock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class BookStockReportController extends Controller
{
    public function index(): Response
    {
        $stocks = Stock::query()
            ->select(['stocks.id', 'book_id', 'total', 'available', 'loan', 'lost', 'damaged', 'stocks.created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/BookStockReports/Index', [
            'page_settings' => [
                'title' => 'Laporan Stock Buku',
                'subtitle' => 'Menampilkan laporan stok buku yang tersedia pada platform ini'
            ],
            'stocks' => StockResource::collection($stocks)->additional([
                'meta' => [
                    'has_pages' => $stocks->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ]
        ]);
    }

    public function edit(Stock $stock): Response
    {
        return Inertia::render('Admin/BookStockReports/Edit', [
            'page_settings' => [
                'title' => 'Edit Stok',
                'subtitle' => 'Edit stok di sini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.book-stock-reports.update', $stock)
            ],
            'stock' => $stock
        ]);
    }

    public function update(Stock $stock, StockRequest $request): RedirectResponse
    {
        try {
            $minimum_total = $request->available + $request->loan + $request->lost + $request->damaged;
            if ($request->total < $minimum_total) {
                flashMessage('Total tidak boleh lebih kecil dari peminjaman yang tersedia, hilang, rusak, dan dipinjam', 'error');
                return to_route('admin.book-stock-reports.index');
            }
            $stock->update([
                'total' => $request->total,
                'available' => $request->available,
            ]);
            flashMessage(MessageType::UPDATED->message('stok buku'));
            return to_route('admin.book-stock-reports.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.book-stock-reports.index');
        }
    }
}
