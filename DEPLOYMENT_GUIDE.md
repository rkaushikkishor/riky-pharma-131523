# Riky Pharma - Deployment Guide

## ✅ Changes Made

### 1. Logo Replacement
- Replaced all Pill icons with your custom logo (`Screenshot_2026-04-05_232705.png`)
- Updated in **LoginPage**, **HomePage**, **PaymentPage**, and **SuccessPage**
- Logo displays consistently across all pages

### 2. Customer Login History Feature
- Added a **History** button (green clock icon) on the HomePage
- Click the History button to view all customer login records
- Shows customer name, mobile number, and login date/time
- Stores up to 50 login records in localStorage
- Automatically saves every login to history

### 3. Project Setup for VS Code & Vercel
- Created `vercel.json` for proper SPA routing on Vercel
- Added dev scripts to `package.json`
- Created `src/main.tsx` as the entry point
- Created `.gitignore` for clean version control
- Created comprehensive `README.md` documentation

## 🚀 Running in VS Code

### Prerequisites
- Node.js 18+ installed
- pnpm installed (or use npm)

### Steps

1. **Open the project in VS Code**
   ```bash
   cd /path/to/riky-pharma
   code .
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   Or with npm:
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```
   Or with npm:
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The terminal will show the local URL (usually `http://localhost:5173`)
   - Open this URL in your browser

## 📦 Deploying to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **For production deployment**
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard (Easiest)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Riky Pharma application"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Configuration** (Auto-detected by Vercel)
   - Framework Preset: **Vite**
   - Build Command: `pnpm build` or `npm run build`
   - Output Directory: `dist`
   - Install Command: `pnpm install` or `npm install`

## 🎯 Features Overview

### Customer Login
- Name and 10-digit mobile number required
- Validates input before login
- Stores user session in localStorage
- Auto-login on return visits

### Customer Login History
- **NEW!** View all customer login records
- Accessible via History button (green clock icon) on HomePage
- Shows name, mobile, date, and time
- Stores last 50 logins
- Persists across browser sessions

### Product Catalog
- 20 pharmaceutical products
- Categories: Tablets, Capsules, Syrups, Gels, Sachets
- Search by product name or composition
- Filter by category
- Real-time cart updates

### Shopping Cart
- Add/remove items
- Adjust quantities
- View total amount
- Proceed to payment

### Payment & Bill
- UPI payment with QR code (UPI ID: crramkumar1976-2@okicici)
- Cash and Card payment options
- Professional bill generation
- Download bill as PDF
- Print bill functionality

### Success Page
- Order confirmation
- Order summary with bill number
- Quick navigation to home or products
- Rating system

## 📱 Responsive Design
- Optimized for mobile devices
- Tablet-friendly layout
- Desktop full experience
- Smooth animations throughout

## 🔧 Technical Stack
- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **PDF Generation**: jsPDF + html2canvas
- **QR Codes**: qrcode.react
- **Build Tool**: Vite 6
- **Package Manager**: pnpm

## 🐛 Troubleshooting

### Port already in use
If you get a port error, either:
- Close the application using that port
- Or specify a different port:
  ```bash
  pnpm dev -- --port 3000
  ```

### Build errors
Make sure all dependencies are installed:
```bash
rm -rf node_modules
pnpm install
```

### Images not loading
- Ensure the logo file exists at `src/imports/Screenshot_2026-04-05_232705.png`
- Check browser console for errors

### Vercel deployment fails
- Make sure `vercel.json` exists in the root directory
- Check that `package.json` has the correct build script
- Verify all dependencies are in `dependencies`, not `devDependencies`

## 📞 Support

**Riky Pharma**
- Phone: 9789555188
- Email: rikyfamily1@gmail.com
- Address: Tamil Sangam Road, Maninagaram, Madurai, TN - 625001

## ✨ What's New in This Version

1. ✅ **Custom Logo Integration** - Your stylized "R" logo now appears on all pages
2. ✅ **Login History Tracking** - Complete customer login history with timestamps
3. ✅ **VS Code Compatibility** - Ready to run in VS Code with `pnpm dev`
4. ✅ **Vercel Ready** - Configured for one-click deployment to Vercel
5. ✅ **Code Cleanup** - All errors fixed, removed unused imports
6. ✅ **Documentation** - Complete README and deployment guides

---

**Ready to go live!** 🚀

All code errors have been fixed, the logo has been updated, and the customer login history feature is fully functional. The application is production-ready for both VS Code development and Vercel deployment.
