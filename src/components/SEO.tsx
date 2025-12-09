import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  keywords?: string;
  noIndex?: boolean;
}

const SEO = ({
  title = "Amantes Vineyard and Winery - Temecula's Only Kosher Vineyard",
  description = "Experience Temecula's only kosher vineyard. Discover our Persian Jewish winemaking heritage and premium kosher wines in California's wine country.",
  canonical,
  type = 'website',
  image = "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png",
  keywords = "kosher wine, Temecula winery, kosher vineyard, Persian Jewish wine, kosher Merlot, California kosher wine, boutique winery",
  noIndex = false,
}: SEOProps) => {
  const siteUrl = "https://amantesvineyard.com";
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Amantes Vineyard and Winery" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Amantes Vineyard and Winery" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
