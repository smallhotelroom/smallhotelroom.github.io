/* v1.6.1 */
import React from "react";
import { Link } from "react-router-dom";
import { musicData } from "../utils/musicData";
import CookieSafeEmbed from "./CookieSafeEmbed";

const MusicSection = () => {
  
  const getBandcampUrl = (id, showTracklist) => {
    const tracklistParam = showTracklist ? "" : "tracklist=false/";
    return `https://bandcamp.com/EmbeddedPlayer/album=${id}/size=large/bgcol=333333/linkcol=2ebd35/${tracklistParam}artwork=small/transparent=true/`;
  };

  // Sort the data in descending order based on the 'order' property
  // Highest number (newest release) will render first!
  const sortedMusicData = [...musicData].sort((a, b) => b.order - a.order);

  return (
    <section id="music" className="scroll-mt-24 p-6 rounded-lg bg-shr-gradient-container shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Music</h2>
      
      <div className="space-y-12">
        {sortedMusicData.map((album) => {
          const trackCount = album.tracks ? album.tracks.length : 0;
          const showTracklist = trackCount > 1;
          const calculatedHeight = showTracklist ? Math.min(472, 120 + (trackCount * 36)) : 120;

          return (
            <div key={album.id}>
               <div className="mb-4">
                   <h3 className="text-2xl font-bold text-gray-800 flex items-center flex-wrap gap-3">
                      {album.badge && (
                          <span className={`text-white text-xs px-2 py-1 rounded uppercase tracking-wider ${album.badge === 'danger' ? 'bg-red-600' : 'bg-gray-800'}`}>
                              {album.type.split(" ")[0]}
                          </span>
                      )}
                      <span>{album.type.split(" ").slice(1).join(" ")}: {album.title}</span>
                   </h3>
               </div>

               <div className="flex flex-col md:flex-row gap-8 bg-white/80 p-6 rounded-xl border border-gray-300 shadow-sm">
                  
                  <div className="w-full md:w-3/5 lg:w-1/2">
                    <div 
                      className="relative w-full transition-all duration-300"
                      style={{ height: `${calculatedHeight}px` }}
                      data-nosnippet
                    >
                      {/* The facade now strictly pulls the image from the Markdown data! */}
                      <CookieSafeEmbed 
                        src={getBandcampUrl(album.bandcampId, showTracklist)}
                        title={`${album.title} by Small Hotel Room`}
                        providerName="Bandcamp"
                        coverArt={album.coverArt}
                        containerClass="h-full" 
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-2/5 lg:w-1/2 flex flex-col justify-center">
                    <p className="font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
                      Lyrics, translations, music scores...
                    </p>
                    <ul className="space-y-1 mb-6">
                      {album.tracks && album.tracks.map((track, index) => (
                        <li key={track.id} className="flex items-baseline group">
                          <span className="text-gray-500 w-6 text-sm font-mono">{index + 1}.</span>
                          <Link
                            to={`/songs/${track.id}`}
                            className="text-shr-green font-bold hover:text-shr-green-hover hover:underline transition-all text-left"
                          >
                            {track.title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* DYNAMIC EXTRA LINKS */}
                    {(album.downloadUrl || album.cdFiles || album.reviews) && (
                      <div className="space-y-4 text-sm">
                          {album.downloadUrl && (
                            <div>
                                <p className="font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">Download the full album!!</p>
                                <a href={album.downloadUrl} target="_blank" rel="noreferrer" className="text-shr-green hover:underline block">
                                    Full album (.zip with mp3s and booklets)
                                </a>
                            </div>
                          )}
                          {album.cdFiles && (
                            <div>
                                <p className="font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">Alternatively</p>
                                <Link to={`/extras/${album.id}-create-cd`} className="text-shr-green hover:underline font-bold block text-left">
                                    Create the Hi-Fi CD
                                </Link>
                            </div>
                          )}
                          {album.reviews && (
                            <div>
                                <p className="font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">Find out what people say!!</p>
                                <Link to={`/extras/${album.id}-reviews`} className="text-shr-green hover:underline font-bold block text-left">
                                    Reviews
                                </Link>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MusicSection;