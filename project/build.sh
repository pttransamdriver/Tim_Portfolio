#!/bin/bash
# Build script for Hostinger deployment

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Copying .htaccess to dist folder..."
cp .htaccess dist/.htaccess

echo ""
echo "✅ Build complete!"
echo ""
echo "📁 Your production files are in the 'dist/' folder"
echo "📤 Upload ALL contents of 'dist/' to your Hostinger public_html directory:"
echo "   - index.html"
echo "   - .htaccess (CRITICAL for routing!)"
echo "   - assets/"
echo "   - content/"
echo "   - media/"
echo ""
echo "🚀 Your site will be live at your Hostinger domain"
