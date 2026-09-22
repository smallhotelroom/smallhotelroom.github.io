import React from 'react';

const CreateCdTemplate = ({ album }) => {
  const { cdFiles } = album;
  if (!cdFiles) return null;

  return (
    <div className="space-y-4">
      <p className="text-gray-800">Hi! Burning an audio CD is not an easy task. But we'll guide you through it in just 9 simple steps!</p>
      <p className="text-gray-800">Here's what you'll need:</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-700 bg-gray-50 p-4 rounded border border-gray-200">
          <li>A CD recorder on your PC or laptop</li>
          <li>An empty recordable CD</li>
          {cdFiles.booklet && <li>[optional] A printer, and directly print out: <a href={cdFiles.booklet} className="text-shr-green font-bold hover:underline">Booklet (.pdf)</a> {cdFiles.translation && <> / Translation: <a href={cdFiles.translation} className="text-shr-green font-bold hover:underline">Libreto (Español, .pdf)</a></>}</li>}
      </ul>
      <p className="text-gray-800">We're going to use InfraRecorder for this tutorial, which is free. You can skip the first 3 steps if you already have it.</p>

      <div className="space-y-8 mt-6">
        {[
          { step: "1", text: <span>Visit <a href="https://www.infrarecorder.org" target="_blank" rel="noreferrer" className="text-shr-green font-bold hover:underline">www.infrarecorder.org</a> and click on Downloads.</span>, img: "/img/smallhotelroom-burncd1.png", caption: "Fig. 1 - Downloads at InfraRecorder (Circled in Red)" },
          { step: "2", text: <span>Download the latest version for your Operating System.</span>, img: "/img/smallhotelroom-burncd2.png", caption: "Fig. 2 - InfraRecorder Windows download (Circled in Red)" },
          { step: "3", text: "Save the file, and double-click on it for installation. Follow the instructions, clicking on YES to all the queries.", img: "/img/smallhotelroom-burncd3.png", caption: "Fig. 3 - InfraRecorder countdown to download" },
          { step: "4", text: <span>Now we're going to download the full album (yay!). Download <a href={cdFiles.cue} target="_blank" rel="noreferrer" className="text-shr-green font-bold hover:underline">this file (.cue)</a> and <a href={cdFiles.bin} target="_blank" rel="noreferrer" className="text-shr-green font-bold hover:underline">this file (.bin)</a> (it's massive, be patient!).<br/><br/><u>IMPORTANT</u>: Save them in <u>the same</u> folder!!</span>, img: "/img/smallhotelroom-burncd4.png", caption: "Fig. 4 - Files kept in same folder (do not modify names!)" },
          { step: "5", text: "By now you should have Infrarecorder installed. Run it!!", img: "/img/smallhotelroom-burncd5.png", caption: "Fig. 5 - InfraRecorder's somewhere there ...somewhere!!" },
          { step: "6", text: "Click on Write Image (bottom left in latest version) from the options. Insert a virgin CD into your CD recorder.", img: "/img/smallhotelroom-burncd6.png", caption: "Fig. 6 - InfraRecorder's default startup screen" },
          { step: "7", text: "Do you remember the files you saved before? Browse and click on the .cue file and then click on Open.", img: "/img/smallhotelroom-burncd7.png", caption: "Fig. 7 - .cue selected. Accept!!" },
          { step: "8", text: "We use the default parameters. Accept without fear!", img: "/img/smallhotelroom-burncd8.png", caption: "Fig. 8 - Let the burning begin!! May take a while..." },
          { step: "9", text: "In progress... In progress... Done! Extract the CD from the tray once indicated and try it on any standard CD player!", img: "/img/smallhotelroom-burncd9.png", caption: "Fig. 9 - Enjoy! Listen and distribute freely!!!" },
        ].map((item, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="mb-3 text-gray-800"><strong className="text-black">Step {item.step})</strong> {item.text}</p>
            <figure className="bg-white p-2 border border-gray-300 shadow-sm text-center inline-block">
               <a href={item.img} target="_blank" rel="noreferrer">
                  <img src={item.img} className="max-w-full h-auto" alt={`Step ${item.step}`} />
               </a>
               <figcaption className="text-xs text-gray-500 mt-2">{item.caption}</figcaption>
            </figure>
          </div>
        ))}
      </div>
      <p className="font-bold text-center mt-6 text-xl text-gray-800">That's all folks... && KUDOS from SHR!!</p>
    </div>
  );
};

export default CreateCdTemplate;