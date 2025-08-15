<?php

namespace App\Models;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use App\Observers\BookObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[ObservedBy(BookObserver::class)]

class Book extends Model
{
    protected $fillable = [
        'book_code',
        'title',
        'slug',
        'author',
        'publication_year',
        'isbn',
        'language',
        'synopsis',
        'number_of_pages',
        'status',
        'cover',
        'price',
        'category_id',
        'publisher_id',
    ];

    public static function leastLoanBooks($limit = 5)
    {
        return self::query()
            ->select(['id', 'title', 'author'])
            ->withCount('loans')
            ->orderBy('loans_count')
            ->limit($limit)
            ->get();
    }

    public static function mostLoanBooks($limit = 5)
    {
        return self::query()
            ->select(['id', 'title', 'author'])
            ->withCount('loans')
            ->orderBy('loans_count', 'desc')
            ->limit($limit)
            ->get();
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function stock(): HasOne
    {
        return $this->hasOne(Stock::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->whereAny(['book_code', 'title', 'slug', 'author', 'publication_year', 'isbn', 'language', 'status'], 'REGEXP', $search);
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['direction'] ?? null && $query['field'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }

    public function updateStock($columnToIncrement, $columnToDecrement)
    {
        if ($this->stock->$columnToDecrement > 0) {
            return $this->stock()->update([
                $columnToIncrement => $this->stock->$columnToIncrement + 1,
                $columnToDecrement => $this->stock->$columnToDecrement - 1,
            ]);
        }

        return false;
    }

    public function stock_loan()
    {
        return $this->updateStock('loan', 'available');
    }

    public function stock_lost()
    {
        return $this->updateStock('lost', 'loan');
    }

    public function stock_damaged()
    {
        return $this->updateStock('damaged', 'loan');
    }

    public function stock_loan_return()
    {
        return $this->updateStock('available', 'loan');
    }

    protected function casts(): array
    {
        return [
            'language' => BookLanguage::class,
            'status' => BookStatus::class,
        ];
    }
}
