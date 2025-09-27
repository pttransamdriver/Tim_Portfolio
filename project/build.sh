#!/bin/bash
# Build script for Hostinger deployment

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Build complete!"
echo "Upload the contents of the 'dist' folder to your Hostinger public_html directory."
echo "Make sure to also upload the .htaccess file for proper routing."
