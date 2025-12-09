---
title: Storefront
description: Build beautiful e-commerce storefronts with Laravel Blade templates and components.
navigation:
  icon: i-lucide-store
---

# Storefront Development

Build your e-commerce storefront using Laravel Blade templates, components, and Tailwind CSS. Create beautiful, performant shopping experiences with server-side rendering.

## Overview

Cartino provides a complete set of Blade components and templates for building your storefront:

- Pre-built page templates
- Reusable Blade components
- Tailwind CSS styling
- Server-side rendering
- SEO-optimized markup
- Mobile-first responsive design

::card-group
  :::card
  ---
  icon: i-lucide-layout-template
  to: /storefront/templates
  ---
  #title
  Page Templates

  #description
  Ready-to-use templates for product pages, cart, checkout, and more.
  :::

  :::card
  ---
  icon: i-lucide-package
  to: /storefront/components
  ---
  #title
  Blade Components

  #description
  Reusable components for building custom storefronts.
  :::

  :::card
  ---
  icon: i-lucide-palette
  to: /storefront/theming
  ---
  #title
  Theming & Styling

  #description
  Customize colors, fonts, and layouts with Tailwind CSS.
  :::

  :::card
  ---
  icon: i-lucide-shopping-cart
  to: /storefront/cart-checkout
  ---
  #title
  Cart & Checkout

  #description
  Complete cart and checkout flow implementation.
  :::
::

## Quick Start

### Installation

Cartino includes storefront views out of the box:

```bash
# Install Cartino
composer create-project cartino/cartino my-store

# Install frontend dependencies
npm install

# Build assets
npm run build
```

### Directory Structure

```text
resources/
├── views/
│   ├── storefront/
│   │   ├── layouts/
│   │   │   ├── app.blade.php
│   │   │   ├── header.blade.php
│   │   │   └── footer.blade.php
│   │   ├── products/
│   │   │   ├── index.blade.php
│   │   │   ├── show.blade.php
│   │   │   └── category.blade.php
│   │   ├── cart/
│   │   │   ├── index.blade.php
│   │   │   └── checkout.blade.php
│   │   ├── account/
│   │   │   ├── dashboard.blade.php
│   │   │   ├── orders.blade.php
│   │   │   └── profile.blade.php
│   │   └── home.blade.php
│   └── components/
│       ├── product-card.blade.php
│       ├── cart-item.blade.php
│       ├── add-to-cart.blade.php
│       └── ... more components
├── css/
│   └── app.css
└── js/
    └── app.js
```

### Your First Page

Create a simple product listing page:

```blade
{{-- resources/views/storefront/products/index.blade.php --}}
<x-storefront-layout>
    <x-slot:title>Products</x-slot:title>

    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Our Products</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            @foreach($products as $product)
                <x-product-card :product="$product" />
            @endforeach
        </div>

        {{ $products->links() }}
    </div>
</x-storefront-layout>
```

## Core Templates

### Home Page

The main landing page template:

```blade
{{-- resources/views/storefront/home.blade.php --}}
<x-storefront-layout>
    {{-- Hero Section --}}
    <x-hero
        title="Welcome to Our Store"
        subtitle="Discover amazing products"
        :image="asset('images/hero.jpg')"
        cta-text="Shop Now"
        cta-link="/products"
    />

    {{-- Featured Products --}}
    <section class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8">Featured Products</h2>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                @foreach($featured as $product)
                    <x-product-card :product="$product" />
                @endforeach
            </div>
        </div>
    </section>

    {{-- Categories --}}
    <x-category-showcase :categories="$categories" />

    {{-- Newsletter --}}
    <x-newsletter-signup />
</x-storefront-layout>
```

### Product Listing

Display products with filtering and sorting:

```blade
{{-- resources/views/storefront/products/index.blade.php --}}
<x-storefront-layout>
    <div class="container mx-auto px-4 py-8">
        <div class="flex gap-8">
            {{-- Sidebar Filters --}}
            <aside class="w-64 flex-shrink-0">
                <x-product-filters
                    :categories="$categories"
                    :brands="$brands"
                    :price-range="$priceRange"
                />
            </aside>

            {{-- Product Grid --}}
            <div class="flex-1">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-gray-600">
                        {{ $products->total() }} products
                    </p>
                    <x-product-sort />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    @foreach($products as $product)
                        <x-product-card :product="$product" />
                    @endforeach
                </div>

                <div class="mt-8">
                    {{ $products->links() }}
                </div>
            </div>
        </div>
    </div>
</x-storefront-layout>
```

### Product Detail

Single product page with variants:

```blade
{{-- resources/views/storefront/products/show.blade.php --}}
<x-storefront-layout>
    <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {{-- Product Images --}}
            <div>
                <x-product-gallery :product="$product" />
            </div>

            {{-- Product Info --}}
            <div>
                <h1 class="text-3xl font-bold mb-4">
                    {{ $product->title }}
                </h1>

                <div class="mb-6">
                    <x-product-price :product="$product" />
                </div>

                <div class="prose mb-6">
                    {!! $product->description !!}
                </div>

                {{-- Variant Selection --}}
                @if($product->has_variants)
                    <x-variant-selector :product="$product" />
                @endif

                {{-- Add to Cart --}}
                <x-add-to-cart :product="$product" />

                {{-- Product Meta --}}
                <div class="mt-8 space-y-2 text-sm text-gray-600">
                    <p>SKU: {{ $product->sku }}</p>
                    <p>Category: {{ $product->category->name }}</p>
                    @if($product->brand)
                        <p>Brand: {{ $product->brand->name }}</p>
                    @endif
                </div>
            </div>
        </div>

        {{-- Related Products --}}
        <div class="mt-16">
            <h2 class="text-2xl font-bold mb-6">You May Also Like</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                @foreach($related as $item)
                    <x-product-card :product="$item" />
                @endforeach
            </div>
        </div>
    </div>
</x-storefront-layout>
```

## Blade Components

### Product Card

Reusable product card component:

```blade
{{-- resources/views/components/product-card.blade.php --}}
@props(['product'])

<div {{ $attributes->merge(['class' => 'group relative bg-white rounded-lg shadow hover:shadow-lg transition']) }}>
    {{-- Product Image --}}
    <a href="{{ route('products.show', $product) }}" class="block aspect-square overflow-hidden rounded-t-lg">
        <img
            src="{{ $product->featured_image_url }}"
            alt="{{ $product->title }}"
            class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
    </a>

    {{-- Wishlist Button --}}
    <button
        type="button"
        class="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-50"
        wire:click="toggleWishlist({{ $product->id }})"
    >
        <x-icon name="heart" class="w-5 h-5" />
    </button>

    {{-- Product Info --}}
    <div class="p-4">
        <h3 class="font-semibold text-gray-900 mb-2">
            <a href="{{ route('products.show', $product) }}" class="hover:text-primary">
                {{ $product->title }}
            </a>
        </h3>

        <p class="text-sm text-gray-600 mb-3">
            {{ Str::limit($product->description, 60) }}
        </p>

        <div class="flex items-center justify-between">
            {{-- Price --}}
            <div>
                @if($product->has_discount)
                    <span class="text-lg font-bold text-primary">
                        {{ money($product->sale_price) }}
                    </span>
                    <span class="text-sm text-gray-500 line-through ml-2">
                        {{ money($product->price) }}
                    </span>
                @else
                    <span class="text-lg font-bold text-gray-900">
                        {{ money($product->price) }}
                    </span>
                @endif
            </div>

            {{-- Quick Add --}}
            <x-quick-add-button :product="$product" />
        </div>
    </div>
</div>
```

### Add to Cart Button

Interactive add to cart component with Livewire:

```blade
{{-- resources/views/components/add-to-cart.blade.php --}}
@props(['product', 'variant' => null])

<div x-data="{ quantity: 1 }" class="space-y-4">
    {{-- Quantity Selector --}}
    <div class="flex items-center gap-4">
        <label class="text-sm font-medium">Quantity:</label>
        <div class="flex items-center border rounded-lg">
            <button
                type="button"
                @click="quantity = Math.max(1, quantity - 1)"
                class="px-3 py-2 hover:bg-gray-50"
            >
                <x-icon name="minus" class="w-4 h-4" />
            </button>
            <input
                type="number"
                x-model="quantity"
                min="1"
                class="w-16 text-center border-x py-2"
            />
            <button
                type="button"
                @click="quantity++"
                class="px-3 py-2 hover:bg-gray-50"
            >
                <x-icon name="plus" class="w-4 h-4" />
            </button>
        </div>
    </div>

    {{-- Add to Cart Button --}}
    <button
        type="button"
        @click="$wire.addToCart({{ $product->id }}, quantity)"
        class="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition"
        :disabled="quantity < 1"
    >
        <x-icon name="shopping-cart" class="w-5 h-5 inline mr-2" />
        Add to Cart
    </button>

    {{-- Buy Now Button --}}
    <button
        type="button"
        @click="$wire.buyNow({{ $product->id }}, quantity)"
        class="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition"
    >
        Buy Now
    </button>
</div>
```

### Cart Drawer

Slide-out cart component:

```blade
{{-- resources/views/components/cart-drawer.blade.php --}}
<div
    x-data="{ open: false }"
    @cart-updated.window="open = true"
>
    {{-- Trigger Button --}}
    <button
        @click="open = true"
        class="relative p-2 hover:bg-gray-100 rounded-lg"
    >
        <x-icon name="shopping-cart" class="w-6 h-6" />
        <span class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ $cart->items_count }}
        </span>
    </button>

    {{-- Drawer --}}
    <div
        x-show="open"
        @click.away="open = false"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="translate-x-full"
        x-transition:enter-end="translate-x-0"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="translate-x-0"
        x-transition:leave-end="translate-x-full"
        class="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
        style="display: none;"
    >
        {{-- Header --}}
        <div class="flex items-center justify-between p-6 border-b">
            <h2 class="text-xl font-bold">Shopping Cart</h2>
            <button @click="open = false" class="p-2 hover:bg-gray-100 rounded">
                <x-icon name="x" class="w-5 h-5" />
            </button>
        </div>

        {{-- Cart Items --}}
        <div class="flex-1 overflow-y-auto p-6">
            @forelse($cart->items as $item)
                <x-cart-item :item="$item" />
            @empty
                <div class="text-center py-12">
                    <x-icon name="shopping-cart" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p class="text-gray-600">Your cart is empty</p>
                </div>
            @endforelse
        </div>

        {{-- Footer --}}
        <div class="border-t p-6 space-y-4">
            <div class="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{{ money($cart->total) }}</span>
            </div>

            <a
                href="{{ route('checkout') }}"
                class="block w-full bg-primary text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
                Proceed to Checkout
            </a>

            <a
                href="{{ route('cart') }}"
                class="block w-full text-center py-3 px-6 rounded-lg font-semibold border hover:bg-gray-50 transition"
            >
                View Cart
            </a>
        </div>
    </div>
</div>
```

## Layout System

### Main Layout

The base layout for all storefront pages:

```blade
{{-- resources/views/components/storefront-layout.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? config('app.name') }}</title>

    {{-- SEO Meta Tags --}}
    @if(isset($description))
        <meta name="description" content="{{ $description }}">
    @endif

    {{-- Open Graph --}}
    <meta property="og:title" content="{{ $title ?? config('app.name') }}">
    @if(isset($image))
        <meta property="og:image" content="{{ $image }}">
    @endif

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />

    {{-- Styles --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles

    {{ $head ?? '' }}
</head>
<body class="antialiased bg-gray-50">
    {{-- Header --}}
    <x-storefront-header />

    {{-- Announcement Bar --}}
    <x-announcement-bar />

    {{-- Main Content --}}
    <main>
        {{ $slot }}
    </main>

    {{-- Footer --}}
    <x-storefront-footer />

    {{-- Cart Drawer --}}
    <x-cart-drawer />

    {{-- Scripts --}}
    @livewireScripts
    {{ $scripts ?? '' }}
</body>
</html>
```

## Styling with Tailwind

### Configuration

```js
// tailwind.config.js
export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          light: '#A78BFA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### Custom Styles

```css
/* resources/css/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition;
  }

  .btn-secondary {
    @apply bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition;
  }

  .input-field {
    @apply w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary;
  }
}
```

## Next Steps

::card-group
  :::card
  ---
  icon: i-lucide-layout-template
  to: /storefront/templates
  ---
  #title
  Page Templates

  #description
  Explore all available page templates
  :::

  :::card
  ---
  icon: i-lucide-package
  to: /storefront/components
  ---
  #title
  Component Library

  #description
  Browse all Blade components
  :::

  :::card
  ---
  icon: i-lucide-shopping-cart
  to: /storefront/cart-checkout
  ---
  #title
  Cart & Checkout

  #description
  Implement cart and checkout flow
  :::

  :::card
  ---
  icon: i-lucide-palette
  to: /storefront/theming
  ---
  #title
  Theming Guide

  #description
  Customize your storefront design
  :::
::
