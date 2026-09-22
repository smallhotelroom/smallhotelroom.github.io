/* v1.0.0 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ObfuscatedEmail from './ObfuscatedEmail';

const LegalPrivacy = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-24 text-gray-300 space-y-8">
      <div className="mb-8">
        <Link to="/" className="text-shr-green hover:text-white transition-colors duration-300">
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Legal Notice & Privacy Policy</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">1. Identity of the Data Controller</h2>
        <p>
          In compliance with the General Data Protection Regulation (GDPR) and the Spanish Law on Information Society Services (LSSI), the entity responsible for this website is:
        </p>
        <ul className="list-disc list-inside bg-gray-900/50 p-4 rounded-lg space-y-2">
          <li><strong>Entity:</strong> Small Hotel Room</li>
          <li><strong>Email:</strong> <ObfuscatedEmail /></li>
          <li><strong>Address:</strong> Pending Post Office Box</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">2. Data Collection and Purpose</h2>
        <p>This website prioritizes your privacy and collects minimal data. We do not use our own tracking cookies or analytics.</p>
        
        <h3 className="text-xl font-medium text-white mt-4">Donations and PayPal Transfers</h3>
        <p>
          When using the "Donate" section, the form directly posts your selected options (including physical address requirements or custom messages) to PayPal. Small Hotel Room acts only as the collection point. All financial and personal data is processed securely by PayPal as an independent data controller. We recommend reviewing <a href="https://www.paypal.com/us/legalhub/privacy-full" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">PayPal's Privacy Policy</a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">3. Storage & Cookie Policy</h2>
        <p>
          We use browser <code>localStorage</code> exclusively to remember your explicit consent choices regarding third-party media players (YouTube and Bandcamp). 
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>What we store:</strong> Keys indicating your consent (e.g., <code>shr-consent-YouTube</code>) alongside a timestamp.</li>
          <li><strong>Expiration:</strong> This consent logic expires automatically after 180 days.</li>
          <li><strong>Third-Party Tracking:</strong> If you choose to load these players, YouTube and/or Bandcamp may place their own tracking cookies on your device.</li>
          <li><strong>Revocation:</strong> You can wipe this local storage at any time by clicking "Revoke Cookie Consent" in the site footer.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">4. User Rights</h2>
        <p>
          Under the GDPR, you have the right to access, rectify, or erase your data, as well as restrict or object to its processing. Since we do not retain a database of user information, any requests related to data processed via donations should be directed to PayPal. For direct inquiries, please contact us at the email provided above.
        </p>
      </section>
    </div>
  );
};

export default LegalPrivacy;