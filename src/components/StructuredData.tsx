const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Chinese Idioms Collection",
  "alternateName": "歇后语英文译解",
  "url": "https://idioms-collection.vaste.top",
  "description": "Explore traditional Chinese two-part allegorical sayings (歇后语) with English translations and cultural insights",
  "inLanguage": "en",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://idioms-collection.vaste.top/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Chinese Idioms Collection",
    "logo": {
      "@type": "ImageObject",
      "url": "https://idioms-collection.vaste.top/favicon.png"
    }
  }
}

const webpageStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Chinese Idioms Collection",
  "description": "Discover classic Chinese two-part allegorical sayings (歇后语) with English translations and cultural insights",
  "url": "https://idioms-collection.vaste.top",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 20,
    "itemListElement": [
      {
        "@type": "Article",
        "position": 1,
        "name": "Drawing water with a bamboo basket",
        "description": "All in vain - A Chinese idiom metaphorically describing wasting effort with no result",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "竹篮打水"
        }
      },
      {
        "@type": "Article",
        "position": 2,
        "name": "Hitting a dog with a meat bun",
        "description": "Gone forever - A Chinese idiom from Journey to the West about things that cannot be recovered",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "肉包子打狗"
        }
      },
      {
        "@type": "Article",
        "position": 3,
        "name": "A mute eating bitter herbs",
        "description": "Suffering in silence - A Chinese idiom about grievances that cannot be expressed",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "哑巴吃黄连"
        }
      },
      {
        "@type": "Article",
        "position": 4,
        "name": "Drawing feet on a snake",
        "description": "Gilding the lily - A Chinese idiom about doing unnecessary things that ruin the result",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "画蛇添足"
        }
      },
      {
        "@type": "Article",
        "position": 5,
        "name": "A frog in a well",
        "description": "Short-sighted - A Chinese idiom about narrow vision and limited perspective",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "井底之蛙"
        }
      },
      {
        "@type": "Article",
        "position": 6,
        "name": "A person from Qi worrying about the sky",
        "description": "Unnecessary anxiety - A Chinese idiom about groundless worries",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "杞人忧天"
        }
      },
      {
        "@type": "Article",
        "position": 7,
        "name": "Covering one's ears to steal a bell",
        "description": "Deceiving oneself - A Chinese idiom about self-deception",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "掩耳盗铃"
        }
      },
      {
        "@type": "Article",
        "position": 8,
        "name": "Carving a mark on a boat to find a sword",
        "description": "Rigid thinking - A Chinese idiom about inflexibility and inability to adapt",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "刻舟求剑"
        }
      },
      {
        "@type": "Article",
        "position": 9,
        "name": "Waiting by a stump for a rabbit",
        "description": "Relying on luck and inflexibility - A Chinese idiom about sticking to narrow experience",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "守株待兔"
        }
      },
      {
        "@type": "Article",
        "position": 10,
        "name": "Showing off one's axe skills at Lu Ban's door",
        "description": "Overestimating oneself - A Chinese idiom about showing off in front of experts",
        "inLanguage": "en",
        "about": {
          "@type": "Thing",
          "name": "Chinese Idiom",
          "alternateName": "班门弄斧"
        }
      }
    ]
  },
  "author": {
    "@type": "Organization",
    "name": "Chinese Idioms Collection"
  },
  "datePublished": "2024-01-01",
  "dateModified": "2024-01-01",
  "image": "https://idioms-collection.vaste.top/favicon.png"
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageStructuredData) }}
      />
    </>
  )
}
