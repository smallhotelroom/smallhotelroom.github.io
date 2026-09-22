/* v2.0.1 - Hardcore Obfuscation */
import React, { useState, useEffect } from 'react';

const ObfuscatedEmail = () => {
  // 1. Safe fallback for static HTML generation (bots see this)
  const [emailStr, setEmailStr] = useState("Contact us via the form");
  const [isReady, setIsReady] = useState(false);

  // 2. The email 'admin@smallhotelroom.com' represented as ASCII char codes.
  // There is absolutely no clear text here for a regex scraper to find.
  const emailCodes = [
    97, 100, 109, 105, 110, 64, 115, 109, 97, 108, 108, 104, 
    111, 116, 101, 108, 114, 111, 111, 109, 46, 99, 111, 109
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      // 3. Reassemble the numbers into characters on the client's machine
      const decodedEmail = String.fromCharCode(...emailCodes);
      setEmailStr(decodedEmail);
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <a 
      href={isReady ? `mailto:${emailStr}` : "#"} 
      className="text-shr-green hover:underline transition-all duration-300"
      aria-label="Contact Email"
    >
      {emailStr}
    </a>
  );
};

export default ObfuscatedEmail;