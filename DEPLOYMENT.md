# 🚀 Vercel Deployment Guide for Lifeline

## Step 1: Setup Git Repository (Local)

```bash
cd C:\Users\hp\OneDrive\Desktop\lifeline

# Initialize Git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial Lifeline MVP - SEO-first mobile comparison platform"

# Rename branch to main
git branch -M main
```

## Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repo name: `lifeline`
3. **DO NOT** initialize with README (we already have one)
4. Click "Create repository"

## Step 3: Push to GitHub

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/lifeline.git

# Push to main branch
git push -u origin main
```

## Step 4: Create Vercel Account & Connect

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Sign up (use GitHub for easier auth)
3. Click "New Project"
4. Select "Import Git Repository"
5. Search for `lifeline` repo
6. Click "Import"

## Step 5: Configure Environment Variables on Vercel

Vercel will show a form. Fill in these **required** variables:

### Production Environment

```
DATABASE_URL=postgresql://user:password@host:5432/lifeline
NEXTAUTH_SECRET=[generate below]
NEXTAUTH_URL=https://lifeline.vercel.app
NEXT_PUBLIC_SITE_URL=https://lifeline.vercel.app
```

### Generate NEXTAUTH_SECRET

Run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste into Vercel dashboard.

### Optional (For Real APIs):
```
AMAZON_API_KEY=your-key
AMAZON_ASSOCIATE_TAG=your-tag
FLIPKART_API_KEY=your-key
```

## Step 6: Deploy

Click "Deploy" button on Vercel dashboard.

Wait 2-3 minutes. You'll get a live URL like:
```
https://lifeline.vercel.app
```

---

## ✅ Post-Deployment Checklist

- [ ] Visit your live URL and test all pages
- [ ] Check `/products` filters work
- [ ] Click through `/compare` page
- [ ] Verify SEO meta tags (Open Graph in browser DevTools)
- [ ] Test affiliate redirects
- [ ] Check console for errors (F12)

---

## 🔄 Making Changes After Deploy

### Quick Change (UI/Copy):
```bash
# 1. Make changes locally
# 2. Test: npm run dev
# 3. Commit
git add .
git commit -m "Fix typo in product title"
git push origin main
# ✅ Vercel auto-deploys (30 seconds)
```

### Database Changes (Schema):
```bash
# 1. Modify prisma/schema.prisma locally
# 2. Create migration
npx prisma migrate dev --name "add new field"
# 3. Commit & push
git add .
git commit -m "Add product category field"
git push origin main
# 4. On Vercel: migrations run automatically
```

### Add New Environment Variable:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add new variable
3. Redeploy (click "Redeploy" button)

---

## 🗄️ Setup Database (Supabase Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Sign up → Create Organization
3. Create new Project (free tier)
4. Copy Connection String (psql format)
5. Add to Vercel Dashboard as `DATABASE_URL`

**Example CONNECTION_STRING format:**
```
postgresql://postgres:password@db.supabase.co:5432/postgres
```

---

## 🛠️ Troubleshooting

### Build fails on Vercel
- Check Vercel logs (Deployments → failed build)
- Common: Missing env vars, TypeScript errors

### Database connection fails
- Verify `DATABASE_URL` is correct in Vercel
- Check IP whitelist in database provider (allow all IPs for MVP)

### Affiliate redirects not working
- Check `/api/affiliate` route compiles
- Verify URL validation logic

---

## 📊 Monitoring After Deploy

- **Vercel Analytics**: Deployments tab → Analytics
- **Error Logs**: Deployments → Function Logs
- **Performance**: Vercel Dashboard → Performance tab
- **Google Search Console**: Add your Vercel domain

---

## 🔐 Security Reminders

✅ Never commit `.env.local` or secrets  
✅ Use Vercel dashboard for all secrets  
✅ Rotate `NEXTAUTH_SECRET` quarterly  
✅ Keep `DATABASE_URL` private  
✅ Enable two-factor auth on GitHub & Vercel

---

**You're ready to go live! 🚀**
