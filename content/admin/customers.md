---
title: 👥 Customer Management
description: Manage customer accounts, groups, and relationships
navigation:
  icon: i-lucide-users
layout: admin
---

## Customer Management Overview

Build lasting relationships with your customers by managing accounts, tracking purchase history, creating customer segments, and providing personalized experiences.

## Customer List

### View All Customers

Browse your customer database:

| Name | Email | Orders | Total Spent | Status | Last Order |
|------|-------|--------|-------------|--------|------------|
| John Doe | [email protected] | 15 | $2,450 | Active | 2 days ago |
| Jane Smith | [email protected] | 12 | $1,890 | Active | 1 week ago |
| Bob Wilson | [email protected] | 10 | $1,650 | Inactive | 3 months ago |

### Filtering Customers

Find specific customers:

**Quick Filters:**
- All Customers
- Active (ordered recently)
- Inactive (no recent orders)
- VIP (high lifetime value)
- New (registered recently)
- Wholesale

**Advanced Filters:**
- Total Spent (range)
- Order Count (minimum)
- Last Order Date
- Registration Date
- Customer Group
- Location
- Tags

### Sorting Options

Order customers by:

- Name (A-Z)
- Total Spent (highest first)
- Order Count (most orders)
- Last Order Date (recent first)
- Registration Date (newest first)

## Customer Profile

### Customer Information

Complete customer details:

**Personal Information:**
- Full Name
- Email Address
- Phone Number
- Date of Birth
- Account Status (Active/Disabled)
- Registration Date
- Last Login

**Addresses:**

**Shipping Addresses:**
```
John Doe
123 Main Street, Apt 4B
New York, NY 10001
United States
[Default]
```

**Billing Addresses:**
```
John Doe
456 Business Ave
New York, NY 10002
United States
```

**Multiple Addresses:**
- Set default shipping
- Set default billing
- Add/edit/delete addresses

### Order History

Complete purchase record:

| Order # | Date | Items | Total | Status |
|---------|------|-------|-------|--------|
| #1234 | Dec 9 | 3 | $125.00 | Shipped |
| #1189 | Nov 28 | 2 | $89.99 | Delivered |
| #1145 | Nov 15 | 1 | $49.99 | Delivered |

**Quick Actions:**
- View order details
- Reorder (create cart with same items)
- Email invoice
- Process return

### Purchase Analytics

Customer metrics:

**Lifetime Stats:**
- Total Orders: 15
- Total Spent: $2,450
- Average Order Value: $163.33
- First Order: Jan 15, 2024
- Last Order: Dec 9, 2025

**Purchase Frequency:**
- Orders per Month: 1.2
- Days Since Last Order: 2
- Average Days Between Orders: 25

**Product Preferences:**
- Top Category: Clothing (60%)
- Favorite Products: [List]
- Typical Cart Size: 2.5 items

### Customer Activity

Timeline of interactions:

```
Dec 9, 2025 - Placed Order #1234
  3 items, $125.00

Nov 28, 2025 - Contacted Support
  Subject: Shipping inquiry
  Resolved

Nov 15, 2025 - Left Review
  Product: Blue T-Shirt
  Rating: 5 stars

Oct 30, 2025 - Subscribed to Newsletter
```

## Customer Groups

### Default Groups

Pre-configured customer segments:

**Retail Customers:**
- Standard pricing
- Regular shipping rates
- No minimum order

**Wholesale Customers:**
- 30% discount
- Free shipping over $500
- Minimum order: $250
- Net 30 payment terms

**VIP Customers:**
- 15% discount
- Free shipping always
- Priority support
- Early access to sales

### Creating Custom Groups

Define your own segments:

1. Click **Add Customer Group**
2. Enter group name and description
3. Set benefits:
   - Discount percentage
   - Shipping rules
   - Payment terms
   - Price list
4. Save group

### Assigning Customers

Add customers to groups:

**Manually:**
1. Open customer profile
2. Select customer group
3. Save changes

**Automatically:**
Create rules to auto-assign:
- Total spent > $5,000 → VIP
- Orders > 10 → Loyalty
- Business email → Wholesale

## Customer Tags

### Using Tags

Flexible customer labeling:

**Example Tags:**
- `newsletter-subscriber`
- `abandoned-cart`
- `high-risk`
- `referred-by-john`
- `holiday-shopper`
- `complained`
- `influencer`

**Apply Tags:**
- Single customer
- Bulk selection
- Import with CSV
- Automated rules

### Tag-Based Actions

Create workflows:

**Tag: `abandoned-cart`**
→ Send recovery email after 1 hour
→ Offer 10% discount

**Tag: `vip`**
→ Send birthday discount
→ Early access to new products

**Tag: `complained`**
→ Flag for support team
→ Offer goodwill credit

## Loyalty Program

### Fidelity Cards

Reward repeat customers:

**Card Setup:**
- Points per $1 spent: 10 points
- Points redemption: 100 points = $1
- Points expiration: 1 year

**Customer Card:**
```
John Doe - Card #FC12345
Points Balance: 2,450 points
Cash Value: $24.50
Tier: Gold
Member Since: Jan 2024
```

### Point Management

Manually adjust points:

**Add Points:**
1. Enter amount and reason
2. Example: "Goodwill credit for shipping delay"
3. Customer notified via email

**Deduct Points:**
1. Enter amount and reason
2. Example: "Redeemed for $25 discount"
3. Update balance

### Loyalty Tiers

Progressive benefits:

**Bronze (0-999 points):**
- 10 points per $1
- Birthday discount

**Silver (1,000-4,999 points):**
- 12 points per $1
- Free shipping
- Birthday discount

**Gold (5,000+ points):**
- 15 points per $1
- Free shipping
- Exclusive sales
- Priority support
- Birthday gift

## Customer Communication

### Email Templates

Pre-configured messages:

**Welcome Email:**
- Sent on registration
- Introduce store
- Offer first-order discount

**Birthday Email:**
- Automatic on birthday
- Special discount code
- Personalized message

**Win-Back Email:**
- Sent after 90 days inactive
- Exclusive offer
- Product recommendations

### Bulk Email

Email customer segments:

1. Select customers or group
2. Choose template or write custom
3. Personalize with variables:
   - `{{customer.name}}`
   - `{{customer.points}}`
   - `{{customer.lastorder}}`
4. Preview email
5. Send or schedule

### SMS Notifications

Text message alerts:

- Order confirmation
- Shipping updates
- Abandoned cart
- Flash sales
- Back-in-stock alerts

**Requirements:**
- Customer phone number
- SMS consent
- Twilio/SMS provider

## Customer Segmentation

### Automated Segments

Pre-built customer lists:

**High-Value Customers:**
- Spent > $1,000 lifetime
- Ordered in last 90 days

**At-Risk Customers:**
- Previously active
- No orders in 90 days
- High historical value

**New Customers:**
- Registered in last 30 days
- Less than 3 orders

**One-Time Buyers:**
- Exactly 1 order
- Order > 30 days ago

### Custom Segments

Create your own rules:

**Example: Holiday Shoppers**
- Last order in November or December
- Order total > $100
- Tagged with `gift`

**Marketing Use:**
- Target with holiday campaigns
- Offer early access to sales
- Send gift guides

## Customer Support

### Support Tickets

Track customer inquiries:

**Ticket Information:**
- Subject
- Customer name
- Order # (if related)
- Priority (Low/Medium/High/Urgent)
- Status (Open/Pending/Resolved)
- Assigned to (staff member)

**Ticket Workflow:**
1. Customer submits inquiry
2. Ticket created automatically
3. Assigned to support agent
4. Agent responds
5. Customer replies
6. Resolution
7. Ticket closed

### Common Issues

Quick responses for:

- **Shipping Delays** - Track package, provide update
- **Refund Requests** - Process refund, explain timeline
- **Product Questions** - Provide specifications
- **Account Issues** - Reset password, update info
- **Returns** - Generate return label, explain process

### Customer Notes

Internal documentation:

**Add Note:**
```
Dec 9, 2025 - Called about order #1234
Customer was very pleasant. Explained shipping delay due to weather.
Offered 10% discount on next order as goodwill gesture.
- Agent: Sarah
```

**Note Types:**
- General
- Support interaction
- Account alert
- Payment issue
- Fraud concern

## Importing/Exporting

### Import Customers

Bulk add customers:

1. Download CSV template
2. Fill in customer data:
   - First Name
   - Last Name
   - Email (required, unique)
   - Phone
   - Customer Group
   - Tags
3. Upload CSV
4. Map columns
5. Preview and import

**Data Validation:**
- Email format check
- Duplicate detection
- Required fields

### Export Customers

Download customer data:

**Export Options:**
- All customers
- Selected customers
- Customer segment
- Custom filter

**Export Fields:**
- Basic info
- Order history
- Loyalty points
- Custom fields

**Formats:**
- CSV
- Excel
- JSON

## GDPR Compliance

### Data Privacy

Comply with regulations:

**Customer Rights:**
- **Access** - Download their data
- **Rectify** - Update incorrect info
- **Erase** - Delete account (Right to be Forgotten)
- **Port** - Export data in standard format
- **Object** - Opt-out of marketing

### Data Management

**Customer Data Request:**
1. Customer submits request
2. Admin reviews
3. Generate data export
4. Send to customer (encrypted)

**Account Deletion:**
1. Customer requests deletion
2. Admin confirms identity
3. Anonymize order data (keep for accounting)
4. Delete personal information
5. Confirm with customer

### Consent Management

Track customer permissions:

- Marketing emails (opt-in/out)
- SMS notifications (opt-in/out)
- Data processing consent
- Cookie preferences

## Advanced Features

### Customer Merge

Combine duplicate accounts:

1. Find duplicate customers
2. Select customers to merge
3. Choose primary account
4. Merge order history
5. Update contact info
6. Delete duplicate

### Account Credit

Store credit management:

**Issue Credit:**
- Goodwill gesture
- Refund alternative
- Loyalty reward

**Credit Balance:**
```
John Doe - Store Credit
Balance: $50.00
Expires: Never
Issued: Dec 9, 2025
Reason: Compensation for shipping delay
```

**Credit Usage:**
- Auto-applies at checkout
- Partial or full use
- Combined with discounts

### Customer API

Programmatic access:

```php
// Get customer
GET /api/customers/{id}

// Update customer
PUT /api/customers/{id}

// Add order
POST /api/customers/{id}/orders

// Add points
POST /api/customers/{id}/points
```

## Reports

### Customer Reports

Generate insights:

**Customer Acquisition:**
- New customers per day/week/month
- Registration sources
- Conversion rate (visitor → customer)

**Customer Retention:**
- Repeat purchase rate
- Customer churn
- Average customer lifespan

**Customer Value:**
- Lifetime value distribution
- Top 10% customers (revenue)
- Average order value by group

## Best Practices

### Daily Tasks

✅ Review new registrations
✅ Respond to support tickets
✅ Check high-value orders
✅ Process refund requests

### Weekly Tasks

✅ Review customer feedback
✅ Analyze customer segments
✅ Send targeted campaigns
✅ Update customer groups

### Customer Service Tips

- Respond within 2 hours
- Personalize communications
- Anticipate needs
- Over-deliver on promises
- Thank loyal customers
