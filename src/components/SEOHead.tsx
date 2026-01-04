import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { languages, languageToPath, type LanguageCode } from '../i18n';

const BASE_URL = 'https://table-conv.pages.dev';

const SEOHead: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    // Update document title
    document.title = t('meta.title');

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t('meta.description'));
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t('meta.ogTitle'));
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', t('meta.ogDescription'));
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `${BASE_URL}/${lang}/`);
    }

    // Update Twitter cards
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', t('meta.ogTitle'));
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', t('meta.twitterDescription'));
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${BASE_URL}/${lang}/`);
    }

    // Update lang attribute
    const langMap: Record<string, string> = {
      jp: 'ja',
      en: 'en',
      cn: 'zh-CN',
    };
    document.documentElement.lang = langMap[lang || 'jp'] || 'ja';

    // Update hreflang links
    updateHreflangLinks(lang || 'jp');

    // Update JSON-LD
    updateJsonLd(t('meta.description'), lang || 'jp');
  }, [t, i18n.language, lang]);

  return null;
};

// Update hreflang links for SEO
function updateHreflangLinks(currentLang: string) {
  // Remove existing hreflang links
  document.querySelectorAll('link[hreflang]').forEach(el => el.remove());

  const head = document.head;

  // Add hreflang for each language
  const hreflangMap: Record<string, string> = {
    jp: 'ja',
    en: 'en',
    cn: 'zh-Hans',
  };

  Object.entries(hreflangMap).forEach(([path, hreflang]) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = `${BASE_URL}/${path}/`;
    head.appendChild(link);
  });

  // Add x-default (points to root which redirects)
  const defaultLink = document.createElement('link');
  defaultLink.rel = 'alternate';
  defaultLink.hreflang = 'x-default';
  defaultLink.href = `${BASE_URL}/`;
  head.appendChild(defaultLink);
}

// Update JSON-LD structured data
function updateJsonLd(description: string, lang: string) {
  const existingScript = document.querySelector('script[type="application/ld+json"]');

  const langNames: Record<string, string> = {
    jp: 'ja',
    en: 'en',
    cn: 'zh-Hans',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TableConv',
    url: `${BASE_URL}/${lang}/`,
    description: description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'CSV Conversion',
      'JSON Conversion',
      'Markdown Conversion',
      'HTML Conversion',
      'TeX/LaTeX Conversion',
      'File Upload',
      'Real-time Preview',
      'Cell Editing',
    ],
    inLanguage: langNames[lang] || 'ja',
  };

  if (existingScript) {
    existingScript.textContent = JSON.stringify(jsonLd, null, 2);
  }
}

export default SEOHead;
