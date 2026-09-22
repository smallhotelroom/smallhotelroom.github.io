import React from "react";

const ArtworkSection = () => {
  return (
    <section id="artwork" className="scroll-mt-24 p-6 rounded-lg bg-shr-gradient-container shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Artwork</h2>
      
      <div className="bg-white/80 p-6 md:p-8 rounded-xl border border-gray-300 shadow-sm">
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          Here you can find some beautiful artwork contributed by SHR/smorante [thanks, Santi]!!
          ...maybe YOU have something in mind? Cool! Just drop us an <a href="mailto:admin@smallhotelroom.com" className="text-shr-green font-bold hover:underline">email</a>!!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((num) => (
             <figure key={num} className="bg-white p-3 border border-gray-300 shadow-sm text-center">
               <a href={`/img/smallhotelroom-wallpaper${num}.png`} target="_blank" rel="noreferrer">
                  <img src={`/img/smallhotelroom-wallpaper${num}-mini.png`} className="w-full h-auto mb-2" alt={`Small Hotel Room Wallpaper ${num}`} />
               </a>
               <figcaption className="text-xs text-gray-600">
                 <span className="font-normal block">Small Hotel Room Wallpaper {num}</span>
                 CC-BY-3.0 Santiago Morante
               </figcaption>
             </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtworkSection;