---
id: model-stock-movement
blueprint: documentation
title: 'Model: StockMovement'
updated_by: system
updated_at: 1738675127
---
# Model: StockMovement

The StockMovement model provides a complete audit trail of all inventory changes. Every stock adjustment, reservation, fulfillment, or transfer is logged with timestamp, reason, and user information.

[TOC]

## Overview

A **StockMovement** records every inventory change:

```php
StockMovement {
    inventory_item_id: 1
    location_id: 5
    type: "adjustment_in"
    quantity: 50
    reason: "Received from supplier"
    user_id: 10
    reference_type: "PurchaseOrder"
    reference_id: 123
}
```

**Movement Types**:
- **adjustment_in** - Inventory increase
- **adjustment_out** - Inventory decrease
- **reservation** - Reserved for order
- **release** - Reservation cancelled
- **fulfillment** - Order fulfilled
- **transfer** - Location transfer
- **return** - Customer return
- **damage** - Damaged stock

---

## Database Schema

```php
Schema::create('stock_movements', function (Blueprint $table) {
    $table->id();

    // Inventory
    $table->foreignId('inventory_item_id')->constrained()->cascadeOnDelete();
    $table->foreignId('inventory_level_id')->nullable()->constrained()->cascadeOnDelete();
    $table->foreignId('location_id')->nullable()->constrained()->cascadeOnDelete();

    // Movement type
    $table->string('type'); // adjustment_in, adjustment_out, reservation, release, fulfillment, transfer, return, damage
    $table->integer('quantity'); // Positive or negative
    $table->text('reason')->nullable();

    // Before/After snapshots
    $table->integer('quantity_before')->nullable();
    $table->integer('quantity_after')->nullable();

    // Reference (what caused this movement)
    $table->string('reference_type')->nullable(); // Order, PurchaseOrder, Transfer, etc.
    $table->foreignId('reference_id')->nullable();

    // User who made the change
    $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

    // Transfer specific
    $table->foreignId('from_location_id')->nullable()->constrained('locations')->nullOnDelete();
    $table->foreignId('to_location_id')->nullable()->constrained('locations')->nullOnDelete();

    // Metadata
    $table->json('data')->nullable();

    $table->timestamps();

    // Indexes
    $table->index('inventory_item_id');
    $table->index('location_id');
    $table->index('type');
    $table->index(['reference_type', 'reference_id']);
    $table->index('user_id');
    $table->index('created_at');
});
```

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `bigint` | Primary key |
| `inventory_item_id` | `bigint` | InventoryItem ID (FK) |
| `inventory_level_id` | `bigint` | InventoryLevel ID (FK) |
| `location_id` | `bigint` | Location ID (FK) |
| `type` | `string` | Movement type |
| `quantity` | `integer` | Quantity changed |
| `reason` | `text` | Reason for change |
| `quantity_before` | `integer` | Quantity before |
| `quantity_after` | `integer` | Quantity after |
| `reference_type` | `string` | Related model type |
| `reference_id` | `bigint` | Related model ID |
| `user_id` | `bigint` | User who made change |
| `from_location_id` | `bigint` | Source location (transfers) |
| `to_location_id` | `bigint` | Target location (transfers) |
| `data` | `json` | Additional data |

---

## Relationships

```php
namespace Shopper\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class StockMovement extends Model
{
    protected $fillable = [
        'inventory_item_id',
        'inventory_level_id',
        'location_id',
        'type',
        'quantity',
        'reason',
        'quantity_before',
        'quantity_after',
        'reference_type',
        'reference_id',
        'user_id',
        'from_location_id',
        'to_location_id',
        'data',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'quantity_before' => 'integer',
        'quantity_after' => 'integer',
        'data' => 'array',
    ];

    // InventoryItem
    public function inventoryItem(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class);
    }

    // InventoryLevel
    public function inventoryLevel(): BelongsTo
    {
        return $this->belongsTo(InventoryLevel::class);
    }

    // Location
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    // From location (transfers)
    public function fromLocation(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'from_location_id');
    }

    // To location (transfers)
    public function toLocation(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'to_location_id');
    }

    // User
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

// By inventory item
public function scopeForItem($query, int $inventoryItemId)
{
    return $query->where('inventory_item_id', $inventoryItemId);
}

// By location
public function scopeAtLocation($query, int $locationId)
{
    return $query->where('location_id', $locationId);
}

// Recent movements
public function scopeRecent($query, int $days = 30)
{
    return $query->where('created_at', '>=', now()->subDays($days));
}

// Positive movements (increases)
public function scopeIncreases($query)
{
    return $query->where('quantity', '>', 0);
}

// Negative movements (decreases)
public function scopeDecreases($query)
{
    return $query->where('quantity', '<', 0);
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
// Is increase
public function getIsIncreaseAttribute(): bool
{
    return $this->quantity > 0;
}

// Is decrease
public function getIsDecreaseAttribute(): bool
{
    return $this->quantity < 0;
}

// Absolute quantity
public function getAbsoluteQuantityAttribute(): int
{
    return abs($this->quantity);
}

// Formatted type
public function getFormattedTypeAttribute(): string
{
    return str_replace('_', ' ', ucwords($this->type));
}

// Movement direction
public function getDirectionAttribute(): string
{
    return $this->quantity > 0 ? 'in' : 'out';
}
```

---

## Methods

### Create Movement

```php
public static function record(
    InventoryItem $item,
    string $type,
    int $quantity,
    ?string $reason = null,
    ?Location $location = null,
    ?User $user = null,
    ?Model $reference = null
): self
{
    $level = $location
        ? $item->levels()->where('location_id', $location->id)->first()
        : null;

    return self::create([
        'inventory_item_id' => $item->id,
        'inventory_level_id' => $level?->id,
        'location_id' => $location?->id,
        'type' => $type,
        'quantity' => $quantity,
        'reason' => $reason,
        'quantity_before' => $item->available_quantity,
        'quantity_after' => $item->available_quantity + $quantity,
        'reference_type' => $reference ? get_class($reference) : null,
        'reference_id' => $reference?->id,
        'user_id' => $user?->id ?? auth()->id(),
    ]);
}
```

### Record Transfer

```php
public static function recordTransfer(
    InventoryItem $item,
    Location $fromLocation,
    Location $toLocation,
    int $quantity,
    ?string $reason = null,
    ?User $user = null
): self
{
    return self::create([
        'inventory_item_id' => $item->id,
        'type' => 'transfer',
        'quantity' => $quantity,
        'reason' => $reason ?? "Transfer from {$fromLocation->name} to {$toLocation->name}",
        'from_location_id' => $fromLocation->id,
        'to_location_id' => $toLocation->id,
        'user_id' => $user?->id ?? auth()->id(),
    ]);
}
```

---

## REST API

### Get Stock Movements

```http
GET /api/v1/inventory-items/{item}/movements
```

**Query Parameters**:
- `type` - Filter by type
- `location_id` - Filter by location
- `from` - Start date
- `to` - End date
- `limit` - Results per page

**Response**:
```json
{
  "data": [
    {
      "id": 456,
      "type": "adjustment_in",
      "quantity": 50,
      "reason": "Received from supplier",
      "location": {
        "id": 5,
        "name": "Warehouse NYC"
      },
      "user": {
        "id": 10,
        "name": "John Doe"
      },
      "created_at": "2025-12-01T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 125
  }
}
```

### Get Movement History

```http
GET /api/v1/locations/{location}/movements
```

### Get Movement by Reference

```http
GET /api/v1/orders/{order}/stock-movements
```

---

## GraphQL API

```graphql
query {
  inventoryItem(id: 1) {
    movements(last: 30) {
      id
      type
      quantity
      reason
      quantityBefore
      quantityAfter
      location {
        name
      }
      user {
        name
      }
      createdAt
    }
  }
}

query {
  stockMovements(
    inventoryItemId: 1
    type: "adjustment_in"
    from: "2025-11-01"
    to: "2025-12-01"
  ) {
    id
    type
    quantity
    reason
    createdAt
  }
}
```

---

## Practical Examples

### Audit Inventory Changes

```php
use Shopper\Models\InventoryItem;

$item = InventoryItem::where('sku', 'TSH-BLU-L')->first();

$movements = $item->movements()
    ->with(['location', 'user'])
    ->recent(30)
    ->orderByDesc('created_at')
    ->get();

foreach ($movements as $movement) {
    echo "{$movement->created_at}: {$movement->formatted_type} ";
    echo "({$movement->quantity > 0 ? '+' : ''}{$movement->quantity}) ";
    echo "by {$movement->user->name} - {$movement->reason}\n";
}
```

### Generate Stock Report

```php
$startDate = now()->subMonth();
$endDate = now();

$report = StockMovement::forItem($itemId)
    ->betweenDates($startDate, $endDate)
    ->selectRaw('
        type,
        SUM(CASE WHEN quantity > 0 THEN quantity ELSE 0 END) as total_in,
        SUM(CASE WHEN quantity < 0 THEN ABS(quantity) ELSE 0 END) as total_out,
        COUNT(*) as movement_count
    ')
    ->groupBy('type')
    ->get();
```

### Track Order Fulfillment

```php
$order = Order::find(123);

$movements = StockMovement::where('reference_type', Order::class)
    ->where('reference_id', $order->id)
    ->with(['inventoryItem.variant', 'location'])
    ->get();

foreach ($movements as $movement) {
    echo "{$movement->inventoryItem->sku}: ";
    echo "{$movement->absolute_quantity} units ";
    echo "from {$movement->location->name}\n";
}
```

### Location Transfer History

```php
$location = Location::find(5);

$transfers = StockMovement::where('type', 'transfer')
    ->where(function ($q) use ($location) {
        $q->where('from_location_id', $location->id)
          ->orWhere('to_location_id', $location->id);
    })
    ->with(['inventoryItem', 'fromLocation', 'toLocation'])
    ->recent(7)
    ->get();

foreach ($transfers as $transfer) {
    $direction = $transfer->from_location_id === $location->id ? 'OUT' : 'IN';
    $otherLocation = $direction === 'OUT'
        ? $transfer->toLocation->name
        : $transfer->fromLocation->name;

    echo "{$direction}: {$transfer->absolute_quantity} units ";
    echo "({$transfer->inventoryItem->sku}) ";
    echo "to/from {$otherLocation}\n";
}
```

### Daily Stock Summary

```php
$date = today();

$summary = StockMovement::whereDate('created_at', $date)
    ->selectRaw('
        COUNT(*) as total_movements,
        SUM(CASE WHEN quantity > 0 THEN quantity ELSE 0 END) as total_in,
        SUM(CASE WHEN quantity < 0 THEN ABS(quantity) ELSE 0 END) as total_out,
        COUNT(DISTINCT inventory_item_id) as items_affected,
        COUNT(DISTINCT location_id) as locations_affected
    ')
    ->first();
```

---

## Performance Tips

### 1. Index Optimization

```sql
-- Composite index for common queries
CREATE INDEX idx_movements_item_date
ON stock_movements(inventory_item_id, created_at DESC);

-- Index for reference lookups
CREATE INDEX idx_movements_reference
ON stock_movements(reference_type, reference_id);
```

### 2. Partition by Date

```sql
-- For large datasets, partition by month
ALTER TABLE stock_movements
PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at));
```

### 3. Archive Old Movements

```php
// Archive movements older than 2 years
StockMovement::where('created_at', '<', now()->subYears(2))
    ->chunk(1000, function ($movements) {
        // Move to archive table
        DB::table('stock_movements_archive')->insert(
            $movements->toArray()
        );

        // Delete from main table
        StockMovement::whereIn('id', $movements->pluck('id'))->delete();
    });
```

---

## Related Documentation

- [InventoryItem Model](model-inventory-item)
- [InventoryLevel Model](model-inventory-level)
- [Location Model](model-location)
- [Inventory Management Guide](inventory-management)
- [REST API - Inventory](api-inventory)
