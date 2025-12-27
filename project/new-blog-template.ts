// Template for new blog post - copy this structure into blogPosts.ts

{
  id: '4', // Increment the ID
  title: 'Your Blog Post Title',
  slug: 'your-blog-post-title', // URL-friendly version
  excerpt: 'Brief description of your article (1-2 sentences)',
  author: 'Tim Illguth',
  publishDate: '2024-12-20', // Today's date
  readTime: 5, // Estimated reading time in minutes
  tags: ['Tag1', 'Tag2', 'Tag3'], // Relevant tags
  featured: false, // Set to true for featured posts
  image: 'https://images.pexels.com/photos/IMAGE_ID/pexels-photo-IMAGE_ID.jpeg?auto=compress&cs=tinysrgb&w=800', // Optional
  content: `
# Your Blog Post Title

Your blog content goes here in Markdown format.

## Subheading

You can use:
- **Bold text**
- *Italic text*
- \`Code snippets\`
- Links: [Link text](https://example.com)

### Code Blocks
\`\`\`javascript
const example = "code block";
console.log(example);
\`\`\`

## Conclusion

Your conclusion here.
  `
}