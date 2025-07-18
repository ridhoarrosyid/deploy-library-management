<?php

namespace App\Observers;

use App\Models\Book;

class BookObserver
{
    public function created(Book $book)
    {
        $book->stock()->create([
            'total' => request()->total,
            'available' => request()->total
        ]);
    }
}
