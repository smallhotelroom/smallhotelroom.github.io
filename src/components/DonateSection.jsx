import React, { useState } from "react";
import { FaCompactDisc, FaGlobe, FaPalette, FaStar } from "react-icons/fa6";

const DonateSection = () => {
  // Initialize with an empty string so NO option is selected by default!
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <section id="donate" className="scroll-mt-24 p-6 rounded-lg bg-shr-gradient-container shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Donate</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Payment Column */}
        <div className="bg-white/80 p-6 md:p-8 rounded-xl border border-gray-300 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg mb-4 text-gray-800">Contribute through Paypal…</h4>
              <p className="text-gray-600 mb-6 text-sm">Select an objective for your contribution.</p>
              
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="space-y-6 mb-8">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="5U7PPJMB95Z5Q" />
                
                <div className="space-y-4">
                  
                  {/* Option 1: Summer 2011 CD */}
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="item_name" 
                        value="Summer 2011 CD" 
                        className="text-shr-green focus:ring-shr-green" 
                        checked={selectedItem === "Summer 2011 CD"}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        required // Optional: forces them to pick one before hitting PayPal
                      />
                      <span className="text-gray-800 font-medium flex items-center gap-2">
                        <FaCompactDisc className="text-gray-800 text-lg" />
                        Summer 2011 CD
                      </span>
                    </label>
                    {selectedItem === "Summer 2011 CD" && (
                      <div className="mt-2 ml-7 animate-fade-in-up">
                        <input type="hidden" name="on0" value="Shipping Address" />
                        <input 
                          type="text" 
                          name="os0" 
                          placeholder="Please enter your shipping address..." 
                          className="w-full text-sm p-2 border border-gray-300 rounded focus:border-shr-green focus:ring-1 focus:ring-shr-green outline-none transition-colors"
                          maxLength="200"
                        />
                      </div>
                    )}
                  </div>

                  {/* Option 2: Website */}
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="item_name" 
                        value="Website" 
                        className="text-shr-green focus:ring-shr-green" 
                        checked={selectedItem === "Website"}
                        onChange={(e) => setSelectedItem(e.target.value)}
                      />
                      <span className="text-gray-800 font-medium flex items-center gap-2">
                        <FaGlobe className="text-gray-800 text-lg" />
                        Website
                      </span>
                    </label>
                  </div>

                  {/* Option 3: Artwork */}
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="item_name" 
                        value="Artwork" 
                        className="text-shr-green focus:ring-shr-green" 
                        checked={selectedItem === "Artwork"}
                        onChange={(e) => setSelectedItem(e.target.value)}
                      />
                      <span className="text-gray-800 font-medium flex items-center gap-2">
                        <FaPalette className="text-gray-800 text-lg" />
                        Artwork
                      </span>
                    </label>
                  </div>

                  {/* Option 4: Other... */}
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="item_name" 
                        value="Other..." 
                        className="text-shr-green focus:ring-shr-green" 
                        checked={selectedItem === "Other..."}
                        onChange={(e) => setSelectedItem(e.target.value)}
                      />
                      <span className="text-gray-800 font-medium flex items-center gap-2">
                        <FaStar className="text-gray-800 text-lg" />
                        Other...
                      </span>
                    </label>
                    {selectedItem === "Other..." && (
                      <div className="mt-2 ml-7 animate-fade-in-up">
                        <input type="hidden" name="on0" value="Details" />
                        <input 
                          type="text" 
                          name="os0" 
                          placeholder="Please specify details/message..." 
                          className="w-full text-sm p-2 border border-gray-300 rounded focus:border-shr-green focus:ring-1 focus:ring-shr-green outline-none transition-colors"
                          maxLength="200"
                        />
                      </div>
                    )}
                  </div>

                </div>
                
                {/* Official PayPal Donate Button Image */}
                <div className="mt-4">
                  <input 
                    type="image" 
                    src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" 
                    border="0" 
                    name="submit" 
                    title="PayPal - The safer, easier way to pay online!" 
                    alt="Donate with PayPal button" 
                    className="hover:opacity-90 transition-opacity"
                  />
                  <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </div>
              </form>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-gray-800 border-t border-gray-200 pt-6">Contribute through Bitcoin…</h4>
              <p className="text-gray-600 mb-2 text-sm">You can also send <a href="https://www.bitcoin.org" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Bitcoin (BTC)</a> to the following address!!</p>
              <div className="bg-gray-100 p-3 rounded text-center break-all font-mono text-xs md:text-sm border border-gray-300 text-gray-700 font-bold select-all">
                1A4W27PVsZASfncxb154Uq6NR5Ek9woHKk
              </div>
              <p className="text-gray-600 mt-2 text-sm">Thank <b>YOU</b> for supporting the project!!</p>
            </div>
        </div>

        {/* Community Column */}
        <div className="bg-white/80 p-6 md:p-8 rounded-xl border border-gray-300 shadow-sm flex flex-col space-y-8">
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-800">Open call for Lyric Translations</h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Help SHR become more International! Current focus on Mountain:
            </p>
            <ul className="text-sm space-y-2">
                <li>
                    <strong>Have completed:</strong> <span className="text-shr-green">English</span> / <span className="text-shr-green">Español</span>
                </li>
                <li className="leading-6">
                    <strong>For review:</strong>{" "}
                    <a href="https://docs.google.com/document/d/1uREBJLf0xXGqyNzZfVyO9EPkJ-QZIZXaAQiuSZvQ-b0/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Català</a> /{" "}
                    <a href="https://docs.google.com/document/d/13xhP1Et4TKaKzJyd2S81dCkVVpTFmSO7M3E5biMVOtg/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Deutsch</a> /{" "}
                    <a href="https://docs.google.com/document/d/1nRfuouGw5eIGg_ekp1JfVBww8jb_HalGviO1pniU5uw/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">فارسی</a> /{" "}
                    <a href="https://docs.google.com/document/d/1f8A_0feGHbminuS5Da65SJj3uZWzMvpfmMzlHu-xst0/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Français</a> /{" "}
                    <a href="https://docs.google.com/document/d/1z15rDiTq_gfYZcRnbs1Gf6FO_lihnRxXjhqegLTcppo/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Galego</a> /{" "}
                    <a href="https://docs.google.com/document/d/1W1ebEq4tZ9IWk_Az1GJmYSkFJeUuiO7bXrEwmxrpghk/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Italiano</a> /{" "}
                    <a href="https://docs.google.com/document/d/1thW0Cy3Tp7m-M5Xc7wOCYpX02Z8_sSF6bJAptlGWKxQ/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">日本</a> /{" "}
                    <a href="https://docs.google.com/document/d/16dSS8V54El_vZw2VRYwUshXfpseBd_GsEWZq7WCZa5U/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Mexica</a> /{" "}
                    <a href="https://docs.google.com/document/d/1eYxRmpn1fZZEjDx6xCOX0-OH68Dx0BTziz3YgIOhgw8/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Norske</a> /{" "}
                    <a href="https://docs.google.com/document/d/1Qv1RCe9LpX5-0NseGpED131vCGgUrQtL8PDgyd07cVM/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Português</a> /{" "}
                    <a href="https://docs.google.com/document/d/1GfACGVi05p-CoLlfelT6RFAxSes6RfwWLc143r46NKY/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">Român</a> /{" "}
                    <a href="https://docs.google.com/document/d/17eRzga6brCwdapMtN2wfL8r6_Fiz2V-NIEQV-F0iiCE/edit" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">中文</a>
                </li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-800">Open call for Song Covers</h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Let's listen to YOU! At SHR, we <u>personally encourage</u> the creation of music, video, and whatever you can think of based on this work. 
              You can get audio, videos, lyrics, basic chords, and full Official Tablatures in the <a href="#music" className="text-shr-green hover:underline">music</a> section.
              We would love to see loads of home/studio and live covers as <a href="https://www.youtube.com/smallhotelroom" target="_blank" rel="noreferrer" className="text-shr-green hover:underline">video</a> responses too!!
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              If you need any more material, or think there is anything missing in our music/website, just drop us an <a href="mailto:admin@smallhotelroom.com" className="text-shr-green hover:underline">email</a>!!!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;