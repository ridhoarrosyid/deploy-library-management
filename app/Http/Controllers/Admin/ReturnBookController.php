<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\ReturnBookCondition;
use App\Enums\ReturnBookStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReturnBookRequest;
use App\Http\Resources\Admin\ReturnBookResource;
use App\Models\Fine;
use App\Models\FineSetting;
use App\Models\Loan;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ReturnBookController extends Controller
{
    public function index(): Response
    {
        $returnBooks = ReturnBook::query()
            ->select(['id', 'return_book_code', 'loan_id', 'book_id', 'status', 'user_id', 'return_date', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
            ->latest()
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/ReturnBooks/Index', [
            'page_settings' => [
                'title' => 'Pengembalian Buku',
                'subtitle' => 'Menampilkan seluruh data pengembalian buku yang ada di platform.'
            ],
            'return_books' => ReturnBookResource::collection($returnBooks)->additional([
                'meta' => [
                    'has_pages' => $returnBooks->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ],

        ]);
    }

    public function create(Loan $loan): Response | RedirectResponse
    {
        if ($loan->returnBook()->exists()) {
            return to_route('admin.loans.index');
        }

        if (!FineSetting::first()) {
            return to_route('admin.fine-settings.create');
        }

        return Inertia::render('Admin/ReturnBooks/Create', [
            'page_settings' => [
                'title' => 'Pengembalian',
                'subtitle' => 'Kembalikan buku yang dipinjam. Kembalikan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.return-books.store', $loan)
            ],
            'loan' => $loan->load([
                'user',
                'book' => fn($query) => $query->with(['publisher'])
            ]),
            'date' => [
                'return_date' => Carbon::now()->toDateString()
            ],
            'conditions' => ReturnBookCondition::options()
        ]);
    }

    public function store(Loan $loan, ReturnBookRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $return_book = $loan->returnBook()->create([
                'return_book_code' => str()->lower(str()->random(10)),
                'book_id' => $loan->book_id,
                'user_id' => $loan->user_id,
                'return_date' => Carbon::today()
            ]);
            $return_book_check = $return_book->returnBookCheck()->create([
                'condition' => $request->condition,
                'notes' => $request->notes
            ]);

            match ($return_book_check->condition->value) {
                ReturnBookCondition::GOOD->value => $return_book->book->stock_loan_return(),
                ReturnBookCondition::LOST->value => $return_book->book->stock_lost(),
                ReturnBookCondition::DAMAGED->value => $return_book->book->stock_damaged(),
                default => flashMessage('Kondisi buku tidak sesuai', 'error')
            };

            DB::commit();
            $isOnTime = $return_book->isOnTime();
            $daysLate = $return_book->getDaysLate();

            $fineData = $this->calculateFine($return_book, $return_book_check, FineSetting::first(), $daysLate);


            if ($isOnTime) {
                if ($fineData) {
                    flashMessage($fineData['message'], 'error');
                    return to_route('admin.fines.create', $return_book->return_book_code);
                }
                flashMessage('Berhasil mengembalikan buku');
                return to_route('admin.return-books.index');
            } else {
                if ($fineData) {
                    flashMessage($fineData['message'], 'error');
                    return to_route('admin.fines.create', $return_book->return_book_code);
                }
            }

            flashMessage('Berhasil mengembalikan buku');
            return to_route('admin.return-books.index');
        } catch (Throwable $e) {
            DB::rollBack();
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');
            return to_route('admin.return-books.index');
        }
    }

    private function createFine(ReturnBook $returnBook, float $lateFee, float $otherFee): Fine
    {
        return $returnBook->fine()->create([
            'user_id' => $returnBook->user_id,
            'late_fee' => $lateFee,
            'other_fee' => $otherFee,
            'total_fee' => $lateFee + $otherFee,
            'fine_date' => Carbon::today()
        ]);
    }

    private function calculateFine(ReturnBook $returnBook, ReturnBookCheck $returnBookCheck, FineSetting $fineSetting, int $daysLate): ?array
    {
        $late_fee = $fineSetting->late_fee_per_day * $daysLate;

        switch ($returnBookCheck->condition->value) {
            case ReturnBookCondition::DAMAGED->value:
                $other_fee = ($fineSetting->damage_fee_percentage / 100) * $returnBook->book->price;
                $returnBook->update([
                    'status' => ReturnBookStatus::FINE->value
                ]);
                $this->createFine($returnBook, $late_fee, $other_fee);
                return ['message' => "Kondisi buku rusak. Harus membayar denda kerusakan"];

            case ReturnBookCondition::LOST->value:
                $other_fee = ($fineSetting->lost_fee_percentage / 100) * $returnBook->book->price;
                $returnBook->update([
                    'status' => ReturnBookStatus::FINE->value
                ]);
                $this->createFine($returnBook, $late_fee, $other_fee);
                return ['message' => "Kondisi buku hilang. Harus membayar denda kehilangan"];

            default:
                if ($daysLate > 0) {
                    $returnBook->update([
                        'status' => ReturnBookStatus::FINE->value
                    ]);
                    $this->createFine($returnBook, $late_fee, 0);
                    return ['message' => 'Terlambat mengembalikan buku. Harus bayar denda keterlambatan'];
                } else {
                    $returnBook->update([
                        'status' => ReturnBookStatus::RETURNED->value
                    ]);
                    return null;
                }
        }
    }
}
