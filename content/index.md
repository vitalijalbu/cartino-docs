---
title: Cartino Documentation
description: Powerful headless e-commerce platform combining Shopify-style commerce with Laravel flexibility.
navigation: false
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---

#title
Cartino [E-commerce]{.text-primary} Platform

#description
Build powerful, scalable e-commerce applications with Cartino - a headless platform combining Shopify-style product architecture with Laravel flexibility.

#links
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get Started
  :::

  :::u-button
  ---
  icon: i-simple-icons-github
  color: neutral
  variant: outline
  size: xl
  to: https://github.com/cartinophp/cartino
  target: _blank
  ---
  View on GitHub
  :::

#default
  :::prose-pre
  ---
  code: |
    // Install Cartino
    composer create-project cartino/cartino my-store
    
    // Run migrations
    php artisan migrate
  filename: Installation
  ---

  ```bash [Installation]
  # Clone the repository
  git clone https://github.com/cartinophp/cartino.git
  
  # Install dependencies
  composer install && npm install
  
  # Setup and migrate
  php artisan migrate
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Core Features

#features
  :::u-page-feature
  ---
  icon: i-lucide-package
  ---
  #title
  Product Management

  #description
  Multi-variant products with unlimited options, advanced inventory tracking with multiple locations, and flexible product types.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe
  ---
  #title
  Multi-Site Architecture

  #description
  Sites as Markets with flexible pricing per site, channel, and customer group. Multi-currency and multi-locale support.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-wallet
  ---
  #title
  Pricing & Discounts

  #description
  Advanced pricing rules, customer group pricing, quantity discounts, promotional pricing, and coupon management.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-warehouse
  ---
  #title
  Inventory Control

  #description
  Multi-location inventory tracking, stock movements, transfers, and reservations with full audit trail.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-users
  ---
  #title
  Customer Management

  #description
  Customer groups with custom pricing, loyalty card system, points & rewards with tiered conversion.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shopping-cart
  ---
  #title
  Order Processing

  #description
  Complete order lifecycle management with status tracking, fulfillment, and payment integration.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Built with Modern Stack

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-laravel
  ---
  #title
  Laravel 11

  #description
  Modern PHP framework with powerful ORM, routing, and ecosystem. Built on solid foundations.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-vuedotjs
  ---
  #title
  Vue 3 & Inertia

  #description
  Reactive UI with Composition API. Server-side routing with SPA experience using Inertia.js.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-tailwindcss
  ---
  #title
  Tailwind CSS

  #description
  Utility-first styling with Vite for lightning-fast builds and hot module replacement.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title
  PostgreSQL/MySQL

  #description
  Relational database with JSONB support for flexible custom fields and metadata.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code
  ---
  #title
  Type-safe Models

  #description
  Eloquent models with PHP enums, casts, and relationships for clean, maintainable code.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Event-driven

  #description
  Event-driven architecture for extensibility. Build addons and integrations with ease.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Get Started
      to: '/getting-started'
      trailingIcon: i-lucide-arrow-right
    - label: View on GitHub
      to: 'https://github.com/cartinophp/cartino'
      target: _blank
      variant: subtle
      icon: i-simple-icons-github
  title: Ready to build your e-commerce platform?
  description: Join developers building powerful commerce experiences with Cartino. Start your project today.
  class: dark:bg-neutral-950
  ---
  :::
::
