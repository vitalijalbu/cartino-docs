---
title: 🛍️ Order Management
description: Process and fulfill customer orders efficiently
navigation:
  icon: i-lucide-shopping-bag
layout: admin
---

## Order Management Overview

Process customer orders, manage fulfillment, handle returns, and provide excellent customer service through the order management system.

## Order Lifecycle

### Order Statuses

Track orders through these stages:

1. **Pending Payment** ⏳ - Awaiting payment confirmation
2. **Processing** 🔄 - Payment received, preparing order
3. **Shipped** 📦 - Order dispatched to customer
4. **Delivered** ✅ - Order received by customer
5. **Cancelled** ❌ - Order cancelled
6. **Refunded** 💰 - Payment returned to customer

### Status Workflow

```
Pending Payment → Processing → Shipped → Delivered
       ↓             ↓          ↓
   Cancelled ←  Cancelled  ← Returned → Refunded
```

## Order List

### Viewing Orders

Filter and search orders:

- **All Orders** - Complete order list
- **Today** - Orders from last 24 hours
- **This Week** - Last 7 days
- **This Month** - Current month
- **Custom Range** - Specific date range

**Quick Filters:**
- Status (Pending, Processing, Shipped, etc.)
- Payment Status (Paid, Unpaid, Refunded)
- Fulfillment Status (Unfulfilled, Partial, Fulfilled)
- Customer
- Payment Method
- Shipping Method

### Order Table Columns

| Order # | Customer | Date | Total | Status | Actions |
|---------|----------|------|-------|--------|---------|
| #1234 | John Doe | Dec 9 | $125.00 | Processing | [View] [Print] |
| #1233 | Jane Smith | Dec 9 | $89.99 | Shipped | [View] [Track] |

**Customize Columns:**
- Drag to reorder
- Show/hide columns
- Save preferences

## Order Details

### Order Information

Complete order overview:

**Customer Details:**
- Name and email
- Phone number
- Order history (link to customer profile)
- Customer notes

**Shipping Address:**
```
John Doe
123 Main Street, Apt 4B
New York, NY 10001
United States
```

**Billing Address:**
- Same as shipping or different
- Company name (if applicable)

**Order Items:**
| Product | SKU | Quantity | Price | Total |
|---------|-----|----------|-------|-------|
| T-Shirt Blue / M | TS-BLU-M | 2 | $19.99 | $39.98 |
| Jeans Black / 32 | JN-BLK-32 | 1 | $49.99 | $49.99 |

**Order Summary:**
- Subtotal: $89.97
- Shipping: $10.00
- Tax: $8.50
- **Total: $108.47**

**Payment Information:**
- Payment Method: Credit Card (Visa ***1234)
- Transaction ID: ch_1234567890
- Payment Status: Paid
- Paid Date: Dec 9, 2025 10:30 AM

**Shipping Information:**
- Shipping Method: Standard Shipping (3-5 days)
- Tracking Number: 1Z999AA10123456789
- Carrier: UPS
- Estimated Delivery: Dec 14, 2025

### Order Timeline

Activity log:

```
Dec 9, 10:35 AM - Order shipped
  Tracking #1Z999AA10123456789 added
  Customer notified via email

Dec 9, 10:30 AM - Payment received
  $108.47 paid via Visa ending in 1234
  Payment confirmed by Stripe

Dec 9, 10:28 AM - Order placed
  Created by John Doe
  Order #1234
```

## Processing Orders

### Fulfillment Workflow

Step-by-step order processing:

**1. Review Order**
- Check items and quantities
- Verify address
- Note any customer requests

**2. Update Inventory**
- Reserve stock
- Update quantities
- Check availability

**3. Pack Order**
- Print picking list
- Gather items
- Quality check
- Pack securely

**4. Generate Shipping Label**
- Select carrier
- Print label
- Attach to package

**5. Mark as Shipped**
- Enter tracking number
- Update order status
- Send notification to customer

### Bulk Actions

Process multiple orders:

1. Select orders (checkboxes)
2. Choose action:
   - **Print Packing Slips** - All at once
   - **Print Labels** - Batch shipping
   - **Mark as Shipped** - Bulk status update
   - **Send Emails** - Customer notifications
   - **Export** - To CSV/Excel
3. Confirm and execute

## Order Editing

### Modifying Orders

Make changes to existing orders:

**Add Items:**
1. Click "Add Item"
2. Search product
3. Set quantity and price
4. Update totals

**Remove Items:**
1. Click × next to item
2. Confirm removal
3. Recalculate totals

**Update Quantities:**
1. Change quantity
2. Click "Update"
3. Adjust pricing if needed

**Change Address:**
1. Click "Edit Address"
2. Update shipping address
3. Recalculate shipping cost

**Apply Discounts:**
1. Click "Add Discount"
2. Enter code or amount
3. Apply to order
4. Notify customer of adjustment

### Refund Processing

Handle refunds:

**Full Refund:**
1. Click "Refund Order"
2. Select all items
3. Choose refund method
4. Process refund
5. Update order status

**Partial Refund:**
1. Click "Refund Items"
2. Select items to refund
3. Enter quantities
4. Adjust refund amount
5. Process refund

**Refund Options:**
- Original payment method
- Store credit
- Manual (cash/check)

## Customer Communication

### Email Notifications

Automated emails sent to customers:

- **Order Confirmation** - Immediately after purchase
- **Payment Received** - When payment clears
- **Order Shipped** - When tracking added
- **Delivery Confirmation** - When marked delivered
- **Refund Processed** - When refund issued

**Customize Emails:**
- Edit subject lines
- Modify email body
- Add custom branding
- Include additional information

### Manual Communication

Contact customers directly:

**Send Email:**
1. Click "Email Customer"
2. Choose template or write custom
3. Attach files if needed
4. Send

**Add Note:**
1. Click "Add Note"
2. Write message
3. Choose visibility:
   - **Private** - Admin only
   - **Customer** - Visible to customer
4. Save

## Returns & Exchanges

### Return Management

Process customer returns:

**Create Return:**
1. Click "Create Return"
2. Select items to return
3. Choose reason:
   - Defective
   - Wrong item
   - Changed mind
   - Other
4. Generate return label (optional)
5. Send instructions to customer

**Return Statuses:**
- **Requested** - Customer initiated
- **Approved** - Return authorized
- **In Transit** - Item being returned
- **Received** - Item back in warehouse
- **Inspected** - Quality check complete
- **Refunded** - Money returned
- **Restocked** - Added back to inventory

### Exchange Processing

Handle product exchanges:

1. Create return for original item
2. Create new order for replacement
3. Waive shipping fees
4. Link orders together
5. Process both transactions

## Printing Documents

### Available Documents

Print order-related documents:

**Packing Slip:**
- Order items
- Quantities
- Customer address
- Special instructions

**Invoice:**
- Itemized charges
- Payment information
- Tax breakdown
- Company details

**Shipping Label:**
- Recipient address
- Return address
- Tracking barcode
- Carrier information

**Pick List:**
- Product locations
- SKUs
- Quantities needed
- Warehouse bins

### Print Settings

Configure printing:

- **Paper Size** - A4, Letter, Label
- **Print Margins** - Adjust for printer
- **Logo** - Include/exclude company logo
- **Footer** - Custom footer text
- **Color** - Color or black & white

## Order Analytics

### Performance Metrics

Track order metrics:

- **Average Order Value** - Total revenue ÷ orders
- **Orders per Day** - Daily order volume
- **Fulfillment Speed** - Time to ship
- **Delivery Time** - Ship to delivery
- **Return Rate** - Returns ÷ total orders

### Popular Products

Best-selling items by:

- **Quantity Sold** - Most units
- **Revenue Generated** - Highest value
- **Order Frequency** - Most common

### Customer Insights

Order patterns:

- **New vs Returning** - Customer type ratio
- **Average Items per Order** - Cart size
- **Peak Order Times** - Busiest hours/days
- **Geographic Distribution** - Sales by location

## Advanced Features

### Order Tags

Organize orders:

- `wholesale` - Bulk orders
- `priority` - Rush orders
- `gift` - Gift orders
- `international` - Cross-border
- `dropship` - Third-party fulfillment

### Automation Rules

Set up automated workflows:

**Auto-Fulfill Digital Products:**
- Trigger: Payment received
- Action: Send download link
- Condition: Product type = digital

**Flag High-Value Orders:**
- Trigger: Order total > $500
- Action: Add `high-value` tag
- Notification: Alert manager

**Abandoned Cart Recovery:**
- Trigger: Cart inactive 1 hour
- Action: Send reminder email
- Offer: 10% discount code

### Fraud Detection

Protect against fraudulent orders:

**Risk Indicators:**
- 🔴 High Risk - Review required
- 🟡 Medium Risk - Verify identity
- 🟢 Low Risk - Process normally

**Red Flags:**
- Large order, first-time customer
- Billing address ≠ Shipping address
- Multiple orders same card
- International high-value order
- Email domain suspicious

**Actions:**
- Hold order for review
- Request ID verification
- Contact customer
- Cancel and refund

## Integration

### Shipping Carriers

Connect shipping providers:

- **USPS** - US Postal Service
- **UPS** - United Parcel Service
- **FedEx** - Federal Express
- **DHL** - International shipping
- **Custom** - Local couriers

**Features:**
- Real-time rates
- Label printing
- Tracking updates
- Address validation

### Order Export

Export orders to:

- **Accounting Software** - QuickBooks, Xero
- **Fulfillment Centers** - ShipStation, ShipBob
- **ERP Systems** - SAP, NetSuite
- **Spreadsheets** - CSV, Excel

## Tips & Best Practices

### Daily Tasks

✅ Review overnight orders
✅ Process pending orders
✅ Print packing slips
✅ Update tracking numbers
✅ Respond to customer inquiries

### Efficiency Tips

- Use keyboard shortcuts (Cmd/Ctrl + P to print)
- Save common responses as templates
- Process orders in batches
- Use bulk actions
- Set up automation rules

### Customer Service

- Respond within 2 hours
- Be proactive with updates
- Apologize for delays
- Offer solutions, not excuses
- Follow up after delivery

## Next Steps

- **[Manage Customers](/admin/customers)** - View customer profiles
- **[Track Inventory](/admin/inventory)** - Monitor stock levels
- **[Set Up Shipping](/admin/shipping)** - Configure shipping methods
