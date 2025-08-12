#!/bin/bash
# Build script for Hostinger deployment

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Build complete! Upload the 'dist' folder contents to your Hostinger public_html directory."