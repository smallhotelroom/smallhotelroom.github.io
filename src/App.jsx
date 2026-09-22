/* v1.6.4 */
import React from "react";
import { useNavigate, useParams, useSearchParams, useLocation, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContentModal from "./components/ContentModal";
import MusicSection from "./components/MusicSection";
import VideoSection from "./components/VideoSection";
import ArtworkSection from "./components/ArtworkSection";
import DonateSection from "./components/DonateSection";
import CopyleftSection from "./components/CopyleftSection";
import GlobalSEO from "./components/GlobalSEO";
import NotFound from "./components/NotFound"; 
import LegalPrivacy from "./components/LegalPrivacy"; 
import { musicData } from "./utils/musicData";

const Layout = () => {
  const { songId, extraId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialLang = searchParams.get("lang");
  const isLegalRoute = location.pathname === '/legal';

  let selectedItem = null;
  const isExtra = Boolean(extraId);

  // Only run the search logic if we are not on the legal page
  if (!isLegalRoute) {
    if (songId) {
      for (const album of musicData) {
        if (album.tracks) {
          selectedItem = album.tracks.find(s => s.id === songId);
          if (selectedItem) break;
        }
      }
    } else if (extraId) {
      for (const album of musicData) {
        if (album.extras) {
          selectedItem = album.extras.find(e => e.id === extraId);
          if (selectedItem) break;
        }
      }
    }
  }

  const handleCloseModal = () => {
    navigate('/', { replace: true });
  };

  const handleRevokeConsent = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('shr-consent-')) {
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-shr-body font-sans scroll-smooth relative">
        <Navbar />

        {isLegalRoute ? (
          <div className="flex-grow w-full">
            <LegalPrivacy />
          </div>
        ) : (
          <>
            <header className="pt-16 md:pt-20 pb-2 text-center">
              <div className="max-w-6xl mx-auto px-4">
                 <img src="/img/shr-2000-324.png" alt="Small Hotel Room Banner" className="w-full h-auto rounded shadow-lg" />
              </div>
            </header>

            <main className="flex-grow max-w-6xl mx-auto px-4 pt-4 pb-32 space-y-6 w-full">
              <MusicSection />
              <VideoSection />
              <ArtworkSection />
              <DonateSection />
              <CopyleftSection />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-center text-gray-600 font-semibold text-sm mt-8 pb-4">
                <span>© {new Date().getFullYear()} Small Hotel Room</span>
                <span className="hidden sm:inline">|</span>
                <Link 
                  to="/legal"
                  className="hover:text-gray-400 underline decoration-transparent hover:decoration-gray-400 transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Legal & Privacy
                </Link>
                <span className="hidden sm:inline">|</span>
                <button 
                  onClick={handleRevokeConsent}
                  className="hover:text-gray-400 underline decoration-transparent hover:decoration-gray-400 transition-all duration-300 ease-in-out cursor-pointer"
                  aria-label="Revoke third-party cookie consent"
                >
                  Revoke Cookie Consent
                </button>
              </div>
            </main>

            <ContentModal 
              song={selectedItem} 
              isExtra={isExtra}
              initialLang={initialLang}
              onClose={handleCloseModal} 
            />
            
            <GlobalSEO song={selectedItem} isExtra={isExtra} />
          </>
        )}

        <Footer />
      </div>
    </HelmetProvider>
  );
};

const getSongPaths = () => {
  const paths = [];
  musicData.forEach(album => {
    if (album.tracks) album.tracks.forEach(track => paths.push(`songs/${track.id}`));
  });
  return paths;
};

const getExtraPaths = () => {
  const paths = [];
  musicData.forEach(album => {
    if (album.extras) album.extras.forEach(extra => paths.push(`extras/${extra.id}`));
  });
  return paths;
};

export const routes = [
  { path: '/', element: <Layout /> },
  {
    path: 'songs/:songId',
    element: <Layout />,
    getStaticPaths: () => getSongPaths(),
  },
  {
    path: 'extras/:extraId',
    element: <Layout />,
    getStaticPaths: () => getExtraPaths(),
  },
  { 
    path: 'legal',
    element: <Layout /> 
  },
  { 
    path: '404', 
    element: <NotFound /> 
  },
  { 
    path: '*', 
    element: <NotFound /> 
  }
];