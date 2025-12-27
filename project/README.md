# Tim Illguth Portfolio Website

A modern React portfolio website with blog functionality, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📝 Adding New Blog Posts

### Step 1: Create Your Blog Post
Edit `src/data/blogPosts.ts` and add your new post to the `blogPosts` array:

```typescript
{
  id: '5', // Increment from the last ID
  title: 'Your Blog Post Title',
  slug: 'your-blog-post-title', // URL-friendly version (becomes: timillguth.com/your-blog-post-title)
  excerpt: 'Brief description for previews and LinkedIn sharing',
  author: 'Tim Illguth',
  publishDate: '2024-12-20', // Today's date (YYYY-MM-DD)
  readTime: 5, // Estimated reading time in minutes
  tags: ['React', 'Web Development', 'AI'], // Relevant tags for filtering
  featured: true, // Set to true to show on homepage
  image: '/media/handshake.png', // Use images from your media folder
  content: `
# Your Blog Post Title

Your content here in **Markdown** format.

## Subheading

You can use:
- **Bold text**
- *Italic text*
- \`Code snippets\`
- [Links](https://example.com)

### Code Blocks
\`\`\`javascript
const example = "code block";
console.log(example);
\`\`\`

## Conclusion
Your conclusion here.
  `
}
```

### Step 2: Choose an Image
Use existing images from your `/media/` folder:

- `/media/handshake.png` - AI/collaboration themes
- `/media/uniswap.png` - Blockchain/DeFi themes  
- `/media/NFT_Patents.png` - Blockchain technology
- `/media/Speaker_Tim.png` - Development/personal posts
- `/media/Clouds.png` - Cloud/tech themes
- `/media/NASA_Logo.png` - Innovation/space themes
- `/media/Snow_Profile.png` - Personal/profile posts

Or add new images to the `/media/` folder and reference them as `/media/your-image.png`

### Step 3: Build and Deploy
```bash
npm run build
```

Upload the contents of the `dist/` folder to your Hostinger `public_html` directory.

## 🌐 Deployment

### Files to Upload to Hostinger:
- Upload everything from `dist/` to `public_html/`
- Make sure `.htaccess` file is included (handles React routing)
- Ensure `media/` folder is uploaded for images

### Your Blog URLs:
- Main blog: `https://timillguth.com/blog`
- Individual posts: `https://timillguth.com/your-blog-post-title`

## 📁 Project Structure

```
project/
├── src/
│   ├── components/     # React components
│   ├── data/          # Blog posts data
│   └── contexts/      # React contexts
├── media/             # Images for blog posts
├── public/            # Static assets
└── dist/             # Built files (upload this to Hostinger)
```

## 🎨 Available Images in Media Folder

- `Clouds.png` - Cloud/tech themes
- `handshake.png` - AI/collaboration 
- `NASA_Logo.png` - Innovation/space
- `NFT_Patents.png` - Blockchain tech
- `Snow_Profile.png` - Personal posts
- `Speaker_Tim.png` - Development topics
- `ti-logo.png` - Logo
- `uniswap.png` - DeFi/blockchain

## 💡 Tips

- **Routing**: New blog posts work automatically with the catch-all route `/:slug`
- **SEO**: Each blog post gets individual meta tags and OpenGraph data
- **Dark Mode**: All components support dark mode theming
- **Responsive**: Mobile-first design that works on all devices

## 🔧 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Lucide React** - Icons