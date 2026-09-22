/* v1.1.1 */
import React from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-shr-body font-sans scroll-smooth relative">
        <Helmet>
          <title>Page Unavailable | Small Hotel Room</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        
        <Navbar />

        <main className="flex-grow flex items-center justify-center max-w-6xl mx-auto px-4 py-32 w-full text-center">
          <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-300 shadow-xl max-w-lg w-full animate-fade-in-up">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Oh no!</h1>
            <h2 className="text-2xl font-bold text-shr-green mb-6 border-b border-gray-200 pb-4">Content Unavailable</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The track you are looking for has been moved, the link is broken, or the directory is restricted. Let's get you back to the music.
            </p>
            <Link 
              to="/" 
              className="inline-block px-8 py-3 font-bold rounded shadow-sm transition-all bg-gray-800 text-white hover:bg-shr-green transform hover:-translate-y-1"
            >
              Return to Homepage
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default NotFound;