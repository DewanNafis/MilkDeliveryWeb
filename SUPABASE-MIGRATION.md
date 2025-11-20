# 🚀 Supabase Migration Guide

Your Mealky Way project has been successfully converted from SQLite to Supabase PostgreSQL!

## ✅ What's Been Done

1. ✅ Created Supabase client configuration (`database/supabase.js`)
2. ✅ Created PostgreSQL schema (`database/supabase-schema.sql`)
3. ✅ Created Supabase initialization script (`database/init-supabase.js`)
4. ✅ Updated `server.js` with Supabase queries (old version backed up as `server-sqlite-backup.js`)
5. ✅ Updated `package.json` with `init-supabase` script
6. ✅ Updated `.env` with Supabase configuration placeholders

## 📋 Setup Steps

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Choose settings:
   - **Name**: mealkyway (or your choice)
   - **Database Password**: Save this securely!
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for development
4. Wait 2-3 minutes for project to be created

### Step 2: Run Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `database/supabase-schema.sql`
4. Paste into the SQL Editor
5. Click **"Run"** button
6. You should see: "Success. No rows returned"

### Step 3: Get Your Supabase Credentials

1. Go to **Project Settings** → **API** (left sidebar)
2. Find these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### Step 4: Update .env File

1. Open your `.env` file
2. Replace the placeholder values:

```env
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

### Step 5: Initialize Supabase Database

Run this command to create the default admin user:

```powershell
npm run init-supabase
```

You should see: "✅ Supabase initialized successfully!"

### Step 6: Start Your Server

```powershell
npm run dev
```

You should see:
```
🚀 Mealky Way server running on http://localhost:3001
📊 Admin panel: http://localhost:3001/admin/panel
🔗 Using Supabase PostgreSQL database
```

### Step 7: Test the Application

1. **Test Customer Order**:
   - Go to `http://localhost:3001`
   - Fill in customer details and place an order
   - You should see a confirmation

2. **Test Admin Panel**:
   - Go to `http://localhost:3001/admin/panel`
   - Login with: `admin` / `admin123`
   - You should see your orders displayed

## 🔍 Verifying Database in Supabase

You can view your data directly in Supabase:

1. Go to **Table Editor** in Supabase dashboard
2. You'll see 3 tables:
   - **customers** - Customer information
   - **orders** - Order records
   - **admin_users** - Admin accounts (should have 1 user)

## 🛠️ Troubleshooting

### Error: "Invalid API key"
- Double-check your `SUPABASE_ANON_KEY` in `.env`
- Make sure there are no extra spaces or quotes
- Get the key from Project Settings → API → **anon public** key

### Error: "Failed to fetch"
- Verify your `SUPABASE_URL` is correct in `.env`
- Check your internet connection
- Ensure Supabase project is active

### Orders not showing
- Check Supabase **Table Editor** to verify data exists
- Check browser console for errors (F12)
- Verify you're logged into admin panel

### Can't login to admin
- Run `npm run init-supabase` again to ensure admin user exists
- Default credentials: `admin` / `admin123`
- Check Supabase **Table Editor** → **admin_users** table

## 🎯 What Changed?

### Old (SQLite)
```javascript
const { getDb } = require('./database/db');
const db = getDb();
db.get('SELECT * FROM customers WHERE contact_number = ?', [contactNumber], callback);
```

### New (Supabase)
```javascript
const supabase = require('./database/supabase');
const { data, error } = await supabase
  .from('customers')
  .select('*')
  .eq('contact_number', contactNumber)
  .single();
```

## 🌟 Benefits of Supabase

- ☁️ **Cloud-hosted**: No more local database files
- 🔄 **Real-time**: Built-in real-time subscriptions (not used yet, but available)
- 🔐 **Row Level Security**: Already configured with RLS policies
- 📊 **Dashboard**: Visual interface to view/edit data
- 💾 **Automatic Backups**: Free tier includes daily backups
- 🚀 **Scalable**: Easily upgrade as you grow

## 📦 Old Files (Safe to Keep)

- `database/db.js` - Old SQLite connection (not used anymore)
- `database/mealkyway.db` - Old SQLite database file (contains your old data)
- `server-sqlite-backup.js` - Backup of old server code

You can keep these for reference or delete them later.

## 🔄 Migrating Existing Data

If you had data in your SQLite database that you want to migrate:

1. Check your old data:
   ```powershell
   sqlite3 database/mealkyway.db "SELECT * FROM orders;"
   ```

2. Export it and manually insert into Supabase via:
   - Supabase SQL Editor, or
   - Supabase Table Editor (manual entry), or
   - Write a migration script

Let me know if you need help with data migration!

## 🆘 Need Help?

If you encounter any issues:
1. Check the terminal for error messages
2. Check browser console (F12) for frontend errors
3. Verify your `.env` file has correct Supabase credentials
4. Make sure you ran the schema SQL in Supabase
5. Try running `npm run init-supabase` again

Happy coding! 🎉
