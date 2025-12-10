---
title: ™ System Settings
description: Configure store settings, payments, shipping, and integrations
navigation:
  icon: i-lucide-settings
layout: admin
---

## System Settings Overview

Configure your e-commerce platform with comprehensive settings for general store information, payments, shipping, taxes, and third-party integrations.

## General Settings

### Store Information

Basic store configuration:

**Store Details:**
- **Store Name** - Your business name
- **Tagline** - Short description
- **Store Email** - Primary contact email
- **Support Email** - Customer service email
- **Phone Number** - Customer support line
- **Address** - Physical business address

**Example:**
```
Store Name: Cartino Shop
Tagline: Your Premium E-Commerce Store
Store Email: [email protected]
Support Email: [email protected]
Phone: +1 (555) 123-4567
Address: 123 Main St, New York, NY 10001
```

### Branding

Customize your brand identity:

- **Logo** - Main logo (recommended: 200×60px)
- **Favicon** - Browser icon (32×32px)
- **Brand Colors** - Primary, secondary, accent
- **Fonts** - Typography settings
- **Email Header** - Logo for email templates

### Regional Settings

Configure locale preferences:

- **Default Language** - English, Italian, Spanish, etc.
- **Timezone** - Store timezone
- **Date Format** - MM/DD/YYYY or DD/MM/YYYY
- **Time Format** - 12-hour or 24-hour
- **First Day of Week** - Sunday or Monday

### Currency

Set up currency options:

**Base Currency:**
- USD - US Dollar ($)
- EUR - Euro (¬)
- GBP - British Pound (£)
- Custom

**Multi-Currency:**
- Enable multiple currencies
- Auto-update exchange rates
- Currency display format
- Decimal places

## Store Preferences

### Checkout Settings

Configure checkout process:

**Account Options:**
- Require account creation
- Guest checkout enabled
- Social login (Google, Facebook)

**Order Processing:**
- Minimum order amount
- Maximum order amount
- Order prefix (e.g., ORD-)
- Order number format

**Terms & Conditions:**
- Require acceptance at checkout
- Link to terms page
- Privacy policy
- Cookie consent

### Cart Settings

Shopping cart configuration:

- **Cart Expiration** - Auto-clear after X days
- **Save for Later** - Enable wishlist
- **Persistent Cart** - Save between sessions
- **Quantity Limits** - Min/max per product
- **Stock Reservation** - Hold time in cart

### Tax Settings

Configure tax calculation:

**Tax Rules:**
- Tax-inclusive or tax-exclusive pricing
- Default tax rate
- Tax by location (state/country)
- Tax classes (standard, reduced, zero)

**Tax Configuration:**
```
Tax Class: Standard
Rate: 8.5%
Apply to: Shipping
Based on: Shipping address

Tax Class: Digital Goods
Rate: 0%
Apply to: Downloads only
```

## Payment Methods

### Payment Gateways

Configure payment processors:

**Stripe:**
- **Status** - Active/Inactive
- **Mode** - Test/Live
- **Publishable Key** - pk_live_...
- **Secret Key** - sk_live_...
- **Webhook Secret** - whsec_...
- **Payment Methods** - Cards, Wallets, BNPL

**PayPal:**
- **Status** - Active/Inactive
- **Mode** - Sandbox/Live
- **Client ID** - Your client ID
- **Client Secret** - Your client secret
- **Account Email** - [email protected]

**Bank Transfer:**
- **Bank Name** - Your bank
- **Account Number** - Account details
- **IBAN** - International number
- **SWIFT/BIC** - Bank code
- **Instructions** - Payment notes

**Cash on Delivery:**
- **Status** - Active/Inactive
- **Fee** - Extra charge (optional)
- **Availability** - Specific regions only

### Payment Options

Additional payment features:

- **Save Card Details** - Tokenization for repeat customers
- **3D Secure** - Enhanced security
- **Fraud Detection** - Automatic risk analysis
- **Partial Payments** - Deposits/installments
- **Refund Processing** - Automatic or manual

## Shipping Configuration

### Shipping Methods

Set up delivery options:

**Standard Shipping:**
- **Name** - Standard Delivery
- **Delivery Time** - 3-5 business days
- **Price** - $10.00
- **Free Threshold** - Orders over $50

**Express Shipping:**
- **Name** - Express Delivery
- **Delivery Time** - 1-2 business days
- **Price** - $25.00
- **No free threshold**

**Local Pickup:**
- **Name** - Store Pickup
- **Delivery Time** - Same day
- **Price** - Free
- **Location** - Store address

### Shipping Zones

Configure geographical zones:

**Zone 1: Domestic**
- **Countries** - United States
- **States** - All
- **Methods** - Standard, Express, Local Pickup

**Zone 2: International**
- **Countries** - Canada, Mexico
- **Methods** - International Standard
- **Price** - $35.00
- **Delivery** - 7-14 business days

### Shipping Rules

Advanced shipping logic:

**Weight-Based:**
```
0-5 lbs: $10
5-10 lbs: $15
10-20 lbs: $25
20+ lbs: $40
```

**Price-Based:**
```
$0-$50: $10
$50-$100: $5
$100+: Free
```

**Item-Based:**
```
1 item: $10
2-3 items: $15
4+ items: $20
```

### Carrier Integration

Connect shipping carriers:

- **USPS** - US Postal Service
- **UPS** - United Parcel Service
- **FedEx** - Federal Express
- **DHL** - International shipping

**Features:**
- Real-time rate calculation
- Label printing
- Tracking integration
- Address validation

## Email Configuration

### SMTP Settings

Configure email delivery:

**SMTP Server:**
- **Host** - smtp.gmail.com
- **Port** - 587 (TLS) or 465 (SSL)
- **Username** - Your email
- **Password** - App password
- **Encryption** - TLS/SSL
- **From Name** - Cartino Shop
- **From Email** - [email protected]

### Email Templates

Customize automated emails:

**Order Emails:**
- Order Confirmation
- Payment Received
- Order Shipped
- Delivery Confirmation
- Order Cancelled

**Customer Emails:**
- Welcome Email
- Password Reset
- Account Verification
- Newsletter Subscription

**Admin Emails:**
- New Order Notification
- Low Stock Alert
- Customer Registration
- Product Review

**Template Editor:**
- Subject line
- Email body (HTML/text)
- Variables: {{order.number}}, {{customer.name}}
- Preview and test

## User Management

### Admin Roles

Define access levels:

**Super Admin:**
- Full system access
- User management
- System settings
- Financial data

**Admin:**
- Products and orders
- Customers
- Marketing
- Limited settings

**Manager:**
- Order processing
- Inventory management
- Customer support
- Reports

**Staff:**
- Order fulfillment
- Customer support
- View products
- No financial access

### User Permissions

Granular control:

- **Products** - Create, edit, delete
- **Orders** - View, edit, cancel, refund
- **Customers** - View, edit, delete
- **Reports** - View, export
- **Settings** - View, edit
- **Users** - Manage staff

### Team Members

Manage admin users:

1. Click **Add Team Member**
2. Enter details:
   - Name
   - Email
   - Role
   - Permissions
3. Send invitation
4. User accepts and sets password

## SEO & Analytics

### SEO Settings

Optimize for search engines:

**Meta Tags:**
- **Site Title** - Default page title
- **Meta Description** - Site description
- **Keywords** - Relevant keywords (optional)

**URL Settings:**
- **URL Structure** - /products/product-name
- **Canonical URLs** - Prevent duplicates
- **Redirects** - Manage 301/302 redirects

**Sitemap:**
- Auto-generated XML sitemap
- Submit to search engines
- Update frequency

**Robots.txt:**
- Configure crawler access
- Disallow admin pages
- Allow product pages

### Analytics Integration

Track performance:

**Google Analytics:**
- **Tracking ID** - UA-XXXXXXXX-X or G-XXXXXXXXXX
- **Enhanced E-commerce** - Enable
- **IP Anonymization** - Privacy setting

**Google Tag Manager:**
- **Container ID** - GTM-XXXXXXX
- Custom event tracking
- Conversion tracking

**Facebook Pixel:**
- **Pixel ID** - XXXXXXXXXXXXXXX
- Track conversions
- Retargeting campaigns

## Integrations

### Marketing Tools

Connect marketing platforms:

**Email Marketing:**
- **Mailchimp** - Newsletter automation
- **Klaviyo** - E-commerce email
- **SendGrid** - Transactional email

**Social Media:**
- **Facebook** - Shop integration
- **Instagram** - Product tags
- **Pinterest** - Product pins
- **TikTok** - Catalog sync

### CRM Integration

Customer relationship management:

- **HubSpot** - Marketing automation
- **Salesforce** - Enterprise CRM
- **Zoho** - Business suite
- **Custom CRM** - API integration

### Accounting Software

Financial integration:

- **QuickBooks** - Sync orders and inventory
- **Xero** - Accounting automation
- **Sage** - Business accounting
- **FreshBooks** - Invoicing

### Other Integrations

Additional tools:

- **Zapier** - Connect 5000+ apps
- **Webhooks** - Custom integrations
- **REST API** - Developer access
- **GraphQL** - Advanced queries

## Security Settings

### Authentication

Secure access:

- **Two-Factor Authentication (2FA)** - Require for all admins
- **Password Policy** - Minimum 12 characters, complexity
- **Session Timeout** - Auto-logout after 30 minutes
- **Login Attempts** - Lock after 5 failed attempts

### SSL/TLS

Secure connections:

- **Force HTTPS** - Redirect all traffic
- **SSL Certificate** - Valid certificate required
- **HSTS** - HTTP Strict Transport Security
- **Mixed Content** - Block insecure resources

### Data Protection

Privacy and compliance:

- **GDPR Compliance** - EU data protection
- **Cookie Consent** - Banner and preferences
- **Data Retention** - Auto-delete old data
- **Customer Data Export** - Right to access
- **Account Deletion** - Right to be forgotten

### Backup & Recovery

Protect your data:

- **Automatic Backups** - Daily at 3:00 AM
- **Backup Retention** - Keep 30 days
- **Backup Location** - Cloud storage
- **Restore Options** - Point-in-time recovery
- **Export Data** - Manual backup anytime

## Maintenance Mode

### Enable Maintenance

Put store offline:

1. Enable maintenance mode
2. Set custom message:
   - "We're updating our store"
   - "Back soon!"
   - Custom HTML
3. Whitelist admin IPs
4. Save settings

**Maintenance Page:**
- Custom message
- Estimated downtime
- Contact information
- Social media links

## Advanced Settings

### Performance

Optimize speed:

- **Caching** - Page cache, object cache
- **CDN** - Content delivery network
- **Image Optimization** - Automatic compression
- **Lazy Loading** - Load images on scroll
- **Minification** - CSS/JS compression

### Developer Settings

Technical configuration:

- **Debug Mode** - Enable error logging
- **API Keys** - Generate access tokens
- **Webhooks** - Configure event notifications
- **Custom Code** - Header/footer scripts
- **Database** - Connection settings

### Localization

Multi-language support:

- **Available Languages** - Add/remove languages
- **Translation Interface** - Edit translations
- **Auto-Translate** - AI-powered translation
- **RTL Support** - Right-to-left languages

## Import/Export

### Data Management

Bulk operations:

**Export Options:**
- Products (CSV/Excel)
- Orders (CSV/Excel)
- Customers (CSV/Excel)
- Settings (JSON)

**Import Options:**
- Products from CSV
- Customers from CSV
- Orders from other platforms
- Migration tools

## System Information

### System Status

Monitor system health:

- **Version** - Current Cartino version
- **PHP Version** - 8.2.0 (recommended 8.1+)
- **Database** - MySQL 8.0
- **Disk Space** - 45GB / 100GB used
- **Memory** - 512MB limit

### Logs & Debugging

Troubleshoot issues:

- **Error Logs** - System errors
- **Activity Logs** - Admin actions
- **Email Logs** - Sent emails
- **Payment Logs** - Transaction history
- **API Logs** - External requests

## Next Steps

- **[View Dashboard](/admin/dashboard)** - Monitor your store
- **[Manage Products](/admin/products)** - Add your catalog
- **[Process Orders](/admin/orders)** - Handle customer orders
- **[Configure Shipping](/admin/shipping)** - Set up delivery options
