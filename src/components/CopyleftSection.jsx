import React from "react";

const CopyleftSection = () => {
  return (
    <section id="copyleft" className="scroll-mt-24 p-6 rounded-lg bg-shr-gradient-container shadow-md">
      <div className="bg-white/90 p-6 md:p-8 rounded-xl border border-gray-300">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Copyleft</h2>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          Summer 2011 and all other material on this site (unless stated otherwise) is licensed under a <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" className="text-shr-green font-bold hover:underline" target="_blank" rel="noreferrer">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>. It's kind of like GPL: you can (and should!) <u>do whatever you want with this work</u>, just KEEP IT FREE!!! (that's what the ShareAlike thing means). See open calls <a href="#donate" className="text-shr-green hover:underline">above</a>!!
        </p>
        
        <h4 className="font-bold text-lg mb-2 text-gray-800">Additional credits</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>
                The <a href="https://web.archive.org/web/20220726222957/https://www.dafont.com/soulmission.font" target="_blank" className="text-shr-green hover:underline">SoulMission</a> font by <a href="https://web.archive.org/web/20220727031920/https://www.dafont.com/profile.php?user=108519" target="_blank" className="text-shr-green hover:underline">Martin J (RoCU)</a> is donationware. It is a main ingredient used within the Small Hotel Room logo (designed by SHR/smorante).
            </li>
            <li>
                The <a href="https://web.archive.org/web/20210112134651/www.java2s.com/Code/HTMLCSSDemo/discovery.htm" target="_blank" className="text-shr-green hover:underline">Discovery</a> website template by <a href="https://FreeCSSTemplates.org" target="_blank" className="text-shr-green hover:underline">Free CSS Templates</a> is licensed under CC BY 2.5. The first Small Hotel Room website design inhereted elements from this template, some of which persist until the present.
            </li>
            <li>
                The <a href="https://www.flickr.com/photos/18614695@N00/1419357079/" target="_blank" className="text-shr-green hover:underline">boccadasse, genova</a> image by <a href="https://www.flickr.com/photos/18614695@N00/" target="_blank" className="text-shr-green hover:underline">Xavi</a> is licensed under CC BY 2.0. Modified and used within the <a href="#music" className="text-shr-green hover:underline">Summer 2021</a> album booklet.
            </li>
        </ul>
      </div>
    </section>
  );
};

export default CopyleftSection;