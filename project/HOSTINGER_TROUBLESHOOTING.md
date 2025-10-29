# Hostinger Troubleshooting: Raw HTML Issue

## Problem
When clicking on blog posts, you see raw HTML code instead of the rendered page:
```
<!doctype html> <html lang="en"> <head>...
```

## Root Cause
The server is serving `index.html` as `text/plain` instead of `text/html`, causing the browser to display the source code instead of rendering it.

## Solution Steps

### 1. Clear Browser Cache
First, clear your browser cache or do a hard refresh:
- **Chrome/Edge**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Firefox**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### 2. Verify .htaccess Upload
**CRITICAL:** Make sure `.htaccess` is in the root of `public_html`

In Hostinger File Manager:
1. Enable "Show Hidden Files" (Settings icon in File Manager)
2. Check that `.htaccess` exists in `public_html/` (NOT in a subfolder)
3. Verify `.htaccess` has these permissions: **644**

### 3. Re-upload .htaccess
If the file exists but still not working:

1. **Delete** the existing `.htaccess` in Hostinger
2. **Upload** the new `.htaccess` from your local `dist/` folder
3. Right-click → **Properties** → Set permissions to **644**

### 4. Check .htaccess Content
Open `.htaccess` in Hostinger File Manager and verify it contains:

```apache
# Force proper MIME types
<IfModule mod_mime.c>
  AddType text/html .html .htm
  AddType application/javascript .js .mjs
  AddType text/css .css
  AddType image/png .png
  AddType image/jpeg .jpg .jpeg
  AddType image/webp .webp
  AddType text/markdown .md
</IfModule>

# Enable mod_rewrite
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing files directly
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # Serve existing directories directly
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Route all other requests to index.html for React Router
  RewriteRule ^ index.html [L]
</IfModule>
```

### 5. Verify File Structure
Your `public_html` should look like:

```
public_html/
├── .htaccess          ← MUST BE HERE (hidden file)
├── index.html
├── assets/
├── content/
│   └── blogs/
└── media/
```

### 6. Test Individual Files
Try accessing these URLs directly:

1. **Main page**: https://timillguth.com
   - Should load properly

2. **A blog post**: https://timillguth.com/blockchain-development-principles
   - Should load the blog post, NOT show raw HTML

3. **Markdown file**: https://timillguth.com/content/blogs/blockchain-development-principles.md
   - Should download or show as text

### 7. Hostinger-Specific Checks

#### Check PHP Version
Sometimes Hostinger PHP settings interfere:
1. Go to Hostinger Control Panel
2. Advanced → PHP Configuration
3. Ensure it's not set to "display errors" which can add text to responses

#### Check mod_rewrite
1. In Hostinger File Manager
2. Go to Error logs (in control panel)
3. Look for errors mentioning "RewriteEngine" or ".htaccess"

### 8. Nuclear Option: Fresh Upload

If nothing works:

1. **Download backup** of current `public_html` (just in case)
2. **Delete everything** in `public_html`
3. **Upload fresh** from your local `dist/` folder:
   - Upload ALL files from `dist/`
   - **Including** `.htaccess` (enable "Show Hidden Files")
4. Set `.htaccess` permissions to **644**
5. Clear browser cache
6. Test site

### 9. Alternative: Add to index.html

If `.htaccess` absolutely won't work, you can try forcing MIME type in index.html head:

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

But this is NOT the ideal solution - fixing `.htaccess` is better.

## Still Not Working?

### Contact Hostinger Support
If the issue persists, it might be a server configuration issue:

1. Open Hostinger Support Chat
2. Tell them: "My .htaccess file isn't being processed, and HTML files are being served as text/plain"
3. Ask them to verify:
   - mod_rewrite is enabled
   - mod_mime is enabled
   - .htaccess is being read

## Prevention

To avoid this issue in future uploads:

1. **Always upload .htaccess** (don't forget it!)
2. **Always set permissions to 644**
3. **Always clear browser cache** after uploading
4. **Test immediately** after uploading

## Quick Fix Checklist

- [ ] Browser cache cleared (Ctrl+Shift+R)
- [ ] .htaccess exists in public_html root
- [ ] .htaccess permissions are 644
- [ ] "Show Hidden Files" enabled to see .htaccess
- [ ] All files from dist/ uploaded correctly
- [ ] index.html exists in public_html root
- [ ] content/blogs/ folder with .md files uploaded
- [ ] Tested on different browser/incognito mode
