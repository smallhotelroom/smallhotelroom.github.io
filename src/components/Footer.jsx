import React from "react";
import { 
  FaSpotify, 
  FaItunesNote, 
  FaSoundcloud, 
  FaBandcamp, 
  FaYoutube, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaXTwitter 
} from "react-icons/fa6";

const SocialLink = ({ href, color, label, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    aria-label={label}
    className={`w-10 h-10 flex items-center justify-center rounded shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-white ${color}`}
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-40 w-full bg-shr-gradient-footer py-3 border-t border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto px-4 flex justify-center">
        <div className="flex flex-wrap justify-center gap-3">
          
          <SocialLink href="https://play.spotify.com/artist/2wDanfKS8YgjIrUVe3gExL?play=true&utm_source=open.spotify.com&utm_medium=open" color="bg-[#1db954]" label="Spotify">
            <FaSpotify className="w-5 h-5" />
          </SocialLink>
          
          <SocialLink href="https://music.apple.com/artist/small-hotel-room/955629163" color="bg-[#fa243c]" label="iTunes">
            <FaItunesNote className="w-5 h-5" />
          </SocialLink>

          <SocialLink href="https://soundcloud.com/small-hotel-room" color="bg-[#ff5500]" label="SoundCloud">
             <FaSoundcloud className="w-6 h-6" />
          </SocialLink>

          <SocialLink href="https://smallhotelroom.bandcamp.com" color="bg-[#629aa9]" label="Bandcamp">
             <FaBandcamp className="w-5 h-5" />
          </SocialLink>

          <SocialLink href="https://www.youtube.es/@smallhotelroom" color="bg-[#ff0000]" label="YouTube">
             <FaYoutube className="w-5 h-5" />
          </SocialLink>

          <SocialLink href="https://www.instagram.com/smallhotelroom" color="bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]" label="Instagram">
             <FaInstagram className="w-5 h-5" />
          </SocialLink>

          {/* TikTok - Black background, white icon, same glitch effect */}
          <SocialLink href="https://www.tiktok.com/@smallhotelroom" color="bg-black" label="TikTok">
             <FaTiktok 
               className="w-5 h-5 text-white" 
               style={{ filter: "drop-shadow(-1px -1px 0 #25F4EE) drop-shadow(1px 1px 0 #FE2C55)" }}
             />
          </SocialLink>
          
           <SocialLink href="https://x.com/smallhotelroom" color="bg-[#000000]" label="X">
             <FaXTwitter className="w-5 h-5" />
          </SocialLink>
          
          <SocialLink href="https://www.facebook.com/SmallHotelRoom" color="bg-[#1877f2]" label="Facebook">
              <FaFacebookF className="w-5 h-5" />
          </SocialLink>

        </div>
      </div>
    </footer>
  );
};

export default Footer;