---
id: model-discount
blueprint: documentation
title: 'Model: Discount'
updated_by: system
updated_at: 1738675127
---
# Model: Discount

The Discount model manages automatic discounts and promotional rules. Discounts are applied automatically when conditions are met, without requiring coupon codes.

[TOC]

## Overview

A **Discount** represents an automatic promotional rule:

```php
Discount {
    name: "Summer Sale 2025"
    type: "percentage"
    value: 20.00
    status: "active"
    conditions: {
        "min_purchase_amount": 100.00,
        "product_ids": [1, 2, 3],
        "customer_group_ids": [5]
    }
    starts_at: "2025-06-01"
    ends_at: "2025-08-31"
}
```

**Discount Types**:
- **Percentage** - 20% off
- **Fixed Amount** - $10 off
- **Buy X Get Y** - Buy 2 Get 1 Free
- **Free Shipping** - No shipping cost

---

## Database Schema

```php
Schema::create('discounts', function (Blueprint $table) {
    $table->id();

    // Basic info
    $table->string('name');
    $table->string('code')->unique()->nullable(); // Internal code
    $table->text('description')->nullable();

    // Type & Value
    $table->string('type'); // percentage, fixed_amount, buy_x_get_y, free_shipping
    $table->decimal('value', 15, 2)->default(0); // Percentage or amount
    $table->integer('applies_to_quantity')->default(1); // For buy_x_get_y

    // Scope
    $table->string('applies_to')->default('cart'); // cart, products, categories, collections, shipping
    $table->json('applies_to_ids')->nullable(); // Specific IDs

    // Context
    $table->json('site_ids')->nullable(); // Null = all sites
    $table->json('channel_ids')->nullable(); // Null = all channels
    $table->json('customer_group_ids')->nullable(); // Null = all customers

    // Conditions
    $table->json('conditions')->nullable();
    /*
    {
        "min_purchase_amount": 100.00,
        "min_quantity": 2,
        "product_ids": [1, 2, 3],
        "category_ids": [5, 6],
        "collection_ids": [10],
        "exclude_sale_items": true
    }
    */

    // Limits
    $table->integer('usage_limit')->nullable(); // Total uses allowed
    $table->integer('usage_limit_per_customer')->nullable();
    $table->integer('times_used')->default(0);

    // Priority
    $table->integer('priority')->default(0); // Higher = applied first
    $table->boolean('stackable')->default(false); // Can combine with others

    // Schedule
    $table->timestamp('starts_at')->nullable();
    $table->timestamp('ends_at')->nullable();

    // Status
    $table->string('status')->default('active'); // draft, active, scheduled, expired, disabled

    $table->timestamps();
    $table->softDeletes();

    // Indexes
    $table->index('code');
    $table->index('type');
    $table->index('status');
    $table->index(['starts_at', 'ends_at']);
    $table->index('priority');
});
```

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `bigint` | Primary key |
| `name` | `string` | Discount name |
| `code` | `string` | Internal code (unique) |
| `description` | `text` | Description |
| `type` | `string` | Discount type |
| `value` | `decimal` | Discount value |
| `applies_to_quantity` | `integer` | Buy X Get Y quantity |
| `applies_to` | `string` | What discount applies to |
| `applies_to_ids` | `json` | Specific IDs |
| `site_ids` | `json` | Applicable sites |
| `channel_ids` | `json` | Applicable channels |
| `customer_group_ids` | `json` | Applicable customer groups |
| `conditions` | `json` | Conditions to apply |
| `usage_limit` | `integer` | Total usage limit |
| `usage_limit_per_customer` | `integer` | Per-customer limit |
| `times_used` | `integer` | Times used |
| `priority` | `integer` | Priority order |
| `stackable` | `boolean` | Can stack with others |
| `starts_at` | `timestamp` | Start date |
| `ends_at` | `timestamp` | End date |
| `status` | `string` | Status |

---

## Relationships

```php
namespace Shopper\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discount extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'description',
        'type',
        'value',
        'applies_to_quantity',
        'applies_to',
        'applies_to_ids',
        'site_ids',
        'channel_ids',
        'customer_group_ids',
        'conditions',
        'usage_limit',
        'usage_limit_per_customer',
        'times_used',
        'priority',
        'stackable',
        'starts_at',
        'ends_at',
        'status',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'applies_to_quantity' => 'integer',
        'applies_to_ids' => 'array',
        'site_ids' => 'array',
        'channel_ids' => 'array',
        'customer_group_ids' => 'array',
        'conditions' => 'array',
        'usage_limit' => 'integer',
        'usage_limit_per_customer' => 'integer',
        'times_used' => 'integer',
        'priority' => 'integer',
        'stackable' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    // Usage records
    public function usages(): HasMany
    {
        return $this->hasMany(DiscountUsage::class);
    }
}
```

---

## Scopes

```php
// Active discounts
public function scopeActive($query)
{
    return $query->where('status', 'active')
        ->where(function ($q) {
            $q->whereNull('starts_at')
              ->orWhere('starts_at', '<=', now());
        })
        ->where(function ($q) {
            $q->whereNull('ends_at')
              ->orWhere('ends_at', '>=', now());
        })
        ->where(function ($q) {
            $q->whereNull('usage_limit')
              ->orWhereRaw('times_used < usage_limit');
        });
}

// For site
public function scopeForSite($query, int $siteId)
{
    return $query->where(function ($q) use ($siteId) {
        $q->whereNull('site_ids')
          ->orWhereJsonContains('site_ids', $siteId);
    });
}

// For channel
public function scopeForChannel($query, int $channelId)
{
    return $query->where(function ($q) use ($channelId) {
        $q->whereNull('channel_ids')
          ->orWhereJsonContains('channel_ids', $channelId);
    });
}

// For customer group
public function scopeForCustomerGroup($query, ?int $customerGroupId)
{
    return $query->where(function ($q) use ($customerGroupId) {
        $q->whereNull('customer_group_ids')
          ->orWhen($customerGroupId, fn($q) =>
              $q->whereJsonContains('customer_group_ids', $customerGroupId)
          );
    });
}

// By priority
public function scopeByPriority($query)
{
    return $query->orderByDesc('priority');
}
```

---

## Accessors & Mutators

```php
// Is currently active
public function getIsActiveAttribute(): bool
{
    if ($this->status !== 'active') {
        return false;
    }

    $now = now();

    if ($this->starts_at && $this->starts_at > $now) {
        return false;
    }

    if ($this->ends_at && $this->ends_at < $now) {
        return false;
    }

    if ($this->usage_limit && $this->times_used >= $this->usage_limit) {
        return false;
    }

    return true;
}

// Formatted value
public function getFormattedValueAttribute(): string
{
    return match($this->type) {
        'percentage' => "{$this->value}%",
        'fixed_amount' => money($this->value),
        'free_shipping' => 'Free Shipping',
        'buy_x_get_y' => "Buy {$this->applies_to_quantity} Get 1",
        default => (string) $this->value,
    };
}

// Is expired
public function getIsExpiredAttribute(): bool
{
    return $this->ends_at && $this->ends_at < now();
}

// Usage remaining
public function getUsageRemainingAttribute(): ?int
{
    if (!$this->usage_limit) {
        return null;
    }

    return max(0, $this->usage_limit - $this->times_used);
}
```

---

## Methods

### Check if Applicable

```php
public function isApplicableTo(Cart $cart, ?Customer $customer = null): bool
{
    // Check if active
    if (!$this->is_active) {
        return false;
    }

    // Check site
    if ($this->site_ids && !in_array($cart->site_id, $this->site_ids)) {
        return false;
    }

    // Check channel
    if ($this->channel_ids && !in_array($cart->channel_id, $this->channel_ids)) {
        return false;
    }

    // Check customer group
    if ($this->customer_group_ids && $customer) {
        if (!in_array($customer->customer_group_id, $this->customer_group_ids)) {
            return false;
        }
    }

    // Check usage limit per customer
    if ($customer && $this->usage_limit_per_customer) {
        $customerUsage = $this->usages()
            ->where('customer_id', $customer->id)
            ->count();

        if ($customerUsage >= $this->usage_limit_per_customer) {
            return false;
        }
    }

    // Check conditions
    return $this->checkConditions($cart);
}
```

### Check Conditions

```php
protected function checkConditions(Cart $cart): bool
{
    if (!$this->conditions) {
        return true;
    }

    // Min purchase amount
    if (isset($this->conditions['min_purchase_amount'])) {
        if ($cart->subtotal < $this->conditions['min_purchase_amount']) {
            return false;
        }
    }

    // Min quantity
    if (isset($this->conditions['min_quantity'])) {
        $totalQuantity = $cart->items->sum('quantity');
        if ($totalQuantity < $this->conditions['min_quantity']) {
            return false;
        }
    }

    // Specific products
    if (isset($this->conditions['product_ids'])) {
        $cartProductIds = $cart->items->pluck('variant.product_id')->unique();
        $hasProduct = $cartProductIds->intersect($this->conditions['product_ids'])->isNotEmpty();
        if (!$hasProduct) {
            return false;
        }
    }

    // Exclude sale items
    if ($this->conditions['exclude_sale_items'] ?? false) {
        $hasSaleItems = $cart->items->contains(fn($item) => $item->is_on_sale);
        if ($hasSaleItems) {
            return false;
        }
    }

    return true;
}
```

### Calculate Discount

```php
public function calculateFor(Cart $cart): float
{
    if (!$this->isApplicableTo($cart)) {
        return 0;
    }

    return match($this->type) {
        'percentage' => $this->calculatePercentage($cart),
        'fixed_amount' => $this->calculateFixedAmount($cart),
        'buy_x_get_y' => $this->calculateBuyXGetY($cart),
        'free_shipping' => $cart->shipping,
        default => 0,
    };
}

protected function calculatePercentage(Cart $cart): float
{
    $applicableAmount = $this->getApplicableAmount($cart);
    return $applicableAmount * ($this->value / 100);
}

protected function calculateFixedAmount(Cart $cart): float
{
    return min($this->value, $cart->subtotal);
}

protected function calculateBuyXGetY(Cart $cart): float
{
    // Get applicable items
    $items = $this->getApplicableItems($cart);

    $totalQuantity = $items->sum('quantity');
    $freeItems = floor($totalQuantity / ($this->applies_to_quantity + 1));

    // Get cheapest items to discount
    $sortedItems = $items->sortBy('price');
    $discount = 0;
    $remaining = $freeItems;

    foreach ($sortedItems as $item) {
        if ($remaining <= 0) break;

        $discountQty = min($remaining, $item->quantity);
        $discount += $item->price * $discountQty;
        $remaining -= $discountQty;
    }

    return $discount;
}

protected function getApplicableAmount(Cart $cart): float
{
    if ($this->applies_to === 'cart') {
        return $cart->subtotal;
    }

    return $this->getApplicableItems($cart)->sum('total');
}

protected function getApplicableItems(Cart $cart): Collection
{
    if ($this->applies_to === 'cart' || !$this->applies_to_ids) {
        return $cart->items;
    }

    return $cart->items->filter(function ($item) {
        return match($this->applies_to) {
            'products' => in_array($item->variant->product_id, $this->applies_to_ids),
            'categories' => $item->variant->product->categories->pluck('id')
                ->intersect($this->applies_to_ids)->isNotEmpty(),
            'collections' => $item->variant->product->collections->pluck('id')
                ->intersect($this->applies_to_ids)->isNotEmpty(),
            default => true,
        };
    });
}
```

### Apply to Cart

```php
public function applyTo(Cart $cart): void
{
    $amount = $this->calculateFor($cart);

    if ($amount > 0) {
        $cart->update([
            'discount' => $cart->discount + $amount,
        ]);

        // Record usage
        $this->increment('times_used');

        $this->usages()->create([
            'cart_id' => $cart->id,
            'customer_id' => $cart->customer_id,
            'discount_amount' => $amount,
        ]);
    }
}
```

---

## REST API

### Get Active Discounts

```http
GET /api/v1/discounts/active
```

**Query Parameters**:
- `site_id` - Filter by site
- `channel_id` - Filter by channel

### Check Applicable Discounts

```http
POST /api/v1/carts/{cart}/discounts/calculate
```

**Response**:
```json
{
  "discounts": [
    {
      "id": 5,
      "name": "Summer Sale 2025",
      "type": "percentage",
      "value": "20.00",
      "formatted_value": "20%",
      "discount_amount": "19.98"
    }
  ],
  "total_discount": "19.98"
}
```

---

## Related Documentation

- [Coupon Model](model-coupon)
- [Cart Model](model-cart)
- [Discounts & Coupons Guide](discounts-coupons)
- [REST API - Discounts](api-discounts)
