/* v1.8.0 */
import React, { useState, useEffect } from "react";
import { FaSpotify, FaShareAlt, FaYoutube } from "react-icons/fa";
import CreateCdTemplate from "./extras/CreateCdTemplate"; // <-- NEW
import ReviewsTemplate from "./extras/ReviewsTemplate";   // <-- NEW

const ContentModal = ({ song, isExtra, initialLang, onClose }) => {
  const [activeLangIndex, setActiveLangIndex] = useState(0);

  useEffect(() => {
    if (song && song.lyricsList && initialLang) {
      const idx = song.lyricsList.findIndex(
        l => l.lang.toLowerCase() === initialLang.toLowerCase()
      );
      setActiveLangIndex(idx !== -1 ? idx : 0);
    } else {
      setActiveLangIndex(0);
    }
  }, [song, initialLang]);

  if (!song) return null;

  const handleShare = async () => {
    const baseUrl = window.location.origin;
    const lang = song.lyricsList ? song.lyricsList[activeLangIndex].lang : null;
    
    const shareUrl = `${baseUrl}/${isExtra ? 'extras' : 'songs'}/${song.id}${lang ? `?lang=${lang}` : ''}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${song.title} - Small Hotel Room`,
          text: `Check out the lyrics and music for ${song.title}`,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const displayClearance = song.clearance || "One-Stop (100% Master and Publishing, 100% Human-Created)";
  const displayInstrumental = song.instrumental !== undefined 
    ? (song.instrumental ? "Yes" : "No") 
    : "Available upon request";

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h3 className="text-xl font-bold text-gray-800">{song.title}</h3>
          <div className="flex items-center gap-5">
            
            <button 
              onClick={handleShare}
              className="text-shr-green text-xl transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:drop-shadow-md"
              title="Share this song"
              aria-label="Share"
            >
              <FaShareAlt />
            </button>

            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-red-600 text-3xl font-light leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto text-gray-800">
          
          {/* THE NEW DYNAMIC ROUTER: Tells the modal what UI to render based on Markdown */}
          {song.extraType === 'create-cd' ? (
              <CreateCdTemplate album={song.albumData} />
          ) : song.extraType === 'reviews' ? (
              <ReviewsTemplate album={song.albumData} />
          ) : (
            <div className="space-y-6">
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded border border-gray-200">
                
                {(song.spotify || song.youtube) && (
                  <li>
                    <div className="flex items-center flex-wrap gap-2">
                      Streaming:{' '}
                      {song.spotify && (
                        <a 
                          href={`https://open.spotify.com/track/${song.spotify}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[#1DB954] hover:text-[#1ed760] transition-colors text-xl flex items-center"
                          title="Listen on Spotify"
                        >
                          <FaSpotify />
                        </a>
                      )}
                      
                      {song.spotify && song.youtube && <span className="text-gray-400 font-bold mx-1">/</span>}
                      
                      {song.youtube && (
                        <a 
                          href={`https://www.youtube.com/watch?v=${song.youtube}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[#FF0000] hover:text-[#ff4d4d] transition-colors text-xl flex items-center"
                          title="Watch on YouTube"
                        >
                          <FaYoutube />
                        </a>
                      )}
                    </div>
                  </li>
                )}

                {song.downloads && (
                  <li>
                    Download:{' '}
                    {song.downloads.map((d, i) => (
                      <React.Fragment key={i}>
                        <a href={d.url} target="_blank" rel="noreferrer" className="text-shr-green font-bold hover:underline">{d.label}</a>
                        {i < song.downloads.length - 1 && ' / '}
                      </React.Fragment>
                    ))}
                  </li>
                )}
                {song.chords && (
                  <li>
                    Chords:{' '}
                    {song.chords.map((c, i) => (
                      <React.Fragment key={i}>
                        <a href={c.url} target="_blank" rel="noreferrer" className="text-shr-green font-bold hover:underline">{c.label}</a>
                        {i < song.chords.length - 1 && ' / '}
                      </React.Fragment>
                    ))}
                  </li>
                )}
                {song.scores && (
                  <li>
                    Music score (tab):{' '}
                    {song.scores.map((s, i) => (
                      <React.Fragment key={i}>
                        <a href={s.url} target="_blank" rel="noreferrer" className="text-shr-green font-bold hover:underline">{s.label}</a>
                        {i < song.scores.length - 1 && ' / '}
                      </React.Fragment>
                    ))}
                  </li>
                )}
              </ul>

              {song.lyricsList && song.lyricsList.length > 0 && (
                <div>
                  <div className={`flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3 mb-4 space-y-2 ${song.translationthanks ? 'mb-2' : 'mb-4'}`}>
                    <div className="flex flex-wrap items-center gap-2 w-full">
                      <span className="font-semibold text-gray-600 mr-2">Lyrics:</span>
                      {song.lyricsList.map((lyricItem, idx) => (
                        <React.Fragment key={idx}>
                          <button
                            onClick={() => setActiveLangIndex(idx)}
                            className={`text-sm md:text-base transition-colors ${
                              activeLangIndex === idx 
                                ? 'text-shr-green font-bold underline decoration-2 underline-offset-4' 
                                : 'text-gray-500 hover:text-shr-green'
                            }`}
                          >
                            {lyricItem.lang}
                          </button>
                          {idx < song.lyricsList.length - 1 && <span className="text-gray-300">/</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    {song.translationthanks && (
                      <div className="text-sm text-gray-600 italic w-full">
                        {song.translationthanks}
                      </div>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-gray-800">
                    {song.lyricsList[activeLangIndex].content}
                  </div>
                </div>
              )}

              <div className="!mt-5">
                <hr className="border-t border-dashed border-gray-400" />
                <div className="pt-5 font-mono text-xs md:text-sm text-gray-800 leading-relaxed overflow-x-auto">
                  {[
                    { label: "TITLE", value: song.title },
                    { 
                      label: "ARTIST", 
                      value: song.featuring 
                        ? `${song.artist || 'Small Hotel Room'} ft. ${song.featuring}` 
                        : song.artist 
                    },
                    { label: "ALBUM", value: song.album },
                    { label: "TRACK", value: song.track ? String(song.track).padStart(2, '0') : null },
                    { label: "AUTHOR", value: song.author },
                    { label: "BPM", value: song.bpm },
                    { label: "MUSICIANS", value: song.musicians },
                    { label: "INSTRUMENTAL", value: displayInstrumental },
                    { label: "CLEARANCE", value: displayClearance },
                    { label: "ISRC", value: song.isrc },
                    { label: "LICENSE", value: song.license },
                    { label: "URL", value: song.url },
                  ].map((item, idx) => 
                    item.value ? (
                      <div key={idx} className="whitespace-pre-wrap">
                        {item.label} = {item.value}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;