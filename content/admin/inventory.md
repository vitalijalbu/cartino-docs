---
title: =Ê Inventory Control
description: Track stock levels, manage locations, and handle transfers
navigation:
  icon: i-lucide-warehouse
layout: admin
---

## Inventory Control Overview

Manage your stock across multiple locations, track inventory movements, and ensure optimal stock levels to meet customer demand.

## Stock Dashboard

### Real-Time Stock Levels

Monitor inventory at a glance:

- **Total Products** - Number of SKUs
- **Total Stock Value** - Current inventory value
- **Low Stock Items** - Products below reorder point
- **Out of Stock** - Items unavailable
- **Overstock Items** - Excess inventory

### Stock Alerts

Automated notifications:

- =4 **Critical** - Out of stock
- =à **Low** - Below reorder point
- =á **Warning** - Approaching low stock
- =â **Healthy** - Adequate stock levels

## Multi-Location Management

### Warehouse Locations

Manage multiple stock locations:

**Location Types:**
- **Warehouses** - Main storage facilities
- **Retail Stores** - Physical store locations
- **Dropship Locations** - Third-party fulfillment
- **Consignment** - Stock at partner locations

### Location Setup

Configure warehouse:

1. Click **Add Location**
2. Enter location details:
   - Location Name
   - Address
   - Contact Person
   - Phone/Email
   - Location Type
3. Set as default (optional)
4. Save location

**Location Information:**
```
Main Warehouse
1234 Industrial Blvd
Los Angeles, CA 90001
Contact: John Manager
Phone: (555) 123-4567
Email: [email protected]
```

### Stock by Location

View inventory distribution:

| Product | Total | Main Warehouse | NYC Store | LA Store |
|---------|-------|----------------|-----------|----------|
| T-Shirt Blue/M | 75 | 50 | 15 | 10 |
| Jeans Black/32 | 42 | 30 | 8 | 4 |
| Sneakers/10 | 18 | 12 | 3 | 3 |

## Stock Movements

### Movement Types

Track all inventory changes:

**Inbound:**
- • **Purchase Order** - Stock received from supplier
- • **Return** - Customer return
- • **Transfer In** - From another location
- • **Adjustment** - Manual increase

**Outbound:**
- – **Sale** - Order fulfillment
- – **Transfer Out** - To another location
- – **Damage** - Write-off
- – **Adjustment** - Manual decrease

### Movement History

Track every change:

```
Dec 9, 10:35 AM - Sale
  Product: T-Shirt Blue/M
  Quantity: -2
  Location: Main Warehouse
  Order: #1234
  New Stock: 48

Dec 9, 9:15 AM - Transfer In
  Product: T-Shirt Blue/M
  Quantity: +20
  From: Supplier XYZ
  To: Main Warehouse
  PO: #PO-5678
  New Stock: 50

Dec 8, 3:30 PM - Adjustment
  Product: T-Shirt Blue/M
  Quantity: -3
  Location: Main Warehouse
  Reason: Damaged items
  Staff: John Doe
  New Stock: 30
```

## Stock Transfers

### Transfer Between Locations

Move inventory:

1. Click **Create Transfer**
2. Select source location
3. Select destination location
4. Add products and quantities
5. Add notes (optional)
6. Create transfer

**Transfer Workflow:**
```
Initiated ’ In Transit ’ Received ’ Completed
```

**Transfer Details:**
```
Transfer #T-001234
From: Main Warehouse
To: NYC Store
Status: In Transit
Created: Dec 9, 2025
Expected: Dec 11, 2025

Items:
- T-Shirt Blue/M × 20
- Jeans Black/32 × 10

Notes: Restocking for holiday season
```

### Bulk Transfers

Transfer multiple products:

1. Select products (checkboxes)
2. Click **Bulk Transfer**
3. Choose destination
4. Set quantities
5. Confirm transfer

## Stock Adjustments

### Manual Adjustments

Correct inventory discrepancies:

**Reasons for Adjustment:**
- Physical count correction
- Damaged goods
- Lost items
- Found items
- System error correction

**Adjustment Form:**
1. Select product and location
2. Enter new quantity or adjustment amount
3. Choose reason
4. Add notes
5. Submit adjustment

**Example:**
```
Product: T-Shirt Blue/M
Location: Main Warehouse
Current Stock: 45
Adjustment: -3
New Stock: 42
Reason: Damaged
Notes: Water damage from roof leak
Staff: John Doe
Date: Dec 9, 2025
```

### Stock Takes

Physical inventory counts:

1. **Create Stock Take**
   - Select location
   - Select products (all or filtered)
   - Assign staff
   - Set deadline

2. **Count Inventory**
   - Print count sheets
   - Scan or manually count
   - Enter quantities

3. **Review Discrepancies**
   - Compare counted vs system
   - Investigate differences
   - Approve adjustments

4. **Apply Adjustments**
   - Update stock levels
   - Generate report

## Purchase Orders

### Creating Purchase Orders

Order stock from suppliers:

1. Click **Create Purchase Order**
2. Select supplier
3. Add products and quantities
4. Set expected delivery date
5. Enter costs
6. Submit PO

**PO Information:**
```
PO #PO-5678
Supplier: ABC Wholesale
Date: Dec 9, 2025
Expected: Dec 16, 2025
Status: Pending

Items:
- T-Shirt Blue/M × 100 @ $8.00 = $800.00
- Jeans Black/32 × 50 @ $20.00 = $1,000.00

Subtotal: $1,800.00
Shipping: $50.00
Tax: $148.00
Total: $1,998.00
```

### PO Status Tracking

Monitor purchase orders:

- **Draft** - Being prepared
- **Submitted** - Sent to supplier
- **Confirmed** - Supplier accepted
- **Partial** - Some items received
- **Received** - All items received
- **Cancelled** - Order cancelled

### Receiving Stock

Process incoming inventory:

1. Open purchase order
2. Click **Receive Items**
3. Enter received quantities
4. Check quality
5. Update stock levels
6. Mark PO as received

**Partial Receiving:**
- Receive items as they arrive
- Track outstanding items
- Close PO when complete

## Reorder Management

### Automatic Reorder Points

Set triggers for restocking:

**Product Settings:**
- **Reorder Point** - Trigger level (e.g., 10 units)
- **Reorder Quantity** - Amount to order (e.g., 50 units)
- **Lead Time** - Days until delivery (e.g., 7 days)
- **Safety Stock** - Buffer quantity (e.g., 5 units)

**Example:**
```
Product: T-Shirt Blue/M
Current Stock: 12 units
Reorder Point: 15 units
Status: =á Below reorder point

Recommended Action:
Order 50 units from Supplier ABC
Lead Time: 7 days
Expected Delivery: Dec 16, 2025
```

### Reorder Suggestions

Smart recommendations:

- **Based on Sales Velocity** - Past 30/60/90 days
- **Seasonal Trends** - Historical patterns
- **Upcoming Promotions** - Planned campaigns
- **Safety Stock** - Buffer for demand spikes

### Supplier Management

Track supplier information:

**Supplier Details:**
- Company Name
- Contact Person
- Email/Phone
- Address
- Payment Terms
- Lead Time
- Minimum Order

**Supplier Performance:**
- On-time Delivery Rate
- Quality Score
- Average Lead Time
- Total Orders
- Total Spend

## Stock Reports

### Inventory Valuation

Calculate stock value:

- **Cost Method** - FIFO, LIFO, Average Cost
- **Total Value** - Sum of all inventory
- **Value by Location** - Breakdown by warehouse
- **Value by Category** - Product group analysis

### Stock Movement Report

Analyze inventory flow:

**Report Metrics:**
- Units Received
- Units Sold
- Units Transferred
- Units Adjusted
- Net Change

**Time Periods:**
- Today
- This Week
- This Month
- Custom Range

### Low Stock Report

Products needing attention:

| Product | Current | Reorder Point | Status | Action |
|---------|---------|---------------|--------|--------|
| T-Shirt Blue/M | 8 | 15 | =4 Critical | Order Now |
| Jeans Black/32 | 12 | 10 | =â OK | Monitor |
| Sneakers/10 | 3 | 5 | =à Low | Order Soon |

### Dead Stock Report

Slow-moving inventory:

**Criteria:**
- No sales in 90+ days
- High stock quantity
- Low demand forecast

**Actions:**
- Run promotion
- Bundle with popular items
- Liquidate
- Return to supplier

### ABC Analysis

Classify inventory by value:

- **A Items** (20%) - High value, 80% of revenue
  - Close monitoring
  - Tight control
  - Frequent orders

- **B Items** (30%) - Moderate value, 15% of revenue
  - Standard monitoring
  - Normal controls

- **C Items** (50%) - Low value, 5% of revenue
  - Minimal monitoring
  - Bulk ordering

## Barcode Management

### Barcode Scanning

Use scanners for efficiency:

- **Receiving** - Scan items on delivery
- **Stock Take** - Count inventory
- **Picking** - Fulfill orders
- **Transfers** - Move stock

### Barcode Generation

Create product barcodes:

- **EAN-13** - European standard
- **UPC** - North American standard
- **Code 128** - Internal use
- **QR Code** - Mobile scanning

**Print Options:**
- Individual labels
- Bulk printing
- Shelf tags
- Bin labels

## Integration

### Accounting Systems

Sync with financial software:

- **QuickBooks** - Automatic stock valuation
- **Xero** - Cost of goods sold
- **Sage** - Purchase orders
- **Custom ERP** - API integration

### Warehouse Management

Connect with WMS:

- **ShipStation** - Order fulfillment
- **ShipBob** - 3PL integration
- **Fulfillment by Amazon** - FBA inventory
- **Custom WMS** - API connection

## Best Practices

### Daily Tasks

 Review overnight orders
 Check low stock alerts
 Process incoming shipments
 Update stock levels
 Review pending transfers

### Weekly Tasks

 Run stock take for high-value items
 Review reorder suggestions
 Analyze dead stock
 Check supplier performance
 Reconcile stock movements

### Monthly Tasks

 Full inventory valuation
 ABC analysis
 Review supplier contracts
 Update reorder points
 Audit stock discrepancies

### Optimization Tips

-  Use barcode scanning
-  Set accurate reorder points
-  Maintain safety stock
-  Regular stock takes
-  Track supplier performance
-  Monitor stock turnover
-  Reduce dead stock

## Troubleshooting

### Negative Stock

**Causes:**
- Orders shipped before stock updated
- Multiple sales of same item
- System timing issues

**Solutions:**
1. Review recent transactions
2. Check for double counting
3. Adjust stock manually
4. Investigate root cause

### Stock Discrepancies

**Common Issues:**
- Theft or loss
- Receiving errors
- Picking mistakes
- System errors

**Resolution:**
1. Conduct stock take
2. Compare with system
3. Investigate differences
4. Document findings
5. Apply adjustments

## Next Steps

- **[Process Orders](/admin/orders)** - Fulfill customer orders
- **[Manage Products](/admin/products)** - Update product catalog
- **[View Dashboard](/admin/dashboard)** - Monitor performance
- **[Configure Settings](/admin/settings)** - System configuration
