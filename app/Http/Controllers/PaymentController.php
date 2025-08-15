<?php

namespace App\Http\Controllers;

use App\Enums\FinePaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Http\Resources\Admin\TransactionReturnBookResource;
use App\Http\Resources\ReturnBookFrontSingleResource;
use App\Models\ReturnBook;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $return_book = ReturnBook::query()
            ->where('return_book_code', $request->order_id)
            ->with(['user', 'fine'])
            ->first();
        $return_book = new ReturnBookFrontSingleResource($return_book);

        $params = [
            'transaction_details' => [
                'order_id' => $return_book->return_book_code,
                'gross_amount' => $return_book->fine->total_fee,
            ],
            'customer_details' => [
                'first_name' => $return_book->user->name,
                'last_name' => '',
                'email' => $return_book->user->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            return response()->json([
                'snapToken' => $snapToken,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function callback(Request $request): JsonResponse
    {
        $serverKey = config('services.midtrans.server_key');
        $signatureKey = signatureMidtrans($request->order_id, $request->status_code, $request->gross_amount, $serverKey);
        if ($request->signature_key !== $signatureKey) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $return_book = ReturnBook::query()
            ->where('return_book_code', $request->order_id)
            ->first();

        if (! $return_book) {
            return response()->json([
                'error' => 'Pengembalian tidak ditemukan',
            ], 404);
        }

        if (! $return_book->fine) {
            return response()->json([
                'error' => 'Denda tidak ditemukan',
            ], 404);
        }

        switch ($request->transaction_status) {
            case 'settlement':
                $return_book->fine->payment_status = FinePaymentStatus::SUCCESS->value;
                $return_book->fine->save();
                $return_book->status = ReturnBookStatus::RETURNED->value;
                $return_book->save();

                return response()->json([
                    'message' => 'Berhasil melakukan pembayaran',
                ]);
            case 'capture':
                $return_book->fine->payment_status = FinePaymentStatus::SUCCESS->value;
                $return_book->fine->save();
                $return_book->status = ReturnBookStatus::RETURNED->value;
                $return_book->save();

                return response()->json([
                    'message' => 'Berhasil melakukan pembayaran',
                ]);

            case 'pending':
                $return_book->fine->payment_status = FinePaymentStatus::PENDING->value;
                $return_book->fine->save();

                return response()->json([
                    'message' => 'Pembayaran tertunda',
                ]);

            case 'expire':
                $return_book->fine->payment_status = FinePaymentStatus::FAILED->value;
                $return_book->fine->save();

                return response()->json([
                    'message' => 'Pembayaran kadaluarsa',
                ]);

            case 'cancel':
                $return_book->fine->payment_status = FinePaymentStatus::FAILED->value;
                $return_book->fine->save();

                return response()->json([
                    'message' => 'Pembayaran dibatalkan',
                ]);

            default:
                return response()->json([
                    'message' => 'Status transaksi tidak diketahui',
                ], 400);
        }
    }

    public function success(): Response
    {
        return Inertia::render('Payments/Success');
    }
}
