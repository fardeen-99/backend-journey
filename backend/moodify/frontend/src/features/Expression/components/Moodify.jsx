import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useExpression } from "../hooks/expression.hook";

const Moodify = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [localMood, setLocalMood] = useState("Waiting...");
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const { handlegetsong, setMood } = useExpression();

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
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Mood logic
  const detectMood = (blendshapes) => {
    let smile = 0;
    let surprise = 0;
    let frown = 0;

    blendshapes.categories.forEach((shape) => {
      if (
        shape.categoryName === "mouthSmileLeft" ||
        shape.categoryName === "mouthSmileRight"
      ) {
        smile += shape.score;
      }
      if (shape.categoryName === "jawOpen") {
        surprise += shape.score;
      }
      if (
        shape.categoryName === "browDownLeft" ||
        shape.categoryName === "browDownRight"
      ) {
        frown += shape.score;
      }
    });

    if (smile > 0.7) return "happy";
    if (surprise > 0.6) return "surprised";
    if (frown > 0.4) return "sad";
    return "neutral";
  };

  // Detection
  const detect = async () => {
    if (!videoRef.current || !faceLandmarker) return;
    setIsDetecting(true);

    try {
      const results = faceLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (results.faceBlendshapes.length > 0) {
        const moodDetected = detectMood(results.faceBlendshapes[0]);
        setLocalMood(moodDetected);
        setMood(moodDetected);
        await handlegetsong(moodDetected);
      }
    } catch (err) {
      console.error("Detection error:", err);
    } finally {
      setIsDetecting(false);
    }
  };

  const moodEmoji = {
    happy: "😄",
    sad: "😢",
    surprised: "😲",
    neutral: "😐",
  };

  return (
    <div className="flex flex-col h-full min-h-200">
      {/* Title */}
      <div className="text-center mb-3">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Moodify AI
        </h2>
        <p className="text-gray-400 text-xs">Scan your face to detect mood</p>
      </div>

      {/* Camera */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden  shadow-lg border border-white/10 bg-black/50 mb-3">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transform -scale-x-100"
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transform -scale-x-100"
        />
        {/* Mood badge overlay */}
        <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-sm font-medium text-cyan-300">
          {moodEmoji[localMood] || "🎵"} {localMood}
        </div>
      </div>

      {/* Detect Button */}
      <button
        onClick={detect}
        disabled={isDetecting || !faceLandmarker}
        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500 flex items-center justify-center gap-2 text-sm"
      >
        {isDetecting ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Detecting...
          </>
        ) : !faceLandmarker ? (
          "Loading AI Model..."
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Detect Emotion
          </>
        )}
      </button>
    </div>
  );
};

export default Moodify;