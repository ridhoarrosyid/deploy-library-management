<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\LoanStatisticResource;
use App\Models\Book;
use App\Models\Loan;
use Inertia\Inertia;
use Inertia\Response;

class LoanStatisticController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/LoanStatistics/Index', [
            'page_settings' => [
                'title' => 'Statistik Peminjaman',
                'subtitle' => 'Menampilkan semua statistik peminjaman yang ada di platform ini',
            ],
            'page_data' => [
                'least_loan_books' => LoanStatisticResource::collection(Book::leastLoanBooks(5)),
                'most_loan_books' => LoanStatisticResource::collection(Book::mostLoanBooks(5)),
                'total_loans' => Loan::totalLoanBooks(),
            ],
        ]);
    }
}
