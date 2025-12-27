# Deployment Instructions for Hostinger

## Pre-Deployment Checklist
✅ Build completed successfully
✅ All 4 blog posts with updated content included
✅ All media files copied
✅ .htaccess configured for React Router
✅ Total build size: 3.1 MB

## What's in the `dist` folder:

```
dist/
├── .htaccess                    ← Apache routing config
├── index.html                   ← Main app entry point
├── assets/                      ← Bundled JS/CSS (hashed for caching)
│   ├── index-*.css             ← Main stylesheet
│   ├── index-*.js              ← Main app bundle
│   ├── BlogPost-*.js           ← Blog post component (includes Recharts)
│   ├── BlogPage-*.js           ← Blog listing page
│   └── TutorialsPage-*.js      ← Tutorials page
├── content/
│   ├── blogs/                   ← Your blog markdown files
│   │   ├── vibe-coding-vs-knowledgeable-developers-the-ai-productivity-divide.md
│   │   ├── blockchain-development-principles.md
│   │   ├── thoughts-on-thread-safety.md
│   │   ├── save-up-to-half-of-your-gas-fees.md
│   │   └── getting-started-with-agentic-coding.md
│   └── data/                    ← Chart data files (CSV)
│       ├── Cost_Savings_Piechart.csv
│       └── Hours_Savings_Barchart.csv
└── media/                       ← All images
    ├── Vibe_coder.png
    ├── Speaker_Tim.png
    ├── handshake.png
    ├── NFT_Patents.png
    ├── uniswap.png
    ├── NASA_Logo.png
    ├── Clouds.png
    └── ... (all other images)
```

## Deployment Steps to Hostinger

### Option 1: Using Hostinger File Manager (Recommended for first-time)

1. **Log in to Hostinger Control Panel**
   - Go to https://hpanel.hostinger.com
   - Navigate to your website

2. **Access File Manager**
   - Click "File Manager" in the control panel
   - Navigate to `public_html` directory

3. **Backup Current Site (Important!)**
   - Select all files in `public_html`
   - Click "Compress" to create a backup ZIP
   - Download the backup to your computer

4. **Clear public_html**
   - Select all files in `public_html`
   - Click "Delete"

5. **Upload New Files**
   - Click "Upload Files"
   - Select **ALL** files and folders from your local `dist/` directory:
     - .htaccess
     - index.html
     - assets/ (entire folder)
     - content/ (entire folder)
     - media/ (entire folder)

6. **Verify Upload**
   - Check that folder structure matches the diagram above
   - Ensure `.htaccess` file is present (it's hidden, enable "Show Hidden Files")

7. **Set Permissions (if needed)**
   - `.htaccess` should be 644
   - Directories should be 755
   - Files should be 644

### Option 2: Using FTP Client (Faster for updates)

1. **Connect via FTP**
   - Host: Your Hostinger FTP hostname
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

2. **Navigate to public_html**

3. **Backup first** (download current public_html contents)

4. **Delete old files**

5. **Upload dist/ contents**
   - Drag entire `dist/` folder contents to `public_html`
   - Do NOT upload the `dist` folder itself - upload its CONTENTS

### Option 3: Using Hostinger's Git Integration

If you have your project in GitHub:

1. Push your changes to GitHub
2. In Hostinger, set up Git deployment
3. Configure build command: `npm run build`
4. Configure output directory: `dist`

## Post-Deployment Verification

1. **Visit your website:** https://timillguth.com

2. **Test these pages:**
   - ✅ Home page loads
   - ✅ Projects section displays
   - ✅ Blog section shows all 5 posts
   - ✅ Click into a blog post - should load with updated content
   - ✅ Test blog post: https://timillguth.com/blockchain-development-principles
   - ✅ Test new blog with charts: https://timillguth.com/getting-started-with-agentic-coding
   - ✅ Tutorials page works
   - ✅ Contact form displays

3. **Test interactive charts:**
   - Navigate to the "Getting Started with Agentic Coding" blog post
   - Scroll to "Real-World Productivity Gains" section - should see bar chart
   - Scroll to "Cost-Benefit Analysis" section - should see pie chart
   - Hover over charts - should show interactive tooltips
   - Charts should adapt to dark/light mode

4. **Check browser console** (F12) for errors

5. **Test navigation:**
   - Click "Back to Blog" from a blog post
   - Refresh page while on a blog post URL
   - Check that all images load
   - Verify CSV data loads (check Network tab in DevTools)

## Troubleshooting

### Blog posts show "Error Loading Content"
- Check that `/content/blogs/` folder uploaded correctly
- Verify markdown files are in the right location
- Check file permissions (should be 644)

### Charts not displaying or showing "Loading chart..."
- Check that `/content/data/` folder uploaded correctly
- Verify CSV files are present and accessible
- Check browser Network tab (F12) to see if CSV files are loading
- Verify `.htaccess` includes CSV MIME type (`AddType text/csv .csv`)
- Check file permissions on CSV files (should be 644)
- Clear browser cache and reload

### Charts show no data or errors
- Open browser console (F12) and check for JavaScript errors
- Verify CSV file format is correct (comma-separated values)
- Check that CSV files match expected structure:
  - `Cost_Savings_Piechart.csv`: label,value format
  - `Hours_Savings_Barchart.csv`: task,before,after format

### Images not loading
- Check that `/media/` folder uploaded correctly
- Verify in browser DevTools which images are failing
- Check image paths in browser network tab

### Routes not working (404 errors)
- Verify `.htaccess` file is in `public_html` root
- Check `.htaccess` permissions (644)
- Enable "Show Hidden Files" in File Manager to see .htaccess

### CSS not loading / site looks broken
- Clear browser cache (Ctrl+Shift+R)
- Check that `/assets/` folder uploaded correctly
- Verify all CSS/JS files are present

## What Changed in This Deployment

✅ **Blog content updated** - All 4 blog posts now reflect your actual experience:
   - 14 years Linux/networking background
   - 3 years blockchain development (hobby since 2022)
   - Blockchain architecture certification (2022)
   - Tutoring experience

✅ **Code cleanup:**
   - Removed unused .bolt directory
   - Removed template files
   - Fixed vite.config path references

✅ **Bug fixes:**
   - Fixed missing backpack_bitcoin.png reference
   - Ensured all blog images load correctly

## Need Help?

If you encounter issues:
1. Check Hostinger's error logs in the control panel
2. Use browser DevTools (F12) to see JavaScript errors
3. Verify file permissions in File Manager
4. Try clearing your browser cache

## Quick Update Process (For Future Changes)

When you make changes and want to update:

```bash
# In your project directory
npm run build

# Then upload ONLY the changed files from dist/ to Hostinger
# Most common changes:
# - content/blogs/*.md (blog content updates)
# - assets/*.js and assets/*.css (code changes)
```

**Pro tip:** Keep the media folder unless you add new images - it rarely changes!
