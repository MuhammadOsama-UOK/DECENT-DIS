import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

export default function SEO({ 
  title = "Decent Disposal | Premium Asset Management & Renovation Experts", 
  description = "Decent Disposal provides premium asset management, office renovation, and heavy relocation services. We refine corporate spaces and maximize value.", 
  keywords = "decent disposal, asset management, office renovation, scrap rates pakistan, scrap buyers, ceiling design, glass work, premium paint, flooring, electrical work, lifting and shifting", 
  url = "https://decentdisposal.pk/",
  image = "https://decentdisposal.pk/decent.png" // Best to use an absolute URL to your logo/og-image
}: SEOProps) {
  const siteTitle = title.includes('Decent Disposal') ? title : `${title} | Decent Disposal`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
