---
id: model-cart-item
blueprint: documentation
title: 'Model: CartItem'
updated_by: system
updated_at: 1738675127
---
# Model: CartItem

The CartItem model represents individual products in a shopping cart. Each item tracks quantity, pricing, and customizations.

[TOC]

## Overview

A **CartItem** is a line item in a cart, connecting a ProductVariant to a Cart with quantity and price information:

```php
CartItem {
    cart_id: 15
    product_variant_id: 245
    quantity: 2
    price: 49.99
    compare_at_price: 59.99
    total: 99.98
    data: {
        "gift_wrap": true,
        "gift_message": "Happy Birthday!"
    }
}
```

**Key Responsibilities**:
- Track quantity per variant
- Store price snapshot at add-to-cart time
- Calculate line item total
- Handle custom data (gift options, personalizations)
- Validate stock availability

---

## Database Schema

```php
Schema::create('cart_items', function (Blueprint $table) {
    $table->id();

    // Relationships
    $table->foreignId('cart_id')->constrained()->cascadeOnDelete();
    $table->foreignId('product_variant_id')->constrained()->cascadeOnDelete();

    // Quantity
    $table->integer('quantity')->default(1);

    // Pricing (snapshot at add-to-cart time)
    $table->decimal('price', 15, 2);
    $table->decimal('compare_at_price', 15, 2)->nullable();
    $table->decimal('total', 15, 2);

    // Discounts
    $table->decimal('discount', 15, 2)->default(0);
    $table->foreignId('discount_id')->nullable()->constrained()->nullOnDelete();

    // Customization
    $table->json('data')->nullable(); // Custom fields, gift options, etc.
    $table->text('notes')->nullable();

    $table->timestamps();

    // Indexes
    $table->index('cart_id');
    $table->index('product_variant_id');
    $table->unique(['cart_id', 'product_variant_id']); // One item per variant per cart
});
```

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `bigint` | Primary key |
| `cart_id` | `bigint` | Cart ID (FK) |
| `product_variant_id` | `bigint` | ProductVariant ID (FK) |
| `quantity` | `integer` | Quantity ordered |
| `price` | `decimal` | Unit price (snapshot) |
| `compare_at_price` | `decimal` | Compare price (snapshot) |
| `total` | `decimal` | Line total (price × quantity - discount) |
| `discount` | `decimal` | Discount amount |
| `discount_id` | `bigint` | Applied discount (FK) |
| `data` | `json` | Custom data |
| `notes` | `text` | Customer notes |
| `created_at` | `timestamp` | Creation time |
| `updated_at` | `timestamp` | Last update |

---

## Relationships

```php
namespace Shopper\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_variant_id',
        'quantity',
        'price',
        'compare_at_price',
        'total',
        'discount',
        'discount_id',
        'data',
        'notes',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
        'compare_at_price' => 'decimal:2',
        'total' => 'decimal:2',
        'discount' => 'decimal:2',
        'data' => 'array',
    ];

    // Cart
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    // ProductVariant
    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }

    // Discount
    public function discount(): BelongsTo
    {
        return $this->belongsTo(Discount::class);
    }
}
```

**Usage**:
```php
// Get variant
$variant = $item->variant;
$product = $variant->product;

// Get cart
$cart = $item->cart;

// Get applied discount
$discount = $item->discount;
```

---

## Accessors & Mutators

```php
// Line item savings
public function getSavingsAttribute(): float
{
    if (!$this->compare_at_price) {
        return 0;
    }

    return ($this->compare_at_price - $this->price) * $this->quantity + $this->discount;
}

// Is on sale
public function getIsOnSaleAttribute(): bool
{
    return $this->compare_at_price && $this->price < $this->compare_at_price;
}

// Display name
public function getNameAttribute(): string
{
    return $this->variant->display_name ?? $this->variant->product->name;
}

// Display SKU
public function getSkuAttribute(): string
{
    return $this->variant->sku;
}

// Weight total
public function getTotalWeightAttribute(): float
{
    return ($this->variant->weight ?? 0) * $this->quantity;
}
```

**Usage**:
```php
$savings = $item->savings; // 20.00
$onSale = $item->is_on_sale; // true
$name = $item->name; // "T-Shirt - Blue / Large"
$totalWeight = $item->total_weight; // 1000 (grams)
```

---

## Methods

### Update Quantity

```php
public function updateQuantity(int $quantity): void
{
    if ($quantity <= 0) {
        $this->delete();
        return;
    }

    // Check stock availability
    if (!$this->variant->isAvailable($quantity)) {
        throw new InsufficientStockException(
            "Only {$this->variant->available_quantity} units available"
        );
    }

    $this->quantity = $quantity;
    $this->calculateTotal();
    $this->save();

    // Recalculate cart totals
    $this->cart->calculate();
}
```

### Calculate Total

```php
public function calculateTotal(): void
{
    $subtotal = $this->price * $this->quantity;
    $this->total = $subtotal - abs($this->discount);
}
```

### Apply Discount

```php
public function applyDiscount(Discount $discount): void
{
    $amount = $discount->calculateFor($this);

    $this->update([
        'discount_id' => $discount->id,
        'discount' => $amount,
    ]);

    $this->calculateTotal();
}
```

### Check Availability

```php
public function checkAvailability(): bool
{
    return $this->variant->isAvailable($this->quantity);
}
```

### Convert to Order Item

```php
public function convertToOrderItem(Order $order): OrderItem
{
    return OrderItem::create([
        'order_id' => $order->id,
        'product_variant_id' => $this->product_variant_id,
        'quantity' => $this->quantity,
        'price' => $this->price,
        'compare_at_price' => $this->compare_at_price,
        'total' => $this->total,
        'discount' => $this->discount,
        'discount_id' => $this->discount_id,
        'data' => $this->data,
        'notes' => $this->notes,
    ]);
}
```

---

## Events

### Model Events

```php
protected static function booted()
{
    // Recalculate total on save
    static::saving(function (CartItem $item) {
        $item->calculateTotal();
    });

    // Update cart totals after save
    static::saved(function (CartItem $item) {
        $item->cart->calculate();
    });

    // Update cart totals after delete
    static::deleted(function (CartItem $item) {
        $item->cart->calculate();
    });
}
```

### Custom Events

```php
use Shopper\Events\CartItemAdded;
use Shopper\Events\CartItemUpdated;
use Shopper\Events\CartItemRemoved;

// Dispatch events
event(new CartItemAdded($cartItem));
event(new CartItemUpdated($cartItem, $oldQuantity, $newQuantity));
event(new CartItemRemoved($cartItem));
```

---

## REST API

### Get Cart Items

```http
GET /api/v1/carts/{cart}/items
```

**Response**:
```json
{
  "data": [
    {
      "id": 123,
      "product_variant_id": 245,
      "quantity": 2,
      "price": "49.99",
      "compare_at_price": "59.99",
      "total": "99.98",
      "discount": "0.00",
      "savings": "20.00",
      "is_on_sale": true,
      "variant": {
        "id": 245,
        "sku": "TSH-BLU-L",
        "display_name": "T-Shirt - Blue / Large"
      },
      "created_at": "2025-01-01T10:00:00Z"
    }
  ]
}
```

### Add Item to Cart

```http
POST /api/v1/carts/{cart}/items
```

**Request**:
```json
{
  "product_variant_id": 245,
  "quantity": 2,
  "data": {
    "gift_wrap": true,
    "gift_message": "Happy Birthday!"
  }
}
```

### Update Item Quantity

```http
PATCH /api/v1/cart-items/{item}
```

**Request**:
```json
{
  "quantity": 5
}
```

### Remove Item

```http
DELETE /api/v1/cart-items/{item}
```

---

## GraphQL API

### Query Cart Items

```graphql
query {
  cart(id: 15) {
    items {
      id
      quantity
      price
      compareAtPrice
      total
      discount
      savings
      isOnSale
      variant {
        id
        sku
        displayName
        image {
          url
        }
      }
    }
  }
}
```

### Add Item Mutation

```graphql
mutation {
  addCartItem(input: {
    cartId: 15
    productVariantId: 245
    quantity: 2
    data: {
      giftWrap: true
      giftMessage: "Happy Birthday!"
    }
  }) {
    cartItem {
      id
      quantity
      total
    }
    cart {
      itemsCount
      total
    }
  }
}
```

### Update Item Mutation

```graphql
mutation {
  updateCartItem(id: 123, quantity: 5) {
    cartItem {
      id
      quantity
      total
    }
    cart {
      total
    }
  }
}
```

---

## Practical Examples

### Add Item with Custom Data

```php
use Shopper\Models\Cart;
use Shopper\Models\ProductVariant;

$cart = Cart::find(15);
$variant = ProductVariant::find(245);

$item = $cart->items()->create([
    'product_variant_id' => $variant->id,
    'quantity' => 2,
    'price' => $variant->getPriceFor(
        siteId: $cart->site_id,
        channelId: $cart->channel_id,
        currency: $cart->currency
    )->price,
    'data' => [
        'gift_wrap' => true,
        'gift_message' => 'Happy Birthday!',
        'engraving' => 'John Doe',
    ],
]);
```

### Update Quantity with Validation

```php
use Shopper\Models\CartItem;
use Shopper\Exceptions\InsufficientStockException;

$item = CartItem::find(123);

try {
    $item->updateQuantity(10);

    return response()->json([
        'message' => 'Quantity updated',
        'item' => $item,
        'cart_total' => $item->cart->total,
    ]);
} catch (InsufficientStockException $e) {
    return response()->json([
        'error' => $e->getMessage(),
    ], 400);
}
```

### Check All Items Availability

```php
$cart = Cart::find(15);

$unavailableItems = $cart->items->filter(function ($item) {
    return !$item->checkAvailability();
});

if ($unavailableItems->isNotEmpty()) {
    foreach ($unavailableItems as $item) {
        $available = $item->variant->available_quantity;

        if ($available > 0) {
            $item->updateQuantity($available);
        } else {
            $item->delete();
        }
    }
}
```

### Calculate Cart Summary

```php
$cart = Cart::with('items.variant')->find(15);

$summary = [
    'items_count' => $cart->items->sum('quantity'),
    'subtotal' => $cart->items->sum('total'),
    'total_savings' => $cart->items->sum('savings'),
    'total_weight' => $cart->items->sum('total_weight'),
    'items' => $cart->items->map(fn($item) => [
        'name' => $item->name,
        'sku' => $item->sku,
        'quantity' => $item->quantity,
        'price' => $item->price,
        'total' => $item->total,
        'on_sale' => $item->is_on_sale,
        'savings' => $item->savings,
    ]),
];
```

---

## Performance Tips

### 1. Eager Load Relationships

```php
// ❌ N+1 queries
$cart = Cart::find(15);
foreach ($cart->items as $item) {
    echo $item->variant->product->name;
}

// ✅ Eager loading
$cart = Cart::with('items.variant.product')->find(15);
foreach ($cart->items as $item) {
    echo $item->variant->product->name;
}
```

### 2. Cache Cart Summary

```php
use Illuminate\Support\Facades\Cache;

$summary = Cache::remember(
    "cart.{$cart->id}.summary",
    now()->addMinutes(5),
    fn() => [
        'items_count' => $cart->items->count(),
        'total' => $cart->total,
        'items' => $cart->items->map(fn($item) => [
            'id' => $item->id,
            'name' => $item->name,
            'quantity' => $item->quantity,
            'total' => $item->total,
        ]),
    ]
);

// Invalidate cache on cart change
$cart->items()->saved(function () use ($cart) {
    Cache::forget("cart.{$cart->id}.summary");
});
```

### 3. Batch Updates

```php
// ❌ Multiple queries
foreach ($items as $itemData) {
    $cart->items()->create($itemData);
}

// ✅ Single query
$cart->items()->createMany($items);
$cart->calculate(); // Recalculate once at the end
```

### 4. Use Database Indexes

```sql
-- Optimize cart item lookups
CREATE INDEX idx_cart_items_cart_variant
ON cart_items(cart_id, product_variant_id);

-- Optimize variant lookups
CREATE INDEX idx_cart_items_variant
ON cart_items(product_variant_id);
```

---

## Related Documentation

- [Cart Model](model-cart)
- [OrderItem Model](model-order-item)
- [ProductVariant Model](model-product-variant)
- [Discount Model](model-discount)
- [Checkout Process](checkout-process)
- [REST API - Cart](api-cart)
- [GraphQL API - Cart](graphql-cart)
