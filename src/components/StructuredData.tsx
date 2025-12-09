import { Helmet } from 'react-helmet-async';

// Local Business Schema for Winery
export const WinerySchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Winery",
    "name": "Amantes Vineyard and Winery",
    "description": "Temecula's only kosher vineyard offering premium kosher wines crafted with Persian Jewish winemaking traditions.",
    "url": "https://amantesvineyard.com",
    "telephone": "+1-866-657-3411",
    "email": "info@amantesvineyard.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "40420 Calle Concion",
      "addressLocality": "Temecula",
      "addressRegion": "CA",
      "postalCode": "92592",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.4936,
      "longitude": -117.1484
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.instagram.com/AmantesVineyard",
      "https://www.tiktok.com/@AmantesVineyard",
      "https://youtube.com/@legendofthechosen"
    ],
    "image": "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Kosher Wines",
      "itemListElement": [
        {
          "@type": "Product",
          "name": "3Girlfriends 2020 Merlot Limited Reserve",
          "category": "Merlot - Limited Reserve"
        },
        {
          "@type": "Product", 
          "name": "Toi et Moi 2022 Merlot",
          "category": "Merlot"
        },
        {
          "@type": "Product",
          "name": "LeParlay 2022 Merlot", 
          "category": "Merlot"
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Organization Schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Amantes Vineyard and Winery",
    "url": "https://amantesvineyard.com",
    "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-866-657-3411",
      "contactType": "customer service",
      "email": "info@amantesvineyard.com",
      "availableLanguage": ["English", "Persian"]
    },
    "sameAs": [
      "https://www.instagram.com/AmantesVineyard",
      "https://www.tiktok.com/@AmantesVineyard", 
      "https://youtube.com/@legendofthechosen"
    ],
    "founder": {
      "@type": "Person",
      "name": "Dr. Joseph Nassir",
      "jobTitle": "Founder, President, CEO and Director of Winemaking Operations"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://amantesvineyard.com${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Article/Blog Schema
interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export const ArticleSchema = ({ 
  title, 
  description, 
  datePublished = "2024-01-01",
  dateModified,
  image,
  url 
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png"
      }
    },
    "image": image,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://amantesvineyard.com${url}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSchema = ({ faqs }: { faqs: FAQItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Product Schema for Wines
interface WineProductProps {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
}

export const WineProductSchema = ({ wines }: { wines: WineProductProps[] }) => {
  const schema = wines.map(wine => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": wine.name,
    "description": wine.description,
    "image": wine.image,
    "url": wine.url,
    "category": wine.category,
    "brand": {
      "@type": "Brand",
      "name": "Amantes Vineyard"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery"
    }
  }));

  return (
    <Helmet>
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
