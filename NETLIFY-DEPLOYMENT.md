# 🚀 Netlify Deployment Guide for Mealky Way

Your project is now ready for Netlify deployment!

## 📋 Pre-Deployment Checklist

✅ **Files Created:**
- `netlify.toml` - Netlify configuration
- `netlify/functions/server.js` - Serverless backend function
- Added `serverless-http` dependency

✅ **What's Configured:**
- Static files served from `public/` folder
- Backend APIs run as serverless functions
- Session management for admin login
- All routes properly redirected

---

## 🎯 Deployment Steps

### Step 1: Install New Dependency

```bash
npm install
```

This installs `serverless-http` needed for Netlify Functions.

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### Step 3: Deploy on Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Go to [https://app.netlify.com](https://app.netlify.com)**
2. **Sign up/Login** with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Select your repository: `DewanNafis/MilkDeliveryWeb`
6. Configure build settings:
   - **Base directory:** (leave empty)
   - **Build command:** `npm install`
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`
7. Click **"Show advanced"** → **"New variable"**
8. Add environment variables:

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your-supabase-anon-key
SESSION_SECRET = your-random-secret-key-here
NODE_ENV = production
```

9. Click **"Deploy site"**

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow prompts:
# - Create & configure a new site
# - Build command: npm install
# - Publish directory: public
# - Functions directory: netlify/functions

# Deploy
netlify deploy --prod
```

---

## ⚙️ Environment Variables

**Important:** Add these in Netlify Dashboard → Site Settings → Environment Variables:

| Variable | Value | Example |
|----------|-------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Your Supabase anon public key | `eyJhbGc...` |
| `SESSION_SECRET` | Random string for sessions | `mealky-netlify-2024-secure` |
| `NODE_ENV` | Environment mode | `production` |

### How to Add Environment Variables:

1. Go to your site in Netlify Dashboard
2. **Site settings** → **Environment variables**
3. Click **"Add a variable"**
4. Add each variable listed above
5. Click **"Save"**
6. **Trigger redeploy** (Site overview → Deploys → Trigger deploy)

---

## 🔍 After Deployment

### Test Your Site:

1. **Homepage:** `https://your-site-name.netlify.app`
2. **Order Page:** `https://your-site-name.netlify.app/order`
3. **Admin Login:** `https://your-site-name.netlify.app/admin-login.html`
4. **Admin Panel:** `https://your-site-name.netlify.app/admin/panel`

### Check Logs:

- Go to **Functions** tab in Netlify Dashboard
- Click on `server` function
- View real-time logs

---

## 🛠️ Troubleshooting

### Issue 1: "Function not found"

**Solution:** Check that environment variables are set correctly
- Site settings → Environment variables
- Verify all 4 variables are added
- Trigger a new deploy

### Issue 2: "Session not working"

**Solution:** Update session cookie settings
- Already configured with `sameSite: 'none'` for production
- Make sure `SESSION_SECRET` is set in environment variables

### Issue 3: "Database connection failed"

**Solution:** 
- Verify Supabase credentials in Netlify environment variables
- Check Supabase dashboard that project is active
- View function logs for specific error

### Issue 4: "Admin login not working"

**Solution:**
- Run `npm run init-supabase` locally to ensure admin user exists
- Check function logs in Netlify
- Verify bcrypt is working (check Node.js version in Netlify)

---

## 🎨 Custom Domain (Optional)

1. Go to **Domain settings** in Netlify
2. Click **"Add custom domain"**
3. Follow instructions to configure DNS
4. SSL certificate automatically provisioned

---

## 📊 Netlify Free Tier Limits

- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ 125,000 serverless function requests/month
- ✅ Unlimited sites
- ✅ Automatic HTTPS

**Perfect for your project!**

---

## 🔄 Continuous Deployment

After setup, every push to `main` branch will:
1. Automatically trigger a new build
2. Run `npm install`
3. Deploy new version
4. Take 1-2 minutes

---

## 📱 Mobile Testing

Your app will be accessible from anywhere:
```
https://your-site-name.netlify.app
```

Share this URL with customers and test orders from mobile devices!

---

## 🚨 Important Notes

1. **Database:** Using Supabase (already cloud-hosted) ✅
2. **Sessions:** Configured for serverless with secure cookies ✅
3. **CORS:** Enabled for cross-origin requests ✅
4. **Environment:** `.env` file NOT deployed (secure) ✅

---

## 📈 Next Steps After Deployment

1. **Test all features:**
   - Place test orders
   - Login to admin panel
   - Edit/delete orders
   - Test institution filters

2. **Monitor performance:**
   - Check Netlify Analytics
   - Monitor function execution time
   - Review error logs

3. **Set up notifications:**
   - Site settings → Build notifications
   - Get notified of deploy status

---

## 🎉 Success Indicators

✅ Site URL is accessible
✅ Homepage loads correctly
✅ Order form works
✅ Admin login successful
✅ Orders display in admin panel
✅ All filters working

---

## 💡 Pro Tips

1. **Use Netlify CLI** for faster deployments during development
2. **Enable Build Hooks** to trigger deploys from external services
3. **Set up Deploy Previews** for testing before merging
4. **Use Netlify Functions Logs** to debug issues

---

## 🆘 Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Support:** https://www.netlify.com/support
- **Function Logs:** Site → Functions → server → Logs

---

**Ready to deploy! Run `npm install` and push to GitHub!** 🚀
