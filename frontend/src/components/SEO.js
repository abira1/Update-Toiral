import { useEffect } from 'react';

const SEO = ({
  title = "Toiral - Professional Web Development & Design Agency",
  description = "Toiral - Professional web development and design agency. We craft digital experiences that truly reflect your brand's soul through innovative design, development, and SEO services.",
  keywords = "web development, web design, SEO services, custom websites, responsive design, digital agency, Bangladesh, Dhaka, React development, modern web design",
  author = "Toiral Web Development Company",
  url = "https://toiral-development.web.app/",
  image = "https://i.postimg.cc/G2yPfwK1/toiral__2_.png",
  type = "website",
  siteName = "Toiral",
  twitterHandle = "@ToiralOfficial",
  locale = "en_US",
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
  nofollow = false,
  canonical
}) => {
  useEffect(() => {
    // Construct full title
    const fullTitle = title.includes('Toiral') ? title : `${title} | Toiral`;

    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update canonical link
    const updateCanonicalLink = (href) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`);

    // Open Graph meta tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:alt', 'Toiral Logo - Professional Web Development Agency', true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', twitterHandle);
    updateMetaTag('twitter:creator', twitterHandle);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', 'Toiral Logo - Professional Web Development Agency');

    // Update canonical URL
    const canonicalUrl = canonical || url;
    updateCanonicalLink(canonicalUrl);

    // Add structured data
    const addStructuredData = (schema, id) => {
      // Remove existing script if it exists
      const existingScript = document.querySelector(`script[data-schema="${id}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', id);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Structured Data for Organization
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Toiral",
      "alternateName": "Toiral Web Development Company",
      "url": "https://toiral-development.web.app",
      "logo": "https://i.postimg.cc/G2yPfwK1/toiral__2_.png",
      "description": "Professional web development and design agency specializing in custom websites, SEO services, and digital experiences.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "Bangladesh"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+880-1804-673095",
        "contactType": "customer service",
        "email": "contact@toiral.com"
      },
      "sameAs": [
        "https://www.instagram.com/toiral.offical/",
        "https://x.com/ToiralOfficial",
        "https://web.facebook.com/toiral",
        "https://youtube.com/@toiral?si=eqi2upNagvQ6aZcx"
      ],
      "foundingDate": "2024",
      "numberOfEmployees": "2-10",
      "slogan": "Imagine • Develop • Deploy"
    };

    // Structured Data for Website
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Toiral",
      "url": "https://toiral-development.web.app",
      "description": description,
      "publisher": {
        "@type": "Organization",
        "name": "Toiral"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://toiral-development.web.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Add structured data
    addStructuredData(organizationSchema, 'organization');
    addStructuredData(websiteSchema, 'website');

  }, [title, description, keywords, author, url, image, type, siteName, twitterHandle, locale, publishedTime, modifiedTime, section, tags, noindex, nofollow, canonical]);

  return null; // This component doesn't render anything visible
};

export default SEO;
