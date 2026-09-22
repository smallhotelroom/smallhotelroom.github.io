/* v1.2.1 */
import React, { useState } from "react";
import CookieSafeEmbed from "./CookieSafeEmbed";

const videoIds = [
  "eHYG4pLRcsI", "M7JLpJNAW9w", "I4MQ_25clS0", "gOnieXfGQ1Q", "cxgyBXrmnUo"
];

const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState(videoIds[0]);

  // Dynamically generate the local cookie-free static thumbnail and privacy-enhanced embed URL
  const youtubeThumbnail = `/img/video-thumbs/${activeVideo}.jpg`;
  const youtubeUrl = `https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1`;

  return (
    <section id="video" className="scroll-mt-24 p-6 rounded-lg bg-shr-gradient-container shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Video</h2>
      
      <div className="bg-white/80 p-6 md:p-8 rounded-xl border border-gray-300 shadow-sm flex flex-col lg:flex-row gap-8">
        {/* Video Player & Controls */}
        <div className="w-full lg:w-2/3">
            
            {/* The new Cookie-Safe Facade Wrapper */}
            <div className="mb-6" data-nosnippet>
              <CookieSafeEmbed 
                src={youtubeUrl}
                title="Small Hotel Room Video"
                providerName="YouTube"
                coverArt={youtubeThumbnail}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center pb-4">
            {videoIds.map((id, idx) => (
                <button
                key={id}
                onClick={() => setActiveVideo(id)}
                className={`px-4 py-2 text-sm font-bold rounded shadow-sm transition-all ${
                    activeVideo === id 
                    ? "bg-shr-green text-white transform scale-105" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                >
                Video {idx + 1}
                </button>
            ))}
            </div>
        </div>

        {/* Gigs List */}
        <div className="w-full lg:w-1/3">
          <h4 className="font-semibold text-gray-800 text-lg mb-4 border-b border-gray-300 pb-2">Past Live Performances</h4>
          <ul className="space-y-4 text-sm">
            <li><strong className="block text-gray-800">3 August 2017</strong> <a href="https://www.youtube.com/watch?v=V0XFoGOSpsM&list=PLITqTV4jJ2sziTs7CDVACC7TFpK78nD_O" target="_blank" rel="noopener noreferrer" className="text-shr-green hover:underline">SHR @ GaloDoVento…</a></li>
            <li><strong className="block text-gray-800">19 July 2017</strong> <a href="https://www.youtube.com/watch?v=cxgyBXrmnUo&list=PLITqTV4jJ2sziTs7CDVACC7TFpK78nD_O" target="_blank" rel="noopener noreferrer" className="text-shr-green hover:underline">SHR @ AyudaTusSentidos…</a></li>
            <li><strong className="block text-gray-800">4 February 2016</strong> <a href="https://www.youtube.com/watch?v=_8Z8OI_rwTI&index=2&list=PLITqTV4jJ2sziTs7CDVACC7TFpK78nD_O" target="_blank" rel="noopener noreferrer" className="text-shr-green hover:underline">SHR @ Ayuda a Rosi a caminar…</a></li>
            <li><strong className="block text-gray-800">12 August 2011</strong> <a href="https://www.youtube.com/watch?v=3m7yQT4WgzU" target="_blank" rel="noopener noreferrer" className="text-shr-green hover:underline">SHR Contrib w/ Samuel Levi…</a></li>
            <li><strong className="block text-gray-800">11 August 2011</strong> <a href="#" className="text-shr-green hover:underline">SHR Contrib w/ Cesar Torres…</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;