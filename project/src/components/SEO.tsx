import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishDate?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Tim Illguth - Fullstack Blockchain Developer & Network Engineer',
  description = 'Certified Blockchain Developer, Linux Engineer, and Network Security Specialist building secure, scalable solutions for the decentralized future.',
  keywords = ['blockchain', 'developer', 'smart contracts', 'web3', 'defi', 'network security'],
  image = 'https://timillguth.com/og-image.jpg',
  url = 'https://timillguth.com',
  type = 'website',
  publishDate,
  author = 'Tim Illguth'
}) => {
  const siteTitle = 'Tim Illguth';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@timillguth" />

      {/* Article specific meta tags */}
      {type === 'article' && publishDate && (
        <>
          <meta property="article:published_time" content={publishDate} />
          <meta property="article:author" content={author} />
          {keywords.map((keyword) => (
            <meta key={keyword} property="article:tag" content={keyword} />
          ))}
        </>
      )}

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* Structured Data for Articles */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": image,
            "author": {
              "@type": "Person",
              "name": author,
              "url": "https://timillguth.com"
            },
            "publisher": {
              "@type": "Person",
              "name": author,
              "url": "https://timillguth.com"
            },
            "datePublished": publishDate,
            "dateModified": publishDate,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
