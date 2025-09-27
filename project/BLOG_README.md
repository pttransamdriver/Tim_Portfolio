# Blog Post Creation Guide

This guide explains how to add new blog posts to your Tim Illguth portfolio website.

## Quick Start

**The easiest way to add a new blog post:**

1. Open `/src/data/blogPosts.ts`
2. Copy the entire template post object (the one that's currently there)
3. Paste it above the closing `];`
4. Change the `id` to the next number (`'2'`, `'3'`, etc.)
5. Update all the fields with your content
6. Save the file - it updates automatically!

## Overview

Blog posts are stored in `/src/data/blogPosts.ts` as TypeScript objects. Each post automatically appears on:
- Home page blog section
- `/blog` page (full blog listing)
- Individual post pages (`/your-post-slug`)

**Current Status:** The blog data file contains one template post that demonstrates proper formatting and structure. Use this as your starting point for new posts.

## Blog Post Structure

Each blog post follows this TypeScript interface:

```typescript
{
  id: string;           // Unique identifier
  title: string;        // Post title
  slug: string;         // URL-friendly version
  excerpt: string;      // Preview description
  author: string;       // Author name
  publishDate: string;  // YYYY-MM-DD format
  readTime: number;     // Minutes to read
  tags: string[];       // Category tags
  featured: boolean;    // Shows featured badge
  image?: string;       // Header image URL
  content: string;      // Full Markdown content
}
```

## Step-by-Step Instructions

### 1. Open the Blog Data File

Navigate to: `/src/data/blogPosts.ts`

### 2. Add Your New Post

**Method 1: Copy the Template (Easiest)**
1. Copy the entire template post object from `/src/data/blogPosts.ts`
2. Paste it above the closing `];`
3. Update the fields (see example below)

**Method 2: Write from Scratch**
Add your post object to the `blogPosts` array before the closing `];`:

```typescript
export const blogPosts: BlogPost[] = [
  // Template post (already there)
  {
    id: '1',
    title: 'Blog Post Template - Copy This Pattern',
    // ... template content ...
  },
  // Your new post goes here:
  {
    id: '2', // Always increment from the last post
    title: 'Your Amazing Blog Post Title',
    slug: 'your-amazing-blog-post-title',
    excerpt: 'A compelling 1-2 sentence description that makes people want to read more.',
    author: 'Tim Illguth',
    publishDate: '2024-12-25',
    readTime: 8,
    tags: ['Blockchain', 'Development', 'Tutorial'],
    featured: false,
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
# Your Amazing Blog Post Title

Your introduction paragraph that hooks the reader...

## Main Section

Your content here with proper Markdown formatting.

### Subsection

More detailed information...

## Conclusion

Wrap up your thoughts and provide value.
    `
  }
];
```

### 3. Required Fields Guide

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique identifier (increment from last) | `'5'` |
| `title` | Full post title | `'Building Secure Smart Contracts'` |
| `slug` | URL-friendly version (lowercase, hyphens) | `'building-secure-smart-contracts'` |
| `excerpt` | Preview text (1-2 sentences) | `'Learn essential security practices...'` |
| `author` | Your name | `'Tim Illguth'` |
| `publishDate` | Date in YYYY-MM-DD format | `'2024-12-25'` |
| `readTime` | Estimated minutes (~200 words/min) | `8` |
| `tags` | Array of relevant categories | `['Blockchain', 'Security']` |
| `featured` | Show featured badge | `true` or `false` |
| `image` | Pexels image URL (see below) | Full Pexels URL |

## Creating URLs and Slugs

### Slug Creation Rules
- Convert title to lowercase
- Replace spaces with hyphens
- Remove special characters and punctuation
- Keep it readable and descriptive

**Examples:**
- "Building Secure Smart Contracts" → `building-secure-smart-contracts`
- "AI vs. Human Developers: The Future" → `ai-vs-human-developers-the-future`

## Finding Images

1. Visit [Pexels.com](https://www.pexels.com)
2. Search for relevant, high-quality images
3. Click on an image you like
4. Copy the image ID from the URL (the numbers after `/photos/`)
5. Use this format:

```
https://images.pexels.com/photos/YOUR_ID_HERE/pexels-photo-YOUR_ID_HERE.jpeg?auto=compress&cs=tinysrgb&w=800
```

**Example:** If the Pexels URL is `https://www.pexels.com/photo/laptop-computer-730547/`, use:
```
https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800
```

## Content Formatting (Markdown)

Your blog content uses Markdown formatting:

### Headers
```markdown
# Main Title (H1) - Use once at the top
## Major Section (H2)
### Subsection (H3)
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
`inline code`
```

### Lists
```markdown
- Bullet point
- Another point
  - Nested point

1. Numbered list
2. Second item
```

### Code Blocks
```markdown
```javascript
function example() {
  return "syntax highlighted code";
}
```
```

### Links and Images
```markdown
[Link text](https://example.com)
![Image alt text](image-url)
```

### Quotes
```markdown
> Important note or quote
```

## Tags

### Existing Tags
Use these existing tags when relevant:
- `'AI'`
- `'Blockchain'`
- `'Development'`
- `'Security'`
- `'Smart Contracts'`
- `'Tutorial'`
- `'Best Practices'`
- `'DeFi'`
- `'Software Engineering'`

### Tag Guidelines
- Use 3-5 tags per post
- Use title case: `'Smart Contracts'` not `'smart contracts'`
- Create new tags sparingly - reuse existing ones when possible

## Template Reference

**Instead of using this old template, simply copy the template post that's already in your `/src/data/blogPosts.ts` file!**

The current template post includes:
- ✅ Proper structure and all required fields
- ✅ Markdown formatting examples
- ✅ Code block demonstrations
- ✅ List formatting (bullets and numbered)
- ✅ Bold, italic, and blockquote examples
- ✅ Working image URL
- ✅ Proper content organization

**To use it:**
1. Copy the entire template post object
2. Change `id: '1'` to `id: '2'` (or next available number)
3. Update all the fields with your content
4. Keep the same structure and formatting patterns

**Legacy Template (for reference only):**

```typescript
{
  id: 'X', // Update this number
  title: 'Your Amazing Blog Post Title',
  slug: 'your-amazing-blog-post-title',
  excerpt: 'Write a compelling 1-2 sentence description that will make people want to read more.',
  author: 'Tim Illguth',
  publishDate: '2024-12-25', // Today's date
  readTime: 8, // Estimate based on content length
  tags: ['Blockchain', 'Development', 'Tutorial'], // Choose relevant tags
  featured: false, // Set to true for featured posts
  image: 'https://images.pexels.com/photos/PEXELS_ID/pexels-photo-PEXELS_ID.jpeg?auto=compress&cs=tinysrgb&w=800',
  content: `
# Your Amazing Blog Post Title

Start with an engaging introduction...

## Main Section

Your primary content...

## Conclusion

Wrap up your thoughts...
  `
}
```

## After Adding Your Post

1. **Save** `/src/data/blogPosts.ts`
2. **No restart needed** - Hot reload updates automatically
3. **Check your website:**
   - New post appears in home page blog section
   - Post appears on `/blog` page
   - Individual post accessible at `/your-post-slug`
4. **Test functionality:**
   - Click through to ensure post loads properly
   - Verify images display correctly
   - Check that tags and metadata appear correctly

## Troubleshooting

### Common Issues

**Image not loading:**
- Verify the Pexels image ID is correct
- Ensure the URL format matches the template exactly
- Check browser console for 404 errors

**Post not appearing:**
- Check for syntax errors in the TypeScript object
- Ensure all required fields are filled
- Verify the comma after the previous post object

**Broken routing:**
- Ensure the slug is properly formatted (lowercase, hyphens only)
- Check that the slug is unique (not used by other posts)

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify the file syntax using your code editor's TypeScript checking
3. Compare your new post structure with existing working posts

## Best Practices

1. **Write engaging excerpts** - This is what draws readers in from the blog listing
2. **Use descriptive titles** - Clear, specific titles perform better
3. **Structure your content** - Use headers to break up long sections
4. **Include code examples** - When relevant, show practical implementations
5. **End with value** - Conclude with actionable insights or next steps
6. **Proofread** - Check for typos and formatting issues before publishing

---

Happy blogging! 🚀