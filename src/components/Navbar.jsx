/* v1.4.0 */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaMusic, 
  FaVideo, 
  FaPalette, 
  FaHeart, 
  FaCreativeCommons,
  FaBars,
  FaXmark
} from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progressWidth, setProgressWidth] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // ADDED: The forward slash "/" ensures deep links always route back to home first!
  const navLinks = [
    { name: "Music", href: "/#music", Icon: FaMusic },
    { name: "Video", href: "/#video", Icon: FaVideo },
    { name: "Artwork", href: "/#artwork", Icon: FaPalette },
    { name: "Donate", href: "/#donate", Icon: FaHeart },
    { name: "Copyleft", href: "/#copyleft", Icon: FaCreativeCommons },
  ];

  // 1. Handle scrolling down to a section IF we are on the homepage
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      // Small timeout allows the DOM to render the homepage before attempting to scroll
      setTimeout(() => {
        const targetId = location.hash.substring(1);
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // 2. The active highlighting and scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Only highlight sections if we are actually on the homepage
      if (location.pathname !== '/') {
        setActiveIndex(-1);
        setProgressWidth(0);
        return;
      }

      const scrollPosition = window.scrollY;
      
      // Text Highlight Logic
      let current = -1; 
      const isBottom = window.innerHeight + Math.round(scrollPosition) >= document.body.offsetHeight - 50;

      if (isBottom) {
        current = navLinks.length - 1;
      } else {
        navLinks.forEach((link, index) => {
          // Extract just the word "music" from "/#music"
          const sectionId = link.href.substring(2); 
          const section = document.getElementById(sectionId);
          if (section && section.offsetTop - 250 <= scrollPosition) {
            current = index;
          }
        });
      }
      setActiveIndex(current);

      // Bar Width Logic
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const calcWidth = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;
      setProgressWidth(calcWidth);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu(); 

    // If we aren't on the homepage, route us there with the hash attached
    if (location.pathname !== '/') {
      navigate(href);
    } else {
      // If we are already on the homepage, just update the URL hash and smooth scroll
      const targetId = href.substring(2); // Remove the "/#"
      const elem = document.getElementById(targetId);
      if (elem) {
        // Update URL without reloading
        window.history.pushState(null, '', href); 
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu();
    
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.history.pushState(null, '', '/'); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 text-white shadow-md bg-gradient-to-t from-[#1e1e1e]/95 to-[#505050]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity" onClick={handleLogoClick}>
            <img src="/img/shr-120-120.png" alt="SHR Logo" className="w-7 h-7 md:w-8 md:h-8" />
          </a>

          <ul className="hidden md:flex space-x-6 text-base font-medium">
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-2 transition-colors ${activeIndex === index ? 'text-shr-green' : 'text-gray-300 hover:text-shr-green'}`}
                >
                  <link.Icon className="w-4 h-4" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-3 border-t border-gray-600/50 pt-3 pb-2 animate-fade-in-up">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center gap-3 transition-colors px-2 py-1 rounded hover:bg-white/10 ${activeIndex === index ? 'text-shr-green font-bold' : 'text-gray-300 hover:text-shr-green'}`}
                  >
                    <link.Icon className="w-5 h-5" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white">
        <div 
          className="h-full bg-black"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </nav>
  );
};

export default Navbar;