// import React, { useEffect, useState } from 'react';
// import { useMicVAD, utils } from "@ricky0123/vad-react";

// function Lali() {
//   const [audioList, setAudioList] = useState([]); // State to hold list of audio URLs

//   useEffect(() => {
//     async function setupVAD() {
//       const myvad = await vad.MicVAD.new({
//         onSpeechStart: () => {
//           console.log("Speech start detected");
//         },
//         onSpeechEnd: (audio) => {
//           // Process the audio and add to state
//           const wavBuffer = utils.encodeWAV(audio);
//           const base64 = utils.arrayBufferToBase64(wavBuffer);
//           const audioUrl = `data:audio/wav;base64,${base64}`;
//           setAudioList(oldList => [...oldList, audioUrl]); // Append new audio URL to list
//         }
//       });
//       myvad.start();
//     }

//     setupVAD();
//   }, []);

//   return (
//     <div>
//       <h1>VAD Integration in Lali</h1>
//       <p>Below are the recorded audio segments:</p>
//       <ol id="playlist">
//         {audioList.map((audioURL, index) => (
//           <li key={index}>
//             <audio controls src={audioURL} />
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// }

// export default Lali;

// import React, { useEffect, useState, useRef } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import { useMicVAD, utils } from "@ricky0123/vad-react";

// function Lali() {
//   const [audioList, setAudioList] = useState([]); // State to hold list of audio URLs
//   const wavesurferRefs = useRef([]); // Ref to hold WaveSurfer instances

//   useEffect(() => {
//     async function setupVAD() {
//       const myvad = await vad.MicVAD.new({
//         onSpeechStart: () => {
//           console.log("Speech start detected");
//         },
//         onSpeechEnd: (audio) => {
//           // Process the audio and add to state
//           const wavBuffer = utils.encodeWAV(audio);
//           const base64 = utils.arrayBufferToBase64(wavBuffer);
//           const audioUrl = `data:audio/wav;base64,${base64}`;
//           setAudioList(oldList => [...oldList, audioUrl]); // Append new audio URL to list
//         }
//       });
//       myvad.start();
//     }

//     setupVAD();
//   }, []);

//   useEffect(() => {
//     // Initialize WaveSurfer instances for each audio element
//     audioList.forEach((_, index) => {
//       wavesurferRefs.current[index] = WaveSurfer.create({
//         container: `#waveform${index}`,
//         waveColor: 'violet',
//         progressColor: 'purple',
//       });
//     });

//     return () => {
//       // Clean up WaveSurfer instances on component unmount
//       wavesurferRefs.current.forEach(wavesurfer => wavesurfer && wavesurfer.destroy());
//     };
//   }, [audioList]);

//   return (
//     <div>
//       <h1>VAD Integration in Lali</h1>
//       <p>Below are the recorded audio segments:</p>
//       <ol id="playlist">
//         {audioList.map((audioURL, index) => (
//           <li key={index}>
//             <audio controls src={audioURL} />
//             <div id={`waveform${index}`} style={{ marginTop: '10px' }}></div>
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// }

// export default Lali;

import React, { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useMicVAD, utils } from "@ricky0123/vad-react";

function Lali() {
  const [audioList, setAudioList] = useState([]); // State to hold list of audio URLs
  const wavesurferRefs = useRef([]); // Ref to hold WaveSurfer instances
  const waveformColors = ['#ff0000', '#00ff00', '#0000ff']; // Define an array of waveform colors

  useEffect(() => {
    async function setupVAD() {
      const myvad = await vad.MicVAD.new({
        onSpeechStart: () => {
          console.log("Speech start detected");
        },
        onSpeechEnd: (audio) => {
          // Process the audio and add to state
          const wavBuffer = utils.encodeWAV(audio);
          const base64 = utils.arrayBufferToBase64(wavBuffer);
          const audioUrl = `data:audio/wav;base64,${base64}`;
          setAudioList(oldList => [...oldList, audioUrl]); // Append new audio URL to list
        }
      });
      myvad.start();
    }

    setupVAD();
  }, []);

  useEffect(() => {
    // Initialize WaveSurfer instances for each audio element
    audioList.forEach((_, index) => {
      wavesurferRefs.current[index] = WaveSurfer.create({
        container: `#waveform${index}`,
        waveColor: waveformColors[index % waveformColors.length], // Use different colors for each waveform
        progressColor: waveformColors[index % waveformColors.length], // Use different colors for each waveform
      });
    });

    // Load audio data into WaveSurfer and start rendering waveform
    audioList.forEach((audioURL, index) => {
      wavesurferRefs.current[index].load(audioURL);
      wavesurferRefs.current[index].setVolume(0); // Mute the audio playback
    });

    return () => {
      // Clean up WaveSurfer instances on component unmount
      wavesurferRefs.current.forEach(wavesurfer => wavesurfer && wavesurfer.destroy());
    };
  }, [audioList]);

  return (
    <div>
      <h1>VAD Integration in Lali</h1>
      <p>Below are the recorded audio segments:</p>
      <ol id="playlist">
        {audioList.map((audioURL, index) => (
          <li key={index}>
            <audio controls src={audioURL} />
            <div id={`waveform${index}`} style={{ marginTop: '10px' }}></div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Lali;


// import React, { useEffect, useState } from 'react';
// import { useMicVAD, utils } from "@ricky0123/vad-react";

// function Lali() {
//   const [audioList, setAudioList] = useState([]);
//   const [apiResponse, setApiResponse] = useState(''); // State to hold the latest API response

//   useEffect(() => {
//     async function setupVAD() {
//       const myvad = await vad.MicVAD.new({
//         onSpeechStart: () => {
//           console.log("Speech start detected");
//           setApiResponse('Speech start detected'); // Update response in UI
//         },
//         onSpeechEnd: (audio) => {
//           const wavBuffer = utils.encodeWAV(audio);
//           const base64 = utils.arrayBufferToBase64(wavBuffer);
//           uploadAudioAsJson(base64);
//         }
//       });
//       myvad.start();
//     }

//     setupVAD();
//   }, []);

//   const uploadAudioAsJson = async (base64Audio) => {
//     try {
//       const response = await fetch('http://localhost:8000/api/v1/upload/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ audioData: base64Audio })
//       });
//       const data = await response.json();
//       setAudioList(oldList => [...oldList, `http://localhost:8000/media/${data.id}`]);
//       setApiResponse(data.prediction); // Update response in UI with details from the server
//       console.log('Upload successful:', data);
//     } catch (error) {
//       console.error('Error uploading audio:', error);
//       setApiResponse('Error uploading audio: ' + error.message); // Update response in UI with error details
//     }
//   };

//   return (
//     <div>
//       <h1>VAD Integration in Lali</h1>
//       <p>Below are the URLs to the audio segments stored on the server:</p>
//       <div id="playlist">
//         {audioList.map((audioURL, index) => (
//           <div key={index} style={{ marginBottom: '20px' }}>
//             <audio controls src={audioURL} />
//           </div>
//         ))}
//       </div>
//       {/* <h2>API Response:</h2> */}
//       <p>{apiResponse}</p> {/* Display the latest API response */}
//     </div>
//   );
// }

// export default Lali;

