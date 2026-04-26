import { useEffect } from 'react';

/**
 * PageMeta - sets document.title and meta description for any page/content item.
 *
 * Usage:
 *   <PageMeta title="Signal Intelligence" description="Real-time executive awareness..." />
 *   <PageMeta meta={article.meta} />          // pass a { title, description } object
 *   <PageMeta title={article.headline} description={article.summary} suffix />
 *
 * Props:
 *   title       - page title string (required unless `meta` is provided)
 *   description - meta description string
 *   meta        - { title, description } object (alternative to individual props)
 *   suffix      - if true, appends " | DTMI" to the title (default: true)
 */
const SITE_NAME = 'DTMI · DigitalQatalyst';

export default function PageMeta({ title, description, meta, suffix = true }) {
  const resolvedTitle       = meta?.title       || title       || '';
  const resolvedDescription = meta?.description || description || '';

  const fullTitle = resolvedTitle
    ? (suffix ? `${resolvedTitle} | ${SITE_NAME}` : resolvedTitle)
    : SITE_NAME;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', resolvedDescription);

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    // OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', resolvedDescription);

    // Cleanup: restore default on unmount
    return () => {
      document.title = SITE_NAME;
    };
  }, [fullTitle, resolvedDescription]);

  return null; // renders nothing
}
