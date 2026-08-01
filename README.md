# Riky Pharma - Pharmaceutical Web Application

A professional full-stack pharmaceutical web application for Riky Pharma, owned by B. Indumathi Ramkumar.

## Features

- 👤 Customer Login (Name + Mobile)
- 📦 Product Browsing (21 Medicines with Category Icons)
- 🛒 Shopping Cart
- 💰 Bill Generation with PDF Download
- 💳 UPI Payment Integration with QR Code
- 📜 Customer Purchase History (Complete Order Details)
- 🎨 Product Category Icons (Tablets, Capsules, Syrups, Gels, Sachets)
- 📱 Responsive Design (Mobile & Desktop)

## Tech Stack

- React 18 + TypeScript
- React Router for navigation
- Tailwind CSS v4 for styling
- Motion (Framer Motion) for animations
- jsPDF + html2canvas for PDF generation
- QRCode.react for UPI payment QR codes

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. Open browser at `http://localhost:5173`

## Deploying to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy" (auto-configured!)

See `SETUP_AND_DEPLOYMENT.md` for detailed instructions.

## Business Information

**Riky Pharma**
- Owned by: B. Indumathi Ramkumar
- Address: Tamil Sangam Road, Maninagaram, Madurai, Tamil Nadu - 625001
- Phone: 9789555188
- Email: rikyfamily1@gmail.com
- Established: October 16, 2017
- UPI ID: crramkumar1976-2@okicici

## Products

The application features **21 pharmaceutical products** across categories:
- 💊 **Tablets** (9 products) - Blue circular icons
- 💊 **Capsules** (2 products) - Green oval icons
- 🧪 **Syrups** (6 products) - Purple bottle icons
- 🧴 **Gels** (2 products) - Teal tube icons
- 📦 **Sachets** (1 product) - Orange packet icon

### Featured Product:
- **RIKY GEL SYRUP** - For acidity and digestive problems (₹95)

## Key Features

### Customer Purchase History
- View complete order history with bill numbers
- See all purchased items with quantities and prices
- Accessible via Receipt icon on home page
- Stores last 100 purchases locally

### Product Catalog
- Search by product name or composition
- Filter by category
- Visual category icons for easy identification
- Real-time cart updates

### Payment & Billing
- Professional bill generation
- Download bills as PDF
- Print functionality
- UPI payment with QR code (crramkumar1976-2@okicici)
- Cash and card payment options

## License

© 2026 Riky Pharma. All rights reserved.
