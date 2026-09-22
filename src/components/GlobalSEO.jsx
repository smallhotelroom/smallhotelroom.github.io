/* v1.5.0 */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const GlobalSEO = ({ song, isExtra }) => {
  
  // 1. DYNAMIC SCHEMA FOR SONGS (Injected via DOM so Helmet doesn't strip it)
  useEffect(() => {
    if (!song || isExtra) return;

    const artistName = song.artist || "Small Hotel Room";
    const clearanceStatus = song.clearance || "One-Stop (100% Master and Publishing, 100% Human-Created)";

    // Collect external streaming links to tell Google they are the same entity
    const sameAsLinks = [];
    if (song.spotify) sameAsLinks.push(`https://open.spotify.com/track/${song.spotify}`);
    if (song.youtube) sameAsLinks.push(`https://www.youtube.com/watch?v=${song.youtube}`);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "name": song.title,
      "copyrightNotice": clearanceStatus,
      "byArtist": {
          "@type": "MusicGroup",
          "name": artistName
      },
      ...(song.album && {
        "inAlbum": {
          "@type": "MusicAlbum", // <-- Reverted to avoid Google's e-commerce bot
          "name": song.album,
          ...(song.albumUpc && { "gtin12": song.albumUpc })
        }
      }),
      ...(song.isrc && { "isrcCode": song.isrc }),
      ...(song.url && { "url": song.url }),
      ...(sameAsLinks.length > 0 && { "sameAs": sameAsLinks }),
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "description": "Sync Licensing Available: " + clearanceStatus
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-song-schema';
    script.innerHTML = JSON.stringify(jsonLd);

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('dynamic-song-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [song, isExtra]);

  // 2. ROOT ENTITY SCHEMA FOR THE HOMEPAGE
  if (!song && !isExtra) {
    const rootJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://smallhotelroom.com/#website",
          "url": "https://smallhotelroom.com/",
          "name": "Small Hotel Room",
          "description": "The official website of Small Hotel Room music band/project."
        },
        {
          "@type": "MusicGroup",
          "@id": "https://smallhotelroom.com/#musicgroup",
          "name": "Small Hotel Room",
          "url": "https://smallhotelroom.com/",
          "image": "https://smallhotelroom.com/img/shr-2000-324.png",
          "description": "Rock music band/project.",
          "sameAs": [
            "https://www.youtube.com/@smallhotelroom",
            "https://smallhotelroom.bandcamp.com",
            "https://www.instagram.com/smallhotelroom",
            "https://www.facebook.com/SmallHotelRoom",
            "https://x.com/smallhotelroom"
          ]
        }
      ]
    };

    return (
      <Helmet>
        <title>Small Hotel Room | The Official Site</title>
        <meta name="description" content="The official website of Small Hotel Room. Listen to albums, find lyrics, watch videos, and get official tablatures." />
        <meta property="og:title" content="Small Hotel Room | The Official Site" />
        <meta property="og:description" content="Listen to albums, find lyrics, watch videos, and get official tablatures." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smallhotelroom.com/" />
        
        {/* Force the schema into the DOM securely using dangerouslySetInnerHTML */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }} />
      </Helmet>
    );
  }

  // 3. STANDARD META TAGS FOR SPECIFIC SONG/EXTRA PAGES
  const artistName = song.artist || "Small Hotel Room";
  const pageTitle = `${song.title} | ${artistName}`;
  
  const pageDescription = isExtra 
    ? `Small Hotel Room: ${song.title}`
    : `Lyrics and music for ${song.title} by ${artistName}. One-Stop Sync Clearance available.`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      
      {!isExtra && <meta property="og:type" content="music.song" />}
      {!isExtra && <meta property="music:musician" content={artistName} />}
      
      {song.album && <meta property="music:album" content={song.album} />}
      {song.url && <meta property="og:url" content={song.url} />}
    </Helmet>
  );
};

export default GlobalSEO;