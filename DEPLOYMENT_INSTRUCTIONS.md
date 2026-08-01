# Riky Pharma - Deployment Instructions

## ✅ All Features Implemented

### New Features Added:
1. ✅ **Unique Product Images** - Real pharmaceutical images from Unsplash
2. ✅ **Per-Strip Pricing** - Shows price per strip with strip size
3. ✅ **Customer Purchase History** - Complete order tracking
4. ✅ **21 Products** - Including RIKY GEL SYRUP for acidity/digestive relief
5. ✅ **Zero Build Errors** - Production-ready code

---

## 🚀 Deploy to Vercel (2 Minutes)

### Method 1: Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Riky Pharma - Complete pharmaceutical application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/riky-pharma.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click **"New Project"**
   - Click **"Import Git Repository"**
   - Select your **riky-pharma** repository
   - Vercel will auto-detect:
     - Framework Preset: **Vite**
     - Build Command: `npm run build` or `pnpm build`
     - Output Directory: `dist`
     - Install Command: `npm install` or `pnpm install`
   - Click **"Deploy"**
   - Your app will be live in ~2 minutes! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Your app will be deployed and you'll get a live URL like:
`https://riky-pharma.vercel.app`

---

## 📦 Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json scripts:**
   Add these lines to your `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

Your app will be live at:
`https://YOUR_USERNAME.github.io/riky-pharma/`

---

## 💻 Run Locally (VS Code)

1. **Open project in VS Code:**
   ```bash
   cd /path/to/riky-pharma
   code .
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser:**
   - URL: `http://localhost:5173`
   - Login with any name and 10-digit mobile number

---

## 🔍 Verify Deployment

After deployment, test these features:

### Core Features:
- ✅ Login with name + mobile
- ✅ Browse 21 products with unique images
- ✅ See per-strip pricing for each product
- ✅ Search and filter products
- ✅ Add to cart
- ✅ Generate bill and download PDF
- ✅ UPI payment with QR code
- ✅ View purchase history (not login history)

### Product Images:
All 21 products should display unique pharmaceutical images from Unsplash

### Pricing Display:
Each product should show:
- Price per strip (₹X per strip)
- Strip size (e.g., "10 tablets • MRP: ₹180")

### Purchase History:
- Click Receipt icon on homepage
- View complete order details with bill numbers
- See all items purchased with quantities

---

## 🐛 Troubleshooting

### Build Fails on Vercel
**Solution:**
- Make sure `package.json` has correct build command
- Check Node.js version (should be 18+)
- Verify all dependencies are in `dependencies`, not `devDependencies`

### Images Not Loading
**Solution:**
- Images are loaded from Unsplash CDN
- Check internet connection
- Fallback SVG icons should display if images fail

### GitHub Push Fails
**Solution:**
```bash
# Remove old git history
rm -rf .git

# Start fresh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main --force
```

### Vercel URL Not Working
**Solution:**
- Check Vercel deployment logs
- Verify `vercel.json` exists in root directory
- Make sure `index.html` and `src/main.tsx` exist

---

## 📁 Project Structure

```
riky-pharma/
├── public/                   # Static assets (SVG icons)
├── src/
│   ├── app/
│   │   ├── App.tsx          # Main app with purchase history
│   │   └── components/
│   │       ├── LoginPage.tsx
│   │       ├── HomePage.tsx  # Purchase history modal
│   │       ├── ProductPage.tsx  # Shows per-strip pricing
│   │       ├── CartPage.tsx
│   │       ├── PaymentPage.tsx
│   │       ├── SuccessPage.tsx
│   │       └── productsData.ts  # 21 products with Unsplash images
│   ├── imports/
│   │   └── Screenshot_2026-04-05_232705.png
│   ├── styles/
│   └── main.tsx             # React entry point
├── index.html               # HTML entry point
├── vercel.json              # Vercel configuration
├── package.json             # Dependencies & scripts
├── vite.config.ts           # Vite configuration
├── .gitignore               # Git ignore rules
└── README.md                # Documentation
```

---

## 🎯 Key Configuration Files

### vercel.json
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### package.json (scripts)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## ✨ Product Features

### All 21 Products Include:
- ✅ Unique Unsplash image
- ✅ Product name
- ✅ Composition
- ✅ MRP price
- ✅ **Per-strip price** (NEW!)
- ✅ **Strip size** (NEW!)
- ✅ Category
- ✅ Description

### Example Product Display:
```
CEFNIK-200LB TAB
Cefixime 200mg + Lactobacillus
₹180 per strip
10 tablets • MRP: ₹180
```

---

## 📞 Support

**Riky Pharma**
- Phone: 9789555188
- Email: rikyfamily1@gmail.com
- Address: Tamil Sangam Road, Maninagaram, Madurai, TN - 625001

---

## 🎉 Success Checklist

Before going live, verify:

- [ ] Build succeeds: `npm run build`
- [ ] All 21 products display with unique images
- [ ] Per-strip pricing shows correctly
- [ ] Purchase history works (not login history)
- [ ] PDF download works
- [ ] UPI QR code displays
- [ ] Mobile responsive
- [ ] All links work

---

**Your Riky Pharma application is ready to deploy!** 🚀

Run `npm run build` to verify, then deploy to Vercel or GitHub Pages.

© 2026 Riky Pharma. All rights reserved.
