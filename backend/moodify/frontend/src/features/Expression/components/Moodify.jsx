import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const Moodify = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [mood, setMood] = useState("Detecting...");
  const [faceLandmarker, setFaceLandmarker] = useState(null);

  // Initialize mediapipe
  useEffect(() => {
    const createLandmarker = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      const landmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      setFaceLandmarker(landmarker);
    };

    createLandmarker();
  }, []);

  // Start webcam
  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };

    startCamera();
  }, []);

  // Mood logic
  const detectMood = (blendshapes) => {
    let smile = 0;
    let surprise = 0;
    let frown = 0;

    blendshapes.categories.forEach((shape) => {
      if (shape.categoryName === "mouthSmileLeft" || shape.categoryName === "mouthSmileRight") {
        smile += shape.score;
      }

      if (shape.categoryName === "jawOpen") {
        surprise += shape.score;
      }

      if (shape.categoryName === "browDownLeft" || shape.categoryName === "browDownRight") {
        frown += shape.score;
      }
    });


    if (smile > 0.7) return "😊 Happy";
    if (surprise > 0.6) return "😲 Surprise";
    if (frown > 0.4) return "😔 Sad";

    return "😐 Neutral";
  };

  // Detection loop
  const detect = async () => {
    if (!videoRef.current) return;

    const results = faceLandmarker.detectForVideo(
      videoRef.current,
      performance.now()
    );

    if (results.faceBlendshapes.length > 0) {
      const moodDetected = detectMood(results.faceBlendshapes[0]);
      setMood(moodDetected);
    }

  };
  // useEffect(()=>{

  //     console.log(mood)
  // },[mood])

  //   useEffect(() => {
  //     if (!faceLandmarker) return;
  //     detect();
  //   }, [faceLandmarker]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-8 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 flex flex-col items-center space-y-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Moodify AI
          </h1>
          <p className="text-gray-300">Scan your expression to detect your current mood.</p>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 bg-black/50 flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover transform -scale-x-100"
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transform -scale-x-100"
          />
        </div>

        <div className="flex flex-col items-center space-y-6 w-full mt-4">
          <div className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner w-full flex justify-center backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-indigo-300 tracking-wide uppercase text-sm font-semibold">Current Mood</span>
              <span className="text-cyan-300 drop-shadow-md text-3xl">{mood}</span>
            </h2>
          </div>

          <button
            onClick={() => detect()}
            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-3 text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Detect Emotion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Moodify;