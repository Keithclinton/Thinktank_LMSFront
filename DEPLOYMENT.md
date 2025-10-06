# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free)
- Your code pushed to GitHub repository

## Deployment Steps

### 1. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit - ThinkTank LMS Frontend"
git remote add origin https://github.com/yourusername/thinktank-lms-frontend.git
git push -u origin main
```

### 2. Connect to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? N
# - What's your project's name? thinktank-lms-frontend
# - In which directory is your code located? ./
# - Want to modify these settings? N
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Select "thinktank-lms-frontend" repository
5. Vercel will auto-detect it's a Vite project

### 3. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_BASE_URL = https://thinktank-lms-backend-536444006215.africa-south1.run.app/api
```

### 4. Deploy Settings

Vercel will automatically detect:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🎯 Expected Results

### Build Output
- ✅ **Assets optimized** for production
- ✅ **Code splitting** with vendor/UI chunks
- ✅ **Gzip compression** enabled
- ✅ **Bundle size optimized**

### Performance
- 🚀 **Fast loading** with CDN
- 📱 **Mobile responsive**
- ⚡ **Instant page navigation**
- 🔄 **Automatic deployments** on git push

### Live URLs
- **Production**: `https://thinktank-lms-frontend.vercel.app`
- **Preview**: Generated for each PR
- **Custom Domain**: Can be configured

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Test locally first
npm run build
npm run preview
```

#### 2. API Connection Issues
- Verify `VITE_API_BASE_URL` in Vercel environment variables
- Check CORS settings on Django backend

#### 3. Routing Issues (404 on refresh)
Vercel automatically handles SPA routing with `vercel.json`

#### 4. Environment Variables
- Must start with `VITE_` prefix
- Set in Vercel dashboard, not in code
- Redeploy after adding new variables

## 🔧 Additional Configuration

### Custom Domain
1. Vercel Dashboard → Domains
2. Add your domain
3. Configure DNS records

### HTTPS & SSL
- ✅ Automatic SSL certificates
- ✅ HTTPS redirect enabled
- ✅ HTTP/2 support

### Performance Monitoring
- Built-in analytics
- Core Web Vitals tracking
- Real user monitoring

## 🎉 Success Checklist

After deployment verify:
- [ ] Login page loads correctly
- [ ] Authentication works with backend
- [ ] Course catalog displays
- [ ] Dashboard shows user data
- [ ] Mobile responsive design
- [ ] Fast loading times

## 🔄 Continuous Deployment

Every push to `main` branch automatically:
1. Triggers new build
2. Runs tests (if configured)
3. Deploys to production
4. Updates live site

## 📊 Monitoring

Monitor your deployment:
- **Vercel Analytics**: Usage and performance
- **Error Tracking**: Runtime error monitoring  
- **Build Logs**: Deployment status and issues

Your Think Tank LMS is now live and ready for users! 🎓
