import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Filter out draft posts
const publishedPosts = blogPosts.filter(post => !post.draft);

// Read the built index.html template
const indexPath = join(__dirname, '../dist/index.html');
let template;
try {
  template = readFileSync(indexPath, 'utf-8');
} catch (error) {
  console.error('Could not read dist/index.html. Make sure to run "npm run build" first.');
  process.exit(1);
}

console.log(`\nGenerating static HTML pages with OG tags for ${publishedPosts.length} blog posts...\n`);

publishedPosts.forEach(post => {
  // Prepare meta tag values
  const title = post.title.replace(/"/g, '&quot;');
  const description = post.excerpt.replace(/"/g, '&quot;');
  const url = `https://timillguth.com/${post.slug}`;
  const image = post.image?.startsWith('http')
    ? post.image
    : `https://timillguth.com${post.image}`;
  const publishDate = post.publishDate;
  const author = post.author.replace(/"/g, '&quot;');

  // Create meta tags HTML
  const metaTags = `
    <!-- Primary Meta Tags -->
    <title>${title} | Tim Illguth</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <meta name="author" content="${author}" />
    <meta name="keywords" content="${post.tags.join(', ')}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="Tim Illguth" />
    <meta property="article:published_time" content="${publishDate}" />
    <meta property="article:author" content="${author}" />
    ${post.tags.map(tag => `<meta property="article:tag" content="${tag}" />`).join('\n    ')}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:creator" content="@timillguth" />

    <!-- Canonical URL -->
    <link rel="canonical" href="${url}" />`;

  // Replace the title tag and add meta tags in the head section
  let pageHtml = template
    .replace(
      /<title>.*?<\/title>/,
      metaTags
    );

  // Create directory for the blog post
  const postDir = join(__dirname, '../dist', post.slug);
  mkdirSync(postDir, { recursive: true });

  // Write the HTML file
  const htmlPath = join(postDir, 'index.html');
  writeFileSync(htmlPath, pageHtml, 'utf-8');

  console.log(`✓ Generated: /${post.slug}/index.html`);
  console.log(`  Title: ${post.title}`);
  console.log(`  Image: ${image}`);
  console.log('');
});

console.log(`Successfully generated ${publishedPosts.length} static pages with Open Graph tags!\n`);
console.log('When deployed to Hostinger:');
console.log('- Social media crawlers will see the proper OG tags');
console.log('- Users will still get the full React SPA experience');
console.log('- Each blog post URL will show the correct preview image\n');
