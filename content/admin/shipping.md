---
title: =š Shipping Methods
description: Configure shipping carriers, rates, and delivery options
navigation:
  icon: i-lucide-truck
layout: admin
---

## Shipping Configuration Overview

Set up flexible shipping methods, configure carriers, manage shipping zones, and provide accurate delivery options to your customers.

## Quick Setup

### Basic Shipping Setup

Get started in 5 minutes:

1. **Add Shipping Zone**
   - Select countries/regions
   - Name your zone

2. **Add Shipping Method**
   - Standard, Express, or Custom
   - Set delivery time
   - Configure pricing

3. **Test Checkout**
   - Verify rates appear correctly
   - Check calculations

4. **Go Live**
   - Activate shipping methods

## Shipping Zones

### Creating Zones

Define geographical areas:

**Domestic Zone:**
```
Zone Name: United States
Countries: United States
Regions: All states
Status: Active
```

**International Zone:**
```
Zone Name: Europe
Countries: Germany, France, Italy, Spain, etc.
Regions: All
Status: Active
```

**Regional Zone:**
```
Zone Name: California
Countries: United States
Regions: California only
Status: Active
```

### Zone Priority

When multiple zones match:

1. Most specific zone wins
2. Order of precedence:
   - State/Province specific
   - Country specific
   - Regional groups
   - Worldwide/rest of world

## Shipping Methods

### Flat Rate Shipping

Fixed price per order:

**Standard Shipping:**
- **Name** - Standard Delivery
- **Price** - $10.00
- **Delivery Time** - 3-5 business days
- **Zones** - Domestic

**Express Shipping:**
- **Name** - Express Delivery
- **Price** - $25.00
- **Delivery Time** - 1-2 business days
- **Zones** - Domestic

**International:**
- **Name** - International Standard
- **Price** - $35.00
- **Delivery Time** - 7-14 business days
- **Zones** - International

### Free Shipping

No-cost delivery:

**Free Shipping Options:**

1. **Minimum Order Amount**
   - Free on orders over $50
   - Domestic only
   - Applies to standard shipping

2. **Promotional Free Shipping**
   - Limited time offer
   - All orders
   - Specific products/categories

3. **Customer Group**
   - VIP customers
   - Wholesale accounts
   - Loyalty members

**Configuration:**
```
Method: Free Shipping
Minimum: $50.00
Apply to: Domestic Zone
Eligible: All products
Status: Active
```

### Weight-Based Rates

Price by package weight:

**Weight Tiers:**
```
0-5 lbs: $10.00
5-10 lbs: $15.00
10-20 lbs: $25.00
20-50 lbs: $40.00
50+ lbs: Contact for quote
```

**Product Weight:**
- Set weight for each product
- Calculate total cart weight
- Apply appropriate rate

### Price-Based Rates

Charge based on order total:

**Price Tiers:**
```
$0-$25: $10.00 shipping
$25-$50: $5.00 shipping
$50-$100: $2.00 shipping
$100+: Free shipping
```

**Benefits:**
- Encourages higher order values
- Simple to understand
- Easy to implement

### Table Rate Shipping

Complex rate calculations:

**Multi-Variable Rates:**
- Weight × Destination
- Price × Destination
- Quantity × Destination
- Custom combinations

**Example Table:**
| Weight | Domestic | Canada | Europe |
|--------|----------|--------|--------|
| 0-5 lbs | $10 | $20 | $35 |
| 5-10 lbs | $15 | $30 | $50 |
| 10-20 lbs | $25 | $45 | $75 |

### Local Pickup

Customer collects order:

**Pickup Configuration:**
- **Name** - Store Pickup
- **Price** - Free
- **Location** - Store address
- **Available Hours** - Mon-Sat 9am-6pm
- **Instructions** - Bring order confirmation

**Pickup Locations:**
```
Location 1: Main Store
Address: 123 Main St, New York, NY 10001
Hours: Mon-Fri 9am-6pm, Sat 10am-4pm
Contact: (555) 123-4567

Location 2: West Side Store
Address: 456 West Ave, New York, NY 10024
Hours: Mon-Sat 10am-7pm
Contact: (555) 987-6543
```

### Same-Day Delivery

Ultra-fast local delivery:

**Requirements:**
- Order before cutoff time (2 PM)
- Delivery radius (20 miles)
- Available in specific zones

**Pricing:**
- Flat rate $15
- Free over $100
- Surge pricing during holidays

## Carrier Integration

### Real-Time Rates

Connect shipping carriers:

**USPS (US Postal Service):**
- **Account** - USPS Web Tools
- **User ID** - Your USPS ID
- **Services** - Priority Mail, First-Class, etc.
- **Features** - Real-time rates, tracking

**UPS:**
- **Account** - UPS API access
- **User ID** - Your UPS username
- **Password** - API password
- **Access Key** - License key
- **Services** - Ground, 2nd Day Air, Next Day Air

**FedEx:**
- **Account** - FedEx Developer
- **Key** - API key
- **Password** - API password
- **Account Number** - Your FedEx account
- **Meter Number** - Unique identifier
- **Services** - Ground, Express, Overnight

**DHL:**
- **Account** - DHL Express
- **Site ID** - Your site ID
- **Password** - API password
- **Account Number** - DHL account
- **Services** - International shipping

### Label Printing

Generate shipping labels:

**Setup:**
1. Connect carrier account
2. Configure label preferences
3. Set default package sizes
4. Configure printer

**Label Options:**
- **Format** - PDF, PNG, ZPL (thermal printers)
- **Size** - 4×6, 8.5×11
- **Include** - Return label
- **Commercial Rates** - Discounted pricing

**Print Workflow:**
1. Process order
2. Select shipping service
3. Verify address
4. Generate label
5. Print label
6. Attach to package
7. Update tracking

### Tracking Integration

Auto-update tracking status:

**Features:**
- Tracking number added to order
- Email notification to customer
- Real-time status updates
- Delivery confirmation

**Tracking Statuses:**
```
Label Created ’ Picked Up ’ In Transit ’
Out for Delivery ’ Delivered
```

**Customer View:**
- Click tracking number
- See current status
- Estimated delivery
- Delivery exceptions

## Shipping Rules

### Conditional Shipping

Show/hide methods based on rules:

**Rule Examples:**

1. **Hide Express for Heavy Items**
   - If weight > 50 lbs
   - Hide Express Shipping
   - Show Freight only

2. **Free Shipping for VIP**
   - If customer group = VIP
   - Show Free Shipping
   - Hide all paid methods

3. **Restrict International**
   - If country = Restricted list
   - Hide all shipping
   - Show "Not available"

4. **Signature Required**
   - If order value > $500
   - Require signature
   - Add $3 fee

### Handling Fees

Additional charges:

**Fee Types:**
- **Fixed** - $2.50 per order
- **Percentage** - 10% of shipping cost
- **Per Item** - $0.50 per item
- **Weight-Based** - $1 per pound

**Apply To:**
- All orders
- Specific carriers
- International only
- Heavy items

### Shipping Classes

Categorize products:

**Classes:**
- **Standard** - Regular items
- **Heavy** - Large/bulky items
- **Fragile** - Special handling
- **Oversized** - Extra-large items
- **Digital** - No shipping

**Per-Class Rates:**
```
Standard Items: Normal rates
Heavy Items: +$10 per item
Fragile Items: +$5 per item
Oversized: Calculated by dimensions
```

## Package Settings

### Box Sizes

Define package dimensions:

**Pre-Configured Boxes:**
```
Small Box: 6×4×2 inches, 1 lb
Medium Box: 12×9×4 inches, 2 lbs
Large Box: 18×14×8 inches, 3 lbs
Extra Large: 24×18×12 inches, 5 lbs
```

**Box Packing:**
- Auto-select smallest box
- Split into multiple packages
- Custom dimensions for odd sizes

### Packing Algorithm

Optimize package selection:

- **Bin Packing** - Minimize boxes used
- **Weight Distribution** - Balance heavy items
- **Fragile Separation** - Separate delicate items
- **Volume Calculation** - Dimensional weight

## Address Validation

### Real-Time Validation

Verify shipping addresses:

**Features:**
- Validate during checkout
- Suggest corrections
- Flag invalid addresses
- Confirm with customer

**Validation Providers:**
- USPS Address Validation
- UPS Address Verification
- Google Address Validation
- Custom API

**Invalid Address Handling:**
- Show error message
- Suggest corrections
- Allow override (with warning)
- Contact customer

## Restricted Shipping

### Prohibited Items

Block shipping for certain products:

**Restrictions:**
- **Hazardous Materials** - Chemicals, batteries
- **Perishables** - Food items (some zones)
- **Alcohol** - Age-restricted
- **Large Items** - Furniture (some carriers)

**Product Configuration:**
```
Product: Lithium Batteries
Shipping Restricted: Yes
Allowed Carriers: USPS Ground Only
Restricted Countries: Air transport prohibited
Requires Label: Hazmat warning
```

### Blocked Countries

Prevent shipping to locations:

**Blocked List:**
- Countries under sanctions
- High fraud locations
- No carrier service available
- Business policy

**Customer Message:**
```
"We're sorry, we currently don't ship to [Country].
Please contact us for assistance."
```

## Shipping Notifications

### Customer Emails

Automated shipping updates:

**Order Shipped:**
```
Subject: Your order #1234 has been shipped!

Hi John,

Great news! Your order is on its way.

Tracking Number: 1Z999AA10123456789
Carrier: UPS
Estimated Delivery: Dec 14, 2025

Track your package: [Track Now]
```

**Delivery Confirmation:**
```
Subject: Your order #1234 has been delivered

Hi John,

Your package was delivered today at 2:30 PM.

We hope you love your purchase!
```

### SMS Notifications

Text message updates:

- Order shipped
- Out for delivery
- Delivered
- Delivery exception

**Example:**
```
Your order #1234 shipped via UPS.
Track: 1Z999AA10123456789
Est. delivery: Dec 14
```

## Shipping Reports

### Performance Metrics

Track shipping costs:

- **Total Shipping Revenue** - Charged to customers
- **Total Shipping Cost** - Paid to carriers
- **Shipping Margin** - Revenue - Cost
- **Average Shipping Cost** - Per order
- **Free Shipping Orders** - Count and value

### Carrier Performance

Compare carriers:

| Carrier | Orders | Avg Cost | On-Time % | Issues |
|---------|--------|----------|-----------|--------|
| USPS | 450 | $8.50 | 94% | 12 |
| UPS | 320 | $12.30 | 97% | 6 |
| FedEx | 180 | $14.20 | 96% | 8 |

### Delivery Times

Analyze speed:

- **Average Delivery Time** - Days from ship to delivery
- **On-Time Delivery Rate** - Percentage meeting estimate
- **Late Deliveries** - Orders past estimate
- **Fastest/Slowest Routes** - By zone

## Advanced Features

### Multi-Origin Shipping

Ship from multiple warehouses:

**Setup:**
1. Define warehouse locations
2. Assign inventory to each
3. Configure shipping origin
4. Auto-select closest to customer

**Benefits:**
- Faster delivery times
- Lower shipping costs
- Better inventory distribution

### Dropshipping

Third-party fulfillment:

**Configuration:**
- Supplier shipping rules
- No handling by store
- Direct to customer
- Extended delivery times
- Different tracking format

### In-Store Pickup Notifications

Alert store when order ready:

1. Order placed with pickup
2. Staff receives notification
3. Order prepared
4. Customer notified ready
5. Customer collects

**Pickup Email:**
```
Subject: Your order #1234 is ready for pickup!

Hi John,

Your order is ready! Please pick it up at:

Main Store
123 Main St, New York, NY 10001
Hours: Mon-Sat 9am-6pm

Bring this email or order number.
```

## Troubleshooting

### Common Issues

**Shipping Not Showing:**
- Check zone configuration
- Verify method is active
- Check product weights
- Review shipping rules

**Wrong Rates:**
- Update carrier credentials
- Check product dimensions
- Verify zone matches
- Review rate tables

**Label Printing Fails:**
- Check carrier account
- Verify address valid
- Confirm sufficient funds
- Check API status

### Customer Support

Handle shipping inquiries:

- **Tracking Not Updating** - Carrier delay
- **Lost Package** - File claim with carrier
- **Wrong Address** - Intercept if possible
- **Delivery Issues** - Contact carrier

## Best Practices

### Optimization Tips

 Offer multiple shipping options
 Provide accurate delivery estimates
 Show costs clearly at checkout
 Use real-time carrier rates
 Enable address validation
 Automate tracking updates
 Monitor carrier performance
 Test checkout regularly

### Cost Management

- Negotiate carrier rates
- Use multi-carrier strategy
- Optimize package sizes
- Consider regional carriers
- Pass costs to customers appropriately

## Next Steps

- **[Manage Orders](/admin/orders)** - Process and fulfill orders
- **[Configure Settings](/admin/settings)** - General system settings
- **[Track Inventory](/admin/inventory)** - Stock management
- **[View Dashboard](/admin/dashboard)** - Monitor performance
