import { Helmet } from 'react-helmet-async';

// WebSite Schema for Sitelinks Search Box
export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Amantes Vineyard and Winery",
    "alternateName": ["Amantes Winery", "Amantes Vineyard"],
    "url": "https://amantesvineyard.com",
    "description": "Temecula's only kosher vineyard producing premium kosher wines with Persian Jewish winemaking traditions.",
    "publisher": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://amantesvineyard.com/wines?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
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

// Local Business Schema for Winery
export const WinerySchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Winery",
    "@id": "https://amantesvineyard.com/#winery",
    "name": "Amantes Vineyard and Winery",
    "alternateName": "Amantes Winery",
    "description": "Temecula's only kosher vineyard offering premium kosher wines crafted with Persian Jewish winemaking traditions spanning three generations.",
    "url": "https://amantesvineyard.com",
    "telephone": "1-866-657-3411",
    "email": "amantes@amantesvineyard.com",
    "foundingDate": "2019",
    "founder": {
      "@type": "Person",
      "name": "Dr. Joseph Nassir",
      "jobTitle": "Founder & CEO"
    },
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
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 33.4936,
        "longitude": -117.1484
      },
      "geoRadius": "100 mi"
    },
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/AmantesVineyard",
      "https://www.tiktok.com/@AmantesVineyard",
      "https://youtube.com/@legendofthechosen"
    ],
    "image": [
      "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png"
    ],
    "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png",
    "slogan": "Temecula's Only Kosher Vineyard",
    "knowsAbout": [
      "Kosher Wine Production",
      "Persian Jewish Winemaking",
      "Merlot",
      "Wine Tasting",
      "Boutique Winery"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Kosher Wine Collection",
      "itemListElement": [
        {
          "@type": "Product",
          "name": "3Girlfriends 2020 Merlot Limited Reserve",
          "category": "Merlot - Limited Reserve",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "USD"
          }
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
        },
        {
          "@type": "Product",
          "name": "3Girlfriends 2021 Merlot",
          "category": "Merlot"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5"
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
    "@id": "https://amantesvineyard.com/#organization",
    "name": "Amantes Vineyard and Winery",
    "legalName": "Amantes Vineyard and Winery LLC",
    "url": "https://amantesvineyard.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://storage.googleapis.com/gpt-engineer-file-uploads/1ebL5HwaQgY83LZ2gT4mBB6wnBQ2/social-images/social-1761203871034-FB-icon-AmantesLogo-Bluebg.png",
      "width": "512",
      "height": "512"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "1-866-657-3411",
        "contactType": "customer service",
        "email": "amantes@amantesvineyard.com",
        "availableLanguage": ["English", "Persian", "Hebrew"],
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "telephone": "1-866-657-3411",
        "contactType": "sales",
        "email": "amantes@amantesvineyard.com",
        "availableLanguage": ["English"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/AmantesVineyard",
      "https://www.tiktok.com/@AmantesVineyard",
      "https://youtube.com/@legendofthechosen"
    ],
    "founder": {
      "@type": "Person",
      "name": "Dr. Joseph Nassir",
      "jobTitle": "Founder, President, CEO and Director of Winemaking Operations",
      "description": "A first-generation Persian American doctor, philanthropist and champion of Jewish values with four generations of winemaking tradition."
    },
    "foundingDate": "2019",
    "foundingLocation": {
      "@type": "Place",
      "name": "Temecula Valley, California"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 5,
      "maxValue": 15
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

// SiteNavigationElement Schema
export const NavigationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Home",
        "url": "https://amantesvineyard.com/"
      },
      {
        "@type": "WebPage",
        "name": "About Us",
        "url": "https://amantesvineyard.com/about"
      },
      {
        "@type": "WebPage",
        "name": "Our Wines",
        "url": "https://amantesvineyard.com/wines"
      },
      {
        "@type": "WebPage",
        "name": "Buy Wine",
        "url": "https://amantesvineyard.com/buy-wine"
      },
      {
        "@type": "WebPage",
        "name": "Our Team",
        "url": "https://amantesvineyard.com/team"
      },
      {
        "@type": "WebPage",
        "name": "History",
        "url": "https://amantesvineyard.com/history"
      },
      {
        "@type": "WebPage",
        "name": "Contact",
        "url": "https://amantesvineyard.com/contact"
      }
    ]
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
      "name": "Amantes Vineyard and Winery",
      "url": "https://amantesvineyard.com"
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
    },
    "inLanguage": "en-US"
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
  sku?: string;
  price?: string;
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
    "sku": wine.sku || wine.name.replace(/\s+/g, '-').toLowerCase(),
    "brand": {
      "@type": "Brand",
      "name": "Amantes Vineyard"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery",
      "url": "https://amantesvineyard.com"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "seller": {
        "@type": "Organization",
        "name": "Amantes Vineyard and Winery"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Kosher Certification",
        "value": "Yes"
      },
      {
        "@type": "PropertyValue",
        "name": "Wine Region",
        "value": "Temecula Valley, California"
      }
    ]
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

// Event Schema for tastings/events
interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  url?: string;
  image?: string;
}

export const EventSchema = ({ events }: { events: EventSchemaProps[] }) => {
  const schema = events.map(event => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate || event.startDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Amantes Vineyard and Winery",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "40420 Calle Concion",
        "addressLocality": "Temecula",
        "addressRegion": "CA",
        "postalCode": "92592",
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery",
      "url": "https://amantesvineyard.com"
    },
    "image": event.image
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

// WebPage Schema
interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbItem[];
}

export const WebPageSchema = ({ name, description, url, breadcrumb }: WebPageSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": `https://amantesvineyard.com${url}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Amantes Vineyard and Winery",
      "url": "https://amantesvineyard.com"
    },
    "about": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery"
    },
    "inLanguage": "en-US",
    ...(breadcrumb && {
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `https://amantesvineyard.com${item.url}`
        }))
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Person Schema for team members
interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
}

export const PersonSchema = ({ people }: { people: PersonSchemaProps[] }) => {
  const schema = people.map(person => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "description": person.description,
    "image": person.image,
    "worksFor": {
      "@type": "Organization",
      "name": "Amantes Vineyard and Winery",
      "url": "https://amantesvineyard.com"
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