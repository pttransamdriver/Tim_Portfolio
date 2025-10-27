export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentFile: string; // Path to markdown file
  author: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  image?: string;
  draft?: boolean; // Hide from public display if true
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Blog Post Template - Copy This Pattern',
    slug: 'blog-post-template-copy-this-pattern',
    excerpt: 'This is a template blog post that demonstrates the proper structure and formatting. Copy and modify this pattern for your new blog posts.',
    contentFile: 'blog-post-template.md',
    author: 'Tim Illguth',
    publishDate: '2024-12-25',
    readTime: 5,
    tags: ['Template', 'Guide', 'Example'],
    featured: true,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    draft: true, // Hide this template from public display
  },
  {
    id: '2',
    title: 'Vibe Coding vs Knowledgeable Developers: The AI Productivity Divide',
    slug: 'vibe-coding-vs-knowledgeable-developers-the-ai-productivity-divide',
    excerpt: 'The race to functional, upgradeable products has fundamentally shifted in 2025. While AI coding tools promise to democratize software development, the data reveals a counterintuitive truth: expertise amplifies AI benefits far more than enthusiasm alone.',
    contentFile: 'vibe-coding-vs-knowledgeable-developers-the-ai-productivity-divide.md',
    author: 'Tim Illguth',
    publishDate: '2025-05-15',
    readTime: 15,
    tags: ['AI', 'Development', 'Productivity', 'Career', 'Software Engineering'],
    featured: true,
    image: '/media/Vibe_coder.png',
  },
  {
    id: '3',
    title: 'Blockchain Development Principles: Building Secure and Scalable DApps',
    slug: 'blockchain-development-principles',
    excerpt: 'Master the fundamental principles of blockchain development, from smart contract security to gas optimization. Learn how to build robust decentralized applications that can handle real-world scale and complexity.',
    contentFile: 'blockchain-development-principles.md',
    author: 'Tim Illguth',
    publishDate: '2025-04-30',
    readTime: 12,
    tags: ['Blockchain', 'Smart Contracts', 'DeFi', 'Security', 'Ethereum'],
    featured: false,
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    title: 'Thoughts on Thread-Safe Blockchain Development',
    slug: 'thoughts-on-thread-safe-blockchain-development',
    excerpt: 'Blockchain development presents unique concurrency challenges that traditional thread-safety patterns cannot address. Explore how state conflicts, MEV, and transaction ordering create new paradigms for building robust decentralized applications.',
    contentFile: 'thoughts-on-thread-safety.md',
    author: 'Tim Illguth',
    publishDate: '2025-04-05',
    readTime: 10,
    tags: ['Blockchain', 'Concurrency', 'Smart Contracts', 'MEV', 'Architecture'],
    featured: false,
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    title: 'Solidity Gas Optimization: Stop Using uint256 for Everything',
    slug: 'save-up-to-half-of-your-gas-fees',
    excerpt: 'Most Solidity developers default to uint256 for all integer declarations, but this bad habit costs users millions in unnecessary gas fees. Learn how byte packing and proper type selection can dramatically reduce your smart contract costs.',
    contentFile: 'save-up-to-half-of-your-gas-fees.md',
    author: 'Tim Illguth',
    publishDate: '2025-10-13',
    readTime: 14,
    tags: ['Solidity', 'Gas Optimization', 'Smart Contracts', 'Ethereum', 'Best Practices'],
    featured: true,
    image: '/media/bytestacking.png',
  },
  {
    id: '6',
    title: 'Getting Started with Agentic Coding: Your First Step into AI-Assisted Development',
    slug: 'getting-started-with-agentic-coding',
    excerpt: 'Discover how agentic coding tools like Claude Code, AmazonQ, and Augment Code are transforming software development. Learn which tools to use, when to use them, and how to integrate them into your VS Code workflow for maximum productivity.',
    contentFile: 'getting-started-with-agentic-coding.md',
    author: 'Tim Illguth',
    publishDate: '2025-10-27',
    readTime: 18,
    tags: ['AI', 'Agentic Coding', 'VS Code', 'Developer Tools', 'Productivity', 'Claude Code', 'AmazonQ', 'Augment Code'],
    featured: true,
    image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
  }
];
