<?php

namespace App\Enums;

enum MessageType: string
{
    case CREATED = 'Berhasil menambahkan';
    case UPDATED = 'Berhasil memperbarui';
    case DELETED = 'Berhasil menghapus';
    case ERRORS = 'Terjadi kesalahan, Silakan coba lagi nanti';

    public function message(string $entity = '', ?string $error = null)
    {
        if ($this === self::ERRORS) {
            return "{$this->value} : {$error}";
        }

        return "{$this->value} {$entity}";
    }
}
