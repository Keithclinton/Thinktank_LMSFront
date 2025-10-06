# 🚀 Think Tank LMS - Vercel Deployment Guide

## Quick Deployment Steps

### 1. Push to GitHub (without token in URL)
```bash
# If you haven't pushed yet, use SSH or HTTPS without token
git remote set-url origin https://github.com/Keithclinton/Thinktank_LMSFront.git

# Or use SSH (recommended)
git remote set-url origin git@github.com:Keithclinton/Thinktank_LMSFront.git

# Add all files
git add .
git commit -m "Initial commit: Think Tank LMS Frontend"
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Fastest)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow prompts:
# ? Set up and deploy "C:\Thinktank-LMSFront"? [Y/n] y
# ? Which scope do you want to deploy to? [your-username]
# ? Link to existing project? [y/N] n
# ? What's your project's name? thinktank-lms-frontend
# ? In which directory is your code located? ./
# ? Want to modify these settings? [y/N] n
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import from GitHub: `Keithclinton/Thinktank_LMSFront`
4. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables (in Vercel Dashboard)

Navigate to: **Project Settings** → **Environment Variables**

Add these variables:
```
Name: VITE_API_BASE_URL
Value: https://thinktank-lms-backend-536444006215.africa-south1.run.app/api
Environment: Production, Preview, Development
```

### 4. Deploy
- **Automatic**: Every push to `main` branch triggers deployment
- **Manual**: Click "Deploy" in Vercel dashboard

## 🎯 Expected Results

### Live URLs
- **Production**: `https://thinktank-lms-frontend.vercel.app`
- **Custom Domain**: Configure in Vercel dashboard

### Performance Metrics
- ✅ **Build Time**: ~15-30 seconds
- ✅ **Bundle Size**: ~470 kB total
- ✅ **Page Load**: <2 seconds
- ✅ **Lighthouse Score**: 90+ performance

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Test locally first
npm install
npm run build
npm run preview
```

#### API Connection Issues
- Verify `VITE_API_BASE_URL` in environment variables
- Check CORS settings on Django backend
- Test API endpoints manually

#### Authentication Issues
- Ensure backend JWT tokens are valid
- Check localStorage for stored tokens
- Verify API endpoints are accessible

## 📊 Project Status

### ✅ Ready for Deployment
- [x] Clean codebase (Google OAuth removed)
- [x] Production build tested
- [x] Environment variables configured
- [x] Routing configured for SPA
- [x] API integration complete
- [x] Responsive design implemented

### 🚀 Features Available
- **Authentication**: Login/Register with JWT
- **Dashboard**: User overview and recent courses
- **Course Catalog**: Browse available courses
- **My Courses**: Track progress and completion
- **Profile Management**: User account settings
- **Responsive Design**: Mobile and desktop optimized

## 🎉 Post-Deployment Checklist

After successful deployment, verify:
- [ ] Login page loads correctly
- [ ] User can register new account
- [ ] Authentication redirects work
- [ ] Course catalog displays data from API
- [ ] Dashboard shows user-specific data
- [ ] Mobile responsiveness
- [ ] Loading states work properly
- [ ] Error handling displays correctly

Your Think Tank LMS is production-ready! 🎓
