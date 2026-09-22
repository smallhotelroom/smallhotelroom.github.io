/* v1.4.2 */
import React, { useState, useEffect } from 'react';

const CookieSafeEmbed = ({ src, title, providerName, coverArt, containerClass = "aspect-video" }) => {
  const [hasConsent, setHasConsent] = useState(false);
  const [wasJustClicked, setWasJustClicked] = useState(false);

  // 1. Create a unique storage key per provider (e.g., 'shr-consent-YouTube', 'shr-consent-Bandcamp')
  const storageKey = `shr-consent-${providerName}`;
  const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000; // 180 days in milliseconds

  useEffect(() => {
    // Check if they consented in a previous session and if it is still valid
    const savedConsentTime = localStorage.getItem(storageKey);
    
    if (savedConsentTime) {
      const timePassed = Date.now() - parseInt(savedConsentTime, 10);
      if (timePassed < CONSENT_DURATION_MS) {
        setHasConsent(true);
      } else {
        // Clean up expired consent
        localStorage.removeItem(storageKey);
      }
    }

    // 2. Listen for a custom event so siblings can wake up instantly
    const handleGlobalConsent = (e) => {
      // If another widget fired this event for THIS provider, wake up!
      if (e.detail === providerName) {
        setHasConsent(true);
        // Notice we don't set wasJustClicked to true here. 
        // This means the one they clicked will crossfade, but the others will just snap in cleanly.
      }
    };

    window.addEventListener('shr-consent-updated', handleGlobalConsent);
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('shr-consent-updated', handleGlobalConsent);
  }, [providerName, storageKey]);

  const handleAccept = () => {
    // Save consent specifically for this provider with a timestamp
    localStorage.setItem(storageKey, Date.now().toString());
    setWasJustClicked(true); 
    setHasConsent(true);

    // 3. Broadcast to all other players on the page that this provider is now allowed
    window.dispatchEvent(new CustomEvent('shr-consent-updated', { detail: providerName }));
  };

  return (
    <div className={`relative w-full rounded-lg shadow-lg overflow-hidden bg-black group ${containerClass}`}>
      
      {hasConsent ? (
        <iframe 
          className={`absolute inset-0 w-full h-full border-0 ${wasJustClicked ? 'animate-fade-in' : ''}`} 
          src={src} 
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-fade-in"
          style={{ 
            backgroundImage: coverArt ? `url(${coverArt})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gray-900/40 transition-colors group-hover:bg-gray-900/60"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <button 
              onClick={handleAccept}
              className="mb-4 text-white hover:text-shr-green transition-colors"
              aria-label={`Load ${providerName} Player`}
            >
              <svg className="w-16 h-16 drop-shadow-lg transform transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
            
            <p className="text-sm font-semibold text-white drop-shadow-md max-w-sm mx-auto leading-relaxed px-4">
              Load {providerName} Player <br/>
              <span className="text-xs font-normal opacity-80">(Accepts {providerName} tracking cookies)</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieSafeEmbed;