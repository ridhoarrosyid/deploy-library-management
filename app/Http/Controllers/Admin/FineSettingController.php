<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FineSettingRequest;
use App\Models\FineSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class FineSettingController extends Controller
{
    public function create(): Response
    {
        $fine_setting = FineSetting::first();

        return Inertia::render('Admin/FineSettings/Create', [
            'page_settings' => [
                'title' => 'Pengaturan denda',
                'subtitle' => 'Konfigurasi pengaturan denda di sini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.fine-settings.store'),
            ],
            'fine_setting' => $fine_setting,
        ]);
    }

    public function store(FineSettingRequest $request): RedirectResponse
    {
        try {
            FineSetting::updateOrCreate([
                'late_fee_per_day' => $request->late_fee_per_day,
                'damage_fee_percentage' => $request->damage_fee_percentage,
                'lost_fee_percentage' => $request->lost_fee_percentage,
            ]);
            flashMessage('Berhasil melakukan perubahan denda');

            return to_route('admin.fine-settings.create');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERRORS->message(error: $e->getMessage()), 'error');

            return to_route('admin.fine-settings.create');
        }
    }
}
