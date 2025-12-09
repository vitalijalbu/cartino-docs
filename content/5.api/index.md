---
title: API Reference
description: Complete API reference for Cartino - REST and GraphQL endpoints for headless e-commerce.
navigation:
  icon: i-lucide-code
---

# API Reference

Cartino provides powerful REST and GraphQL APIs for building headless e-commerce applications. Access all commerce functionality programmatically with comprehensive endpoints for products, orders, customers, and more.

## API Types

### REST API

Traditional REST endpoints with JSON payloads. Perfect for standard CRUD operations and simple integrations.

```bash
GET /api/products
POST /api/orders
PUT /api/customers/{id}
```

::card-group
  :::card
  ---
  icon: i-lucide-shield-check
  to: /api/authentication
  ---
  #title
  Authentication

  #description
  API keys, OAuth tokens, and session management for secure API access.
  :::

  :::card
  ---
  icon: i-lucide-network
  to: /api/rest
  ---
  #title
  REST Endpoints

  #description
  Complete REST API reference with all available endpoints and parameters.
  :::
::

### GraphQL API

Flexible query language for precise data fetching. Request exactly what you need with nested relationships.

```graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        title
        variants {
          price
          inventory
        }
      }
    }
  }
}

## Quick Start

### Get Your API Key

Generate an API key from the admin dashboard:

```bash
# Admin � Settings � API Keys � Generate New Key
```

### Make Your First Request

```bash
curl -X GET https://your-store.com/api/products \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "title": "Cotton T-Shirt",
      "slug": "cotton-t-shirt",
      "type": "physical",
      "status": "active",
      "variants": [
        {
          "id": 1,
          "sku": "TS-RED-M",
          "price": 19.99,
          "inventory_quantity": 100
        }
      ]
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 125
  }
}
```

## Core Resources

### Products

Manage products, variants, and inventory:

- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

[View full Products API �](/api/rest#products)

### Orders

Process orders and manage fulfillment:

- `GET /api/orders` - List all orders
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}` - Update order status
- `POST /api/orders/{id}/fulfill` - Mark as fulfilled

[View full Orders API �](/api/rest#orders)

### Customers

Manage customer accounts:

- `GET /api/customers` - List customers
- `GET /api/customers/{id}` - Get customer details
- `POST /api/customers` - Create customer
- `PUT /api/customers/{id}` - Update customer

[View full Customers API �](/api/rest#customers)

### Cart

Shopping cart operations:

- `GET /api/cart` - Get current cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{id}` - Update quantity
- `DELETE /api/cart/items/{id}` - Remove item
- `POST /api/cart/checkout` - Process checkout

[View full Cart API �](/api/rest#cart)

## Features

::u-page-feature
---
icon: i-lucide-zap
---
#title
Rate Limiting

#description
Built-in rate limiting protects your store. Default: 60 requests/minute per API key.
::

::u-page-feature
---
icon: i-lucide-filter
---
#title
Filtering & Sorting

#description
Powerful query parameters for filtering, sorting, and searching across all resources.
::

::u-page-feature
---
icon: i-lucide-list
---
#title
Pagination

#description
Cursor-based pagination for large datasets. Navigate efficiently through results.
::

::u-page-feature
---
icon: i-lucide-alert-circle
---
#title
Error Handling

#description
Consistent error responses with codes and messages. Easy debugging and error recovery.
::

## Response Format

All API responses follow this structure:

### Success Response

```json
{
  "data": { ... },
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 100
  },
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  }
}
```

### Error Response

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "title": ["The title field is required."],
    "price": ["The price must be greater than 0."]
  }
}
```

## Authentication

All API requests require authentication:

```bash
# Bearer Token
Authorization: Bearer YOUR_API_KEY

# Basic Auth
Authorization: Basic base64(api_key:password)
```

[Learn more about authentication �](/api/authentication)

## Environments

### Production

```
https://your-store.com/api
```

### Sandbox

```
https://sandbox.your-store.com/api
```

## API Versioning

Current version: **v1**

```bash
# Version in URL
GET /api/v1/products

# Version in header
Accept: application/vnd.cartino.v1+json
```

## SDKs & Libraries

Official SDKs for popular languages:

- **PHP**: `composer require cartino/sdk`
- **JavaScript**: `npm install @cartino/sdk`
- **Python**: `pip install cartino-sdk`
- **Ruby**: `gem install cartino-sdk`

## Support

Need help with the API?

- [API Documentation](/api/rest)
- [Discord Community](https://discord.gg/cartino)
- [GitHub Issues](https://github.com/cartinophp/cartino/issues)

## Next Steps

::card-group
  :::card
  ---
  icon: i-lucide-book-open
  to: /api/rest
  ---
  #title
  Explore REST API

  #description
  Complete reference for all REST endpoints
  :::
::
::
