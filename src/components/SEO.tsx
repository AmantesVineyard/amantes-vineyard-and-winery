import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  imageAlt?: string;
  keywords?: string;
  noIndex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

const SEO = ({
  title = "Amantes Vineyard and Winery - Temecula's Only Kosher Vineyard",
  description = "Experience Temecula's only kosher vineyard. Three generations of Persian Jewish winemaking heritage producing premium kosher Merlot and boutique wines in California's wine country.",
  canonical,
  type = 'website',
  image = "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png",
  imageAlt = "Amantes Vineyard and Winery - Premium Kosher Wines from Temecula",
  keywords = "kosher wine, Temecula winery, kosher vineyard, Persian Jewish wine, kosher Merlot, California kosher wine, boutique winery, kosher wine Temecula, Jewish winery",
  noIndex = false,
  author = "Amantes Vineyard and Winery",
  publishedTime,
  modifiedTime,
  section,
}: SEOProps) => {
  const siteUrl = "https://amantesvineyard.com";
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  
  // Ensure title is under 60 characters for SEO
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Ensure description is under 160 characters
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="title" content={optimizedTitle} />
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="creator" content={author} />
      <meta name="publisher" content="Amantes Vineyard and Winery" />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Amantes Vineyard and Winery" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#722F37" />
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Temecula" />
      <meta name="geo.position" content="33.4936;-117.1484" />
      <meta name="ICBM" content="33.4936, -117.1484" />
    </Helmet>
  );
};

export default SEO;