---
title: 📦 Product Management
description: Complete guide to managing your product catalog
navigation:
  icon: i-lucide-package
layout: admin
---

## Product Management Overview

Manage your entire product catalog from the admin panel - create products, set pricing, manage inventory, and organize with categories.

## Creating Products

### Quick Add

Create a simple product in seconds:

1. Click **Add Product** button
2. Enter product name
3. Set price
4. Upload image
5. Click **Save**

### Full Product Form

Complete product details:

**Basic Information:**
- Product Name
- SKU (Stock Keeping Unit)
- Description (rich text editor)
- Short Description (for listings)

**Pricing:**
- Base Price
- Compare at Price (original price)
- Cost per Item (for profit calculation)
- Tax Class

**Inventory:**
- Track Inventory (on/off)
- Quantity
- Allow Backorders
- Low Stock Threshold

**Organization:**
- Category
- Tags
- Brand
- Vendor

**Media:**
- Featured Image
- Gallery Images (drag to reorder)
- Videos (YouTube, Vimeo)

**SEO:**
- Meta Title
- Meta Description
- URL Slug
- Schema Markup

## Product Variants

Create products with options (size, color, etc.):

### Setting Up Variants

1. Enable "This product has variants"
2. Add options:
   - **Option 1**: Size (S, M, L, XL)
   - **Option 2**: Color (Red, Blue, Green)
3. Generate variants (auto-creates all combinations)
4. Set individual prices and SKUs

### Variant Management

Bulk edit variants:
- **Pricing** - Update all prices at once
- **Inventory** - Set quantity for multiple variants
- **Images** - Assign images to specific variants
- **Visibility** - Hide/show individual variants

Example:
```
T-Shirt / Small / Red   | SKU: TS-S-RED | $19.99 | 50 units
T-Shirt / Small / Blue  | SKU: TS-S-BLU | $19.99 | 45 units
T-Shirt / Medium / Red  | SKU: TS-M-RED | $19.99 | 30 units
...
```

## Product Types

### Physical Products

Standard inventory items:

- Require shipping
- Track inventory
- Set weight and dimensions
- Manage stock levels

### Digital Products

Downloadable items:

- No shipping required
- Instant delivery
- Download limits
- Expiration dates

### Services

Bookable services:

- Appointment scheduling
- No inventory tracking
- Duration and pricing
- Staff assignment

### Gift Cards

Store credit:

- Custom amounts
- Expiration options
- Balance tracking
- Redemption codes

## Bulk Operations

### Bulk Edit

Update multiple products at once:

1. Select products (checkboxes)
2. Choose action from dropdown:
   - Change Category
   - Update Price
   - Change Visibility
   - Add Tags
   - Set Vendor
   - Update Stock Status
3. Apply changes

### CSV Import/Export

#### Exporting Products

1. Go to **Products → Export**
2. Select fields to include
3. Choose format (CSV, Excel)
4. Download file

#### Importing Products

1. Go to **Products → Import**
2. Download CSV template
3. Fill in product data
4. Upload file
5. Map columns
6. Review and import

**Important Fields:**
- `name` - Product name (required)
- `sku` - Unique identifier
- `price` - Base price
- `stock` - Quantity
- `category` - Category slug
- `status` - active/draft/archived

## Product Organization

### Categories

Hierarchical organization:

```
Electronics
├── Computers
│   ├── Laptops
│   └── Desktops
├── Phones
│   ├── Smartphones
│   └── Accessories
└── Tablets
```

**Category Settings:**
- Name and Slug
- Parent Category
- Description
- Featured Image
- Display Order
- SEO Meta Data

### Tags

Flexible labeling:

- Multiple tags per product
- Autocomplete suggestions
- Tag clouds
- Filter by tags

Examples:
- `new-arrival`, `sale`, `featured`
- `organic`, `vegan`, `gluten-free`
- `summer-2025`, `clearance`

### Brands

Organize by manufacturer:

- Brand Name
- Logo
- Description
- Website URL
- Filter by brand

### Collections

Curated product groups:

- **Manual** - Handpicked products
- **Automatic** - Rule-based (e.g., price > $100)
- **Smart** - AI-suggested

## Inventory Management

### Stock Tracking

Monitor inventory levels:

- **In Stock** - Available quantity
- **Reserved** - Allocated to orders
- **Available** - In stock - reserved
- **On Order** - Incoming stock

### Stock Locations

Multi-location inventory:

```
Product: T-Shirt Blue / Medium
├── Warehouse A: 50 units
├── Store NYC: 10 units
├── Store LA: 15 units
└── Total: 75 units
```

### Stock Movements

Track inventory changes:

- **Sale** - Order fulfillment
- **Adjustment** - Manual correction
- **Return** - Customer return
- **Transfer** - Between locations
- **Damage** - Write-off

### Reorder Management

Automate restocking:

- **Reorder Point** - Trigger level
- **Reorder Quantity** - Amount to order
- **Lead Time** - Days until delivery
- **Supplier** - Vendor information

## Pricing Strategies

### Dynamic Pricing

Set rules for automatic pricing:

- **Customer Group Pricing** - VIP, wholesale, retail
- **Quantity Discounts** - Buy more, save more
- **Scheduled Sales** - Time-based pricing
- **Location-Based** - Different prices by site/channel

### Price Rules

Create complex pricing logic:

```
Rule: Wholesale Pricing
- Customer Group: Wholesale
- Discount: 30% off
- Min Quantity: 10 units
- Valid Until: 2025-12-31
```

### Currency Management

Multi-currency support:

- Base Currency
- Additional Currencies
- Exchange Rates (manual or auto-update)
- Currency Display Format

## Product Media

### Image Management

Optimize product images:

- **Formats** - JPG, PNG, WebP
- **Max Size** - 10MB per image
- **Recommended** - 2000×2000px
- **Alt Text** - For SEO and accessibility

**Image Actions:**
- Crop and resize
- Set as featured
- Reorder (drag & drop)
- Bulk upload
- Delete unused media

### Video Integration

Add product videos:

- YouTube embed
- Vimeo embed
- Self-hosted video
- 360° product views

## SEO Optimization

### On-Page SEO

Optimize product pages:

- **Meta Title** - 50-60 characters
- **Meta Description** - 150-160 characters
- **URL Slug** - Short and descriptive
- **Headings** - Proper H1, H2 structure
- **Image Alt Text** - Descriptive text

### Schema Markup

Rich snippets for search engines:

- Product Name
- Price and Currency
- Availability
- Review Rating
- Brand
- SKU/GTIN

## Product Reviews

Manage customer feedback:

### Review Moderation

Approve/reject reviews:

- Auto-approve verified purchases
- Manual moderation for others
- Spam filtering
- Edit or remove inappropriate content

### Review Display

Configure review display:

- Star rating (1-5 stars)
- Review text
- Reviewer name
- Verified purchase badge
- Helpful votes

### Review Analytics

Measure feedback:

- Average rating
- Rating distribution
- Review volume over time
- Most helpful reviews
- Response rate

## Product Duplication

Clone existing products:

1. Find product to duplicate
2. Click **Actions → Duplicate**
3. Modify duplicate as needed
4. Save new product

Useful for:
- Creating similar products
- Seasonal variations
- Testing changes

## Product Status

Control visibility:

- **Active** - Visible on storefront
- **Draft** - Work in progress, hidden
- **Archived** - Hidden but preserved
- **Out of Stock** - Visible but not purchasable

## Advanced Fields

Custom product data:

### Blueprint System

Define custom fields per product type:

```yaml
product_type: clothing
fields:
  - fabric: Cotton/Polyester/Blend
  - care_instructions: Machine wash cold
  - origin_country: Made in USA
  - certifications: Organic, Fair Trade
```

### Custom Attributes

Add unlimited custom fields:

- Text fields
- Dropdowns
- Checkboxes
- Date pickers
- File uploads

## Performance Tips

### Optimization

Speed up product management:

- ✅ Use bulk operations
- ✅ Optimize images before upload
- ✅ Archive old products
- ✅ Clean up unused tags
- ✅ Use filters to find products quickly

### Search & Filters

Find products fast:

- **Quick Search** - Name, SKU, barcode
- **Advanced Filters** - Category, price, stock, tags
- **Saved Filters** - Reuse common searches
- **Sort Options** - Name, price, date, stock
