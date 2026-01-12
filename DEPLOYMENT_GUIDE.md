# HackAryaVerse 2.0 Deployment Guide

## Prerequisites
- GitHub account with push access to the repository
- Netlify account (free tier available at https://netlify.com)

## Step 1: Verify GitHub Access
Your project needs push access to `https://github.com/hackaryaverse/HackAryaVerse2.0.git`.

**Options:**
1. **Use Personal Access Token (Recommended for this user)**
   ```bash
   git remote set-url origin https://<hackaryaverse>:<PERSONAL_ACCESS_TOKEN>@github.com/hackaryaverse/HackAryaVerse2.0.git
   ```
   Then: `git push origin main`

2. **Use SSH Keys**
   - Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
   - Add to GitHub: Settings → SSH and GPG keys
   - Update remote: `git remote set-url origin git@github.com:hackaryaverse/HackAryaVerse2.0.git`
   - Then: `git push origin main`

3. **Ask repo owner to add you as a collaborator** on GitHub

## Step 2: Deploy to Netlify

### Option A: Connect GitHub Repository (Recommended)
1. Go to https://app.netlify.com and sign in/create account
2. Click "Add new site" → "Import an existing project"
3. Select "GitHub" as your Git provider
4. Choose the `HackAryaVerse2.0` repository
5. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
6. Click "Deploy site"

### Option B: Manual Netlify Deployment
1. Build locally: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag and drop the `dist` folder
4. Your site will be deployed instantly

## Step 3: Netlify Configuration (Already Set Up)
The `netlify.toml` file in your project includes:
- ✅ Correct build command: `npm run build`
- ✅ Correct publish directory: `dist`
- ✅ SPA routing configuration (redirects all routes to index.html)
- ✅ Node.js version 18 specification

## Build & Deployment Pipeline

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview  # Preview the production build
```

### Push to GitHub
```bash
git add .
git commit -m "Your message"
git push origin main
```

Once pushed to GitHub, Netlify will automatically build and deploy your site.

## Verification Checklist
- [ ] Code pushed to GitHub
- [ ] Netlify site created
- [ ] Build logs show no errors
- [ ] Site is accessible at your Netlify domain
- [ ] All routes work correctly (SPA routing configured)
- [ ] Assets load correctly

## Troubleshooting

**Build Fails on Netlify:**
- Check that all dependencies are in `package.json`
- Verify `npm run build` works locally
- Check build logs in Netlify dashboard

**Assets not loading:**
- Ensure asset paths are relative (e.g., `/assets/image.jpg`)
- Check that assets are in the `src/assets/` folder
- Verify `vite.config.ts` has correct asset configuration

**Routes not working:**
- The `netlify.toml` file already has SPA routing configured
- All routes should redirect to `index.html` automatically

## Project Build Configuration

**Your current setup:**
- Framework: React 18 with TypeScript
- Build tool: Vite
- CSS: Tailwind CSS + PostCSS
- UI Components: Lucide React, React Icons, Framer Motion
