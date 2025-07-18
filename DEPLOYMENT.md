# 🚀 Leftover Love - Deployment Guide

## Overview
This guide will help you deploy your Leftover Love project for free so people can view it live on your portfolio.

## 🎯 Recommended Deployment Strategy

### Frontend: Vercel (Free)
- Perfect for Next.js applications
- Automatic deployments from GitHub
- Custom domain support
- CDN and performance optimization

### Backend: Railway (Free Tier)
- Already configured with `railway.toml`
- Supports FastAPI and PostgreSQL
- 500 execution hours/month (plenty for portfolio)
- Automatic HTTPS and custom domains

### Database: Railway PostgreSQL (Free)
- Included with Railway backend
- Automatic backups
- Easy environment variable integration

## 📋 Step-by-Step Deployment

### 1. Prepare for Deployment

**Update Environment Configuration:**

Create production environment variables:

**Backend (.env for Railway):**
```bash
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-super-secret-jwt-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=https://your-app.vercel.app
```

**Frontend (.env.local for Vercel):**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### 2. Deploy Backend to Railway

1. **Sign up at railway.app**
2. **Connect GitHub repository**
3. **Create new project → Deploy from GitHub**
4. **Select your repository and `/backend` folder**
5. **Railway auto-detects your `railway.toml` configuration**
6. **Add environment variables in Railway dashboard:**
   - SECRET_KEY
   - FRONTEND_URL (will be your Vercel URL)
   - DATABASE_URL (Railway will provide this)

7. **Deploy will start automatically**
8. **Your backend will be live at: `https://your-app-name.railway.app`**

### 3. Deploy Frontend to Vercel

1. **Sign up at vercel.com**
2. **Import your GitHub repository**
3. **Select `/frontend/nowastewebapp` as root directory**
4. **Add environment variable:**
   - `NEXT_PUBLIC_API_URL` = your Railway backend URL
5. **Deploy automatically starts**
6. **Your frontend will be live at: `https://your-app-name.vercel.app`**

### 4. Update CORS Settings

Update your backend CORS to include your Vercel URL:

In `backend/app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-app-name.vercel.app"  # Add your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 5. Database Migration

Railway will automatically run:
```bash
alembic upgrade head
```

This creates your database tables on first deployment.

## 🔧 Alternative: All-Railway Deployment

If you prefer everything on Railway:

1. **Deploy Backend** (as above)
2. **Deploy Frontend as separate Railway service:**
   - Create new service
   - Select `/frontend/nowastewebapp`
   - Railway will detect Next.js and deploy

## 💡 Portfolio Tips

### Custom Domain (Optional)
- Buy a domain (Namecheap, Google Domains)
- Connect to Vercel for frontend
- Connect to Railway for backend
- Example: `leftoverlove.yourdomain.com`

### Portfolio Presentation
- **Live Demo Link:** Your Vercel URL
- **GitHub Repository:** Link to your code
- **Tech Stack:** Next.js, FastAPI, PostgreSQL, Railway, Vercel
- **Screenshots:** Key features and mobile responsiveness

### Demo Data
Consider adding sample data so visitors can explore:
- Test restaurants with sample listings
- Demo charity accounts
- Sample pickup schedules

## 🚨 Cost Considerations

**Completely Free Options:**
- Vercel: Unlimited personal projects
- Railway: 500 hours/month (≈ 16 hours/day)
- Supabase/Neon: Free PostgreSQL tiers

**When you might pay:**
- High traffic (unlikely for portfolio)
- Custom domains ($10-15/year)
- Extra database storage

## 🎯 Quick Start Commands

```bash
# Prepare for deployment
git add .
git commit -m "Prepare for deployment"
git push origin main

# Update CORS for production
# Edit backend/app/main.py with your Vercel URL

# Test locally first
cd backend && uvicorn main:app --reload
cd frontend/nowastewebapp && npm run build && npm start
```

## 📱 Mobile & Responsive Testing

Your app already looks great on mobile! Railway and Vercel both serve responsive apps perfectly.

## 🔗 Example URLs

After deployment, you'll have:
- **Frontend:** `https://leftover-love.vercel.app`
- **Backend API:** `https://leftover-love-backend.railway.app`
- **API Docs:** `https://leftover-love-backend.railway.app/docs`

Perfect for sharing with employers and showcasing your full-stack skills!
