<?php

namespace App\Http\Controllers;

use App\Http\Resources\FineFrontResource;
use App\Models\Fine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FineFrontController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $fines = Fine::query()
            ->select(['id', 'return_book_id', 'user_id', 'late_fee', 'other_fee', 'total_fee', 'fine_date', 'payment_status', 'created_at'])
            ->with(['user', 'returnBook'])
            ->where('user_id', auth()->user()->id)
            ->paginate(10)
            ->withQueryString();
        return Inertia::render('Front/Fines/Index', [
            'page_settings' => [
                'title' => 'Laporan Denda',
                'subtitle' => 'Menampilkan laporan denda Anda yang ada di platform ini.'
            ],
            'fines' => FineFrontResource::collection($fines)->additional([
                'meta' => [
                    'has_pages' => $fines->hasPages()
                ]
            ]),
        ]);
    }
}
