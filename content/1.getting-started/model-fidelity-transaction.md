---
id: model-fidelity-transaction
blueprint: documentation
title: 'Model: FidelityTransaction'
updated_by: system
updated_at: 1738675127
---
# Model: FidelityTransaction

The FidelityTransaction model provides a complete audit trail of all loyalty point changes. Every earn, redeem, expiry, or adjustment is logged for full transparency and reporting.

[TOC]

## Overview

A **FidelityTransaction** records every point change:

```php
FidelityTransaction {
    fidelity_card_id: 15
    type: "earn"
    points: 100
    balance_before: 5320
    balance_after: 5420
    reason: "Order #123 completed"
    order_id: 123
    status: "completed"
}
```

**Transaction Types**:
- **earn** - Points earned
- **redeem** - Points spent
- **adjustment** - Manual adjustment
- **expiry** - Points expired
- **refund** - Points refunded
- **bonus** - Bonus points
- **penalty** - Points deducted

---

## Database Schema

```php
Schema::create('fidelity_transactions', function (Blueprint $table) {
    $table->id();

    // Fidelity card
    $table->foreignId('fidelity_card_id')->constrained()->cascadeOnDelete();
    $table->foreignId('customer_id')->constrained()->cascadeOnDelete();

    // Transaction type
    $table->string('type'); // earn, redeem, adjustment, expiry, refund, bonus, penalty
    $table->integer('points'); // Positive for earn, negative for redeem

    // Balance tracking
    $table->integer('balance_before');
    $table->integer('balance_after');

    // Reason & reference
    $table->text('reason');
    $table->foreignId('order_id')->nullable()->constrained()->nullOnDelete();
    $table->string('reference_type')->nullable();
    $table->foreignId('reference_id')->nullable();

    // Status
    $table->string('status')->default('completed'); // pending, completed, cancelled, expired

    // Expiry
    $table->timestamp('expires_at')->nullable();
    $table->timestamp('expired_at')->nullable();

    // User who made the change (for manual adjustments)
    $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

    // Metadata
    $table->json('data')->nullable();

    $table->timestamps();

    // Indexes
    $table->index('fidelity_card_id');
    $table->index('customer_id');
    $table->index('type');
    $table->index('status');
    $table->index('order_id');
    $table->index(['reference_type', 'reference_id']);
    $table->index('created_at');
    $table->index('expires_at');
});
```

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `bigint` | Primary key |
| `fidelity_card_id` | `bigint` | FidelityCard ID (FK) |
| `customer_id` | `bigint` | Customer ID (FK) |
| `type` | `string` | Transaction type |
| `points` | `integer` | Points changed |
| `balance_before` | `integer` | Balance before |
| `balance_after` | `integer` | Balance after |
| `reason` | `text` | Transaction reason |
| `order_id` | `bigint` | Order ID (FK) |
| `reference_type` | `string` | Reference model type |
| `reference_id` | `bigint` | Reference model ID |
| `status` | `string` | Transaction status |
| `expires_at` | `timestamp` | Point expiry date |
| `expired_at` | `timestamp` | When expired |
| `user_id` | `bigint` | User who created (manual) |
| `data` | `json` | Additional data |

---

## Relationships

```php
namespace Shopper\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class FidelityTransaction extends Model
{
    protected $fillable = [
        'fidelity_card_id',
        'customer_id',
        'type',
        'points',
        'balance_before',
        'balance_after',
        'reason',
        'order_id',
        'reference_type',
        'reference_id',
        'status',
        'expires_at',
        'expired_at',
        'user_id',
        'data',
    ];

    protected $casts = [
        'points' => 'integer',
        'balance_before' => 'integer',
        'balance_after' => 'integer',
        'expires_at' => 'datetime',
        'expired_at' => 'datetime',
        'data' => 'array',
    ];

    // Fidelity card
    public function fidelityCard(): BelongsTo
    {
        return $this->belongsTo(FidelityCard::class);
    }

    // Customer
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    // Order
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    // User (for manual adjustments)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Reference (polymorphic)
    public function reference(): MorphTo
    {
        return $this->morphTo();
    }
}
```

---

## Scopes

```php
// By type
public function scopeOfType($query, string $type)
{
    return $query->where('type', $type);
}

// Earned points
public function scopeEarned($query)
{
    return $query->where('type', 'earn')
        ->where('points', '>', 0);
}

// Redeemed points
public function scopeRedeemed($query)
{
    return $query->where('type', 'redeem')
        ->where('points', '<', 0);
}

// Completed
public function scopeCompleted($query)
{
    return $query->where('status', 'completed');
}

// Pending
public function scopePending($query)
{
    return $query->where('status', 'pending');
}

// Expiring soon
public function scopeExpiringSoon($query, int $days = 30)
{
    return $query->where('type', 'earn')
        ->where('status', 'completed')
        ->whereNull('expired_at')
        ->where('expires_at', '<=', now()->addDays($days))
        ->where('expires_at', '>', now());
}

// Expired
public function scopeExpired($query)
{
    return $query->whereNotNull('expired_at');
}

// Recent
public function scopeRecent($query, int $days = 30)
{
    return $query->where('created_at', '>=', now()->subDays($days));
}

// By date range
public function scopeBetweenDates($query, $startDate, $endDate)
{
    return $query->whereBetween('created_at', [$startDate, $endDate]);
}
```

---

## Accessors & Mutators

```php
// Is earn
public function getIsEarnAttribute(): bool
{
    return $this->points > 0;
}

// Is redeem
public function getIsRedeemAttribute(): bool
{
    return $this->points < 0;
}

// Absolute points
public function getAbsolutePointsAttribute(): int
{
    return abs($this->points);
}

// Is expired
public function getIsExpiredAttribute(): bool
{
    return $this->expired_at !== null;
}

// Days until expiry
public function getDaysUntilExpiryAttribute(): ?int
{
    if (!$this->expires_at || $this->is_expired) {
        return null;
    }

    return max(0, now()->diffInDays($this->expires_at, false));
}

// Points value in currency
public function getPointsValueAttribute(): float
{
    $pointsPerCurrency = config('shopper.fidelity.points_per_currency', 100);
    return $this->absolute_points / $pointsPerCurrency;
}

// Formatted type
public function getFormattedTypeAttribute(): string
{
    return ucfirst($this->type);
}
```

---

## Methods

### Create Earn Transaction

```php
public static function createEarn(
    FidelityCard $card,
    int $points,
    string $reason,
    ?Order $order = null,
    bool $pending = false
): self
{
    $expiryMonths = config('shopper.fidelity.points_expiry_months', 12);

    return self::create([
        'fidelity_card_id' => $card->id,
        'customer_id' => $card->customer_id,
        'type' => 'earn',
        'points' => $points,
        'balance_before' => $card->points_balance,
        'balance_after' => $card->points_balance + ($pending ? 0 : $points),
        'reason' => $reason,
        'order_id' => $order?->id,
        'status' => $pending ? 'pending' : 'completed',
        'expires_at' => now()->addMonths($expiryMonths),
    ]);
}
```

### Create Redeem Transaction

```php
public static function createRedeem(
    FidelityCard $card,
    int $points,
    string $reason,
    ?Order $order = null
): self
{
    return self::create([
        'fidelity_card_id' => $card->id,
        'customer_id' => $card->customer_id,
        'type' => 'redeem',
        'points' => -$points,
        'balance_before' => $card->points_balance,
        'balance_after' => $card->points_balance - $points,
        'reason' => $reason,
        'order_id' => $order?->id,
        'status' => 'completed',
    ]);
}
```

### Confirm Pending

```php
public function confirm(): void
{
    if ($this->status !== 'pending') {
        throw new \Exception('Only pending transactions can be confirmed');
    }

    $this->update([
        'status' => 'completed',
        'balance_after' => $this->balance_before + $this->points,
    ]);

    // Update card balance
    $this->fidelityCard->increment('points_balance', $this->points);
    $this->fidelityCard->increment('points_lifetime', $this->points);
    $this->fidelityCard->decrement('points_pending', $this->points);
}
```

### Cancel Transaction

```php
public function cancel(string $reason = null): void
{
    if ($this->status === 'cancelled') {
        return;
    }

    $this->update([
        'status' => 'cancelled',
        'data' => array_merge($this->data ?? [], [
            'cancellation_reason' => $reason,
            'cancelled_at' => now()->toDateTimeString(),
        ]),
    ]);

    // Reverse points if completed
    if ($this->status === 'completed') {
        if ($this->points > 0) {
            $this->fidelityCard->decrement('points_balance', $this->points);
            $this->fidelityCard->decrement('points_lifetime', $this->points);
        } else {
            $this->fidelityCard->increment('points_balance', abs($this->points));
        }
    }
}
```

---

## Events

```php
use Shopper\Events\PointsEarned;
use Shopper\Events\PointsRedeemed;
use Shopper\Events\PointsExpiring;

protected static function booted()
{
    static::created(function (FidelityTransaction $transaction) {
        if ($transaction->status === 'completed') {
            if ($transaction->is_earn) {
                event(new PointsEarned($transaction));
            } elseif ($transaction->is_redeem) {
                event(new PointsRedeemed($transaction));
            }
        }
    });
}
```

---

## REST API

### Get Transactions

```http
GET /api/v1/fidelity-cards/{card}/transactions
```

**Query Parameters**:
- `type` - Filter by type
- `status` - Filter by status
- `from` - Start date
- `to` - End date

**Response**:
```json
{
  "data": [
    {
      "id": 456,
      "type": "earn",
      "points": 100,
      "balance_before": 5320,
      "balance_after": 5420,
      "reason": "Order #123 completed",
      "status": "completed",
      "expires_at": "2026-12-01T00:00:00Z",
      "created_at": "2025-12-01T10:00:00Z"
    }
  ],
  "meta": {
    "total_earned": 12850,
    "total_redeemed": 7430,
    "current_balance": 5420
  }
}
```

### Get Transaction Details

```http
GET /api/v1/fidelity-transactions/{id}
```

---

## GraphQL API

```graphql
query {
  fidelityCard(id: 15) {
    transactions(first: 20, orderBy: {field: CREATED_AT, order: DESC}) {
      edges {
        node {
          id
          type
          points
          balanceBefore
          balanceAfter
          reason
          status
          expiresAt
          daysUntilExpiry
          createdAt
        }
      }
    }
  }
}

query {
  fidelityTransactions(
    cardId: 15
    type: "earn"
    status: "completed"
    from: "2025-11-01"
    to: "2025-12-01"
  ) {
    id
    points
    reason
    createdAt
  }
}
```

---

## Practical Examples

### Points Earned from Order

```php
use Shopper\Models\Order;
use Shopper\Models\FidelityCard;

$order = Order::find(123);
$card = $order->customer->fidelityCard;

if ($card && $order->status === 'completed') {
    $points = $card->calculatePointsFromOrder($order);

    FidelityTransaction::createEarn(
        card: $card,
        points: $points,
        reason: "Order #{$order->order_number} completed",
        order: $order,
        pending: false
    );
}
```

### Points Redeemed for Discount

```php
$card = FidelityCard::find(15);
$pointsToRedeem = 500;
$discountValue = $pointsToRedeem / 100; // 1 point = 0.01€

if ($card->points_balance >= $pointsToRedeem) {
    FidelityTransaction::createRedeem(
        card: $card,
        points: $pointsToRedeem,
        reason: "Discount applied to order #{$order->order_number}",
        order: $order
    );

    $order->update([
        'discount' => $order->discount + $discountValue,
    ]);
}
```

### Transaction History Report

```php
$card = FidelityCard::find(15);
$startDate = now()->subYear();
$endDate = now();

$report = $card->transactions()
    ->completed()
    ->betweenDates($startDate, $endDate)
    ->selectRaw('
        type,
        SUM(CASE WHEN points > 0 THEN points ELSE 0 END) as total_earned,
        SUM(CASE WHEN points < 0 THEN ABS(points) ELSE 0 END) as total_redeemed,
        COUNT(*) as transaction_count
    ')
    ->groupBy('type')
    ->get();
```

### Expire Old Points

```php
use Shopper\Jobs\ExpirePointsJob;

// Run daily to expire old points
$cards = FidelityCard::active()->get();

foreach ($cards as $card) {
    ExpirePointsJob::dispatch($card);
}

// In ExpirePointsJob
public function handle()
{
    $transactions = FidelityTransaction::where('fidelity_card_id', $this->card->id)
        ->where('type', 'earn')
        ->where('status', 'completed')
        ->where('expires_at', '<=', now())
        ->whereNull('expired_at')
        ->get();

    foreach ($transactions as $transaction) {
        $transaction->update(['expired_at' => now()]);

        $this->card->transactions()->create([
            'type' => 'expiry',
            'points' => -$transaction->points,
            'balance_before' => $this->card->points_balance,
            'balance_after' => $this->card->points_balance - $transaction->points,
            'reason' => "Points from {$transaction->created_at->format('Y-m-d')} expired",
            'status' => 'completed',
        ]);

        $this->card->decrement('points_balance', $transaction->points);
    }
}
```

### Points Summary

```php
$card = FidelityCard::find(15);

$summary = [
    'current_balance' => $card->points_balance,
    'lifetime_earned' => $card->transactions()->earned()->sum('points'),
    'lifetime_redeemed' => abs($card->transactions()->redeemed()->sum('points')),
    'pending' => $card->transactions()->pending()->sum('points'),
    'expiring_soon' => $card->transactions()->expiringSoon(30)->sum('points'),
    'transactions_count' => $card->transactions()->count(),
    'last_activity' => $card->transactions()->latest()->first()?->created_at,
];
```

---

## Performance Tips

### 1. Index Optimization

```sql
-- Composite index for common queries
CREATE INDEX idx_fidelity_transactions_card_date
ON fidelity_transactions(fidelity_card_id, created_at DESC);

-- Index for expiry checks
CREATE INDEX idx_fidelity_transactions_expiry
ON fidelity_transactions(expires_at, expired_at, status);
```

### 2. Archive Old Transactions

```php
// Archive transactions older than 2 years
FidelityTransaction::where('created_at', '<', now()->subYears(2))
    ->where('status', '!=', 'pending')
    ->chunk(1000, function ($transactions) {
        DB::table('fidelity_transactions_archive')->insert(
            $transactions->toArray()
        );

        FidelityTransaction::whereIn('id', $transactions->pluck('id'))->delete();
    });
```

---

## Related Documentation

- [FidelityCard Model](model-fidelity-card)
- [Customer Model](model-customer)
- [Order Model](model-order)
- [Fidelity System Guide](fidelity-system)
- [REST API - Fidelity](api-fidelity)
