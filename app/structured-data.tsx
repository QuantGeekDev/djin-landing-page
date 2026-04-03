export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://get.jinn.today/#organization",
    name: "Jinn",
    url: "https://get.jinn.today",
    logo: {
      "@type": "ImageObject",
      url: "https://get.jinn.today/logo.png",
    },
    sameAs: [
      "https://github.com/QuantGeekDev",
      "mailto:hello@get.jinn.today",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@get.jinn.today",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Jinn HoloBox",
    description:
      "AI agent smart display with voice control, smart home integration, and AI-powered daily assistance. 5-inch IPS touchscreen, quad-core ARM processor, on-device wake word detection.",
    brand: {
      "@type": "Brand",
      name: "Jinn",
    },
    category: "Smart Home > Smart Displays",
    offers: {
      "@type": "Offer",
      url: "https://get.jinn.today/#pricing",
      priceCurrency: "USD",
      price: "299.00",
      availability: "https://schema.org/PreOrder",
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Jinn",
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Display Size", value: "5 inches" },
      { "@type": "PropertyValue", name: "Resolution", value: "720 x 1280" },
      { "@type": "PropertyValue", name: "Processor", value: "Quad-core ARM (RK3566)" },
      { "@type": "PropertyValue", name: "RAM", value: "4 GB" },
      { "@type": "PropertyValue", name: "Storage", value: "32 GB eMMC" },
      { "@type": "PropertyValue", name: "WiFi", value: "802.11ac (5 GHz)" },
      { "@type": "PropertyValue", name: "OS", value: "Linux (Armbian)" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jinn",
    url: "https://get.jinn.today",
    description: "Jinn HoloBox \u2014 an AI assistant that lives in your home.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
