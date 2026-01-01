# 🚀 Lifeline MVP — Deploy to Vercel (Ready NOW)

Your Lifeline MVP is **production-ready**. Follow these exact steps to deploy to Vercel.

---

## **Step 1: Create GitHub Repository** (5 minutes)

### 1.1 Initialize Git in your project
```powershell
cd C:\Users\hp\OneDrive\Desktop\lifeline
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Lifeline MVP - SEO-first product comparison platform"
```

### 1.2 Create repository on GitHub
1. Go to https://github.com/new
2. Repository name: `lifeline-mvp`
3. Description: "SEO-first product comparison platform for mobiles, tablets, and gadgets with affiliate links"
4. Public or Private: Your choice
5. **Skip** "Add .gitignore" (already have it)
6. **Skip** "Add README" (already have it)
7. Click **Create repository**

### 1.3 Connect local to GitHub
```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lifeline-mvp.git
git push -u origin main
```

---

## **Step 2: Create Vercel Account** (2 minutes)

1. Go to https://vercel.com/signup
2. Sign up with GitHub (easiest option)
3. Authorize Vercel to access your GitHub account

---

## **Step 3: Deploy to Vercel** (3 minutes)

### 3.1 Import Project
1. Log in to Vercel: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/lifeline-mvp.git`
5. Click **"Import"**

### 3.2 Configure Environment Variables
Vercel will show "Environment Variables" step. Add these:

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | Your PostgreSQL connection string (Supabase/Neon) | `postgresql://user:password@db.supabase.co:5432/postgres` |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` | `jUX7zPwR+kL9...` |
| `NEXTAUTH_URL` | Your production domain | `https://lifeline-mvp.vercel.app` |
| `NEXT_PUBLIC_SITE_URL` | Same as NEXTAUTH_URL | `https://lifeline-mvp.vercel.app` |
| `AMAZON_ASSOCIATE_TAG` | Your Amazon tag (optional for MVP) | `lifelinetech-21` |
| `AMAZON_API_KEY` | Amazon PA API key (optional) | `AKIAIOSFODNN7EXAMPLE` |
| `FLIPKART_API_KEY` | Flipkart affiliate key (optional) | `your_flipkart_key` |

**For MVP start, minimum required:**
- `NEXTAUTH_SECRET` (auto-generated random string)
- `NEXT_PUBLIC_SITE_URL` (your Vercel URL)

### 3.3 Framework & Build Settings
Vercel auto-detects:
- **Framework Preset:** Next.js ✅ (already selected)
- **Build Command:** `npm run build` ✅ (correct)
- **Output Directory:** `.next` ✅ (correct)

**Click "Deploy"** — Vercel will build and deploy!

---

## **Step 4: Setup PostgreSQL Database** (5 minutes)

Choose ONE option:

### Option A: Supabase (Recommended)
1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Project name: `lifeline-mvp`
4. Database password: Save securely
5. Region: Choose closest to you
6. Click **"Create new project"** (takes ~2 mins)
7. Go to **Settings** → **Database** → Copy **Connection string** (URI)
8. In Vercel dashboard: **Settings** → **Environment Variables**
9. Add: `DATABASE_URL` = (paste Supabase connection string)

### Option B: Neon (PostgreSQL)
1. Go to https://neon.tech/
2. Sign up → Create project
3. Copy connection string from dashboard
4. In Vercel: Add `DATABASE_URL` to environment variables

---

## **Step 5: Run Database Migrations** (3 minutes)

Once DATABASE_URL is set in Vercel:

### 5.1 Push Schema to Production
```powershell
# Set production DATABASE_URL locally for migration
$env:DATABASE_URL = "your_supabase_or_neon_connection_string"

# Push Prisma schema to production database
npx prisma db push
```

### 5.2 Seed Initial Data (Optional but Recommended)
```powershell
# Install ts-node for seed execution
npm install --save-dev ts-node

# Seed the database with sample products
npx prisma db seed
```

---

## **Step 6: Verify Deployment** (2 minutes)

1. Go to your Vercel project dashboard
2. You'll see a URL like: `https://lifeline-mvp.vercel.app`
3. Click the link to open your live site
4. Test:
   - ✅ Home page loads
   - ✅ Products listing works
   - ✅ Search and filters function
   - ✅ Product detail pages render
   - ✅ Compare feature works
   - ✅ No console errors (F12 DevTools)

---

## **Making Changes After Deployment** ✏️

### Workflow for Updates

```powershell
# 1. Make changes locally
# (edit files)

# 2. Test locally
npm run dev
# Visit http://localhost:3000 to verify

# 3. Commit and push to GitHub
git add .
git commit -m "Feature: Add product review section"
git push origin main

# 4. Vercel automatically redeploys!
# Watch deployment at https://vercel.com/dashboard
```

**No need to do anything in Vercel — it auto-deploys on every Git push!**

---

## **Post-Deployment Checklist** ✓

- [ ] Site loads without errors
- [ ] SEO metadata visible (view page source, check `<meta>` tags)
- [ ] All pages accessible (/products, /compare, /admin)
- [ ] Database connected (add product in admin panel works)
- [ ] Environment variables set in Vercel
- [ ] HTTPS working (green lock in browser)
- [ ] Analytics tracking ready (add Google Analytics ID to env vars)

---

## **Troubleshooting**

### "Build failed"
- Check **Vercel Logs** tab for error messages
- Common fixes:
  - Missing `DATABASE_URL` env var → add it in Vercel Settings
  - Prisma migration needed → run `npx prisma db push` locally, commit, re-deploy

### "Database connection error"
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Check database is running (Supabase/Neon dashboard)
- Ensure connection string includes password and port

### "SEO metadata not showing"
- This is normal for dynamic metadata; check page source
- OpenGraph works for social sharing (test on Facebook/Twitter share debugger)

---

## **Next Steps (After Deploy)**

1. **Monitor Performance**
   - Vercel Analytics: https://vercel.com/dashboard → Analytics tab
   - Google PageSpeed Insights: https://pagespeed.web.dev

2. **Add Real Affiliate APIs** (Optional)
   - Amazon Product Advertising API (requires approval)
   - Flipkart Affiliate Program (sign up at https://affiliate.flipkart.com)
   - Update `/api/external/amazon` and `/api/external/flipkart` routes

3. **Setup Admin Auth**
   - Database currently has demo credentials (demo@lifeline.local / demo123)
   - Create real admin user in `/api/auth/[...nextauth]/route.ts`

4. **Custom Domain** (Optional)
   - Vercel allows custom domains in **Settings** → **Domains**
   - Requires domain purchase (GoDaddy, Namecheap, etc.)

---

## **Support & Resources**

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**Your Lifeline MVP is ready! Deploy now and share with the world.** 🎉

Questions? Check DEPLOYMENT.md for detailed documentation.
