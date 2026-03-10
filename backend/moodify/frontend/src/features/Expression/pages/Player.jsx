import React, { useRef, useState, useEffect, useContext } from "react";
import { ExpressionContext } from "../expression.context";
import Moodify from "../components/Moodify";
import { useExpression } from "../hooks/expression.hook";
import { useNavigate } from "react-router-dom";

const Player = () => {
    const navigate = useNavigate()
    const { song, mood, handlegetsong, handlegetusersong, usersong } = useExpression();
    const audioRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);

useEffect(() => {
  if (song.length === 0) {
    handlegetsong("defaulter");
  }
}, [song]);

    const safeSong = Array.isArray(song) ? song : [];
    const safeUserSong = Array.isArray(usersong) ? usersong : [];

    const allSongs = [...safeSong, ...safeUserSong];
    const generalCount = safeSong.length;
    const currentSong = allSongs[currentIndex];

    // Auto-play when switching songs
    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.load();
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    }, [currentIndex]);

    // Reset to first song when new songs are fetched (mood change)
    useEffect(() => {
        if (allSongs && allSongs.length > 0) {
            setCurrentIndex(0);
        }
    }, [song, usersong]);

    // Sync volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current || !currentSong) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };


    const playNext = () => {
        if (!allSongs || allSongs.length === 0) return;
        setCurrentIndex((prev) => (prev < allSongs.length - 1 ? prev + 1 : 0));
    };

    const playPrev = () => {
        if (!allSongs || allSongs.length === 0) return;
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allSongs.length - 1));
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleSeek = (e) => {
        const val = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = val;
            setCurrentTime(val);
        }
    };

    const formatTime = (t) => {
        if (isNaN(t)) return "0:00";
        const mins = Math.floor(t / 60);
        const secs = Math.floor(t % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const moodEmoji = {
        happy: "😄",
        sad: "😢",
        surprised: "😲",
        neutral: "😐",
    };

    return (
        <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col overflow-auto">
            {/* Hidden audio */}
            <audio
                ref={audioRef}
            autoPlay
            src={currentSong?.song_url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={playNext}
            />

            {/* Header */}
            <header className="flex items-center  justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
                <h1 className="text-2xl font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    🎵 Moodify
                </h1>

                <span
                    onClick={() => {
                        navigate("/upload")
                    }}
                    className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-cyan-300 backdrop-blur-md  cursor-pointer">
                    {/* {moodEmoji[mood] || "🎵"} {mood} */}
                    Upload your playlist
                </span>

            </header>

            {/* Main Content — 3 column grid */}
            <div className="flex-1 min-h-screen grid grid-cols-1 lg:grid-cols-12  gap-4 p-4 overflow-auto md:overflow-hidden md:min-h-0">

                {/* LEFT — Camera & Detect (always visible) */}
                <div className="lg:col-span-3  backdrop-blur-lg bg-white/5 rounded-2xl  md:h-fitcontent border border-white/10 p-4 flex flex-col md:overflow-hidden">
                    <Moodify />
                </div>

                {/* CENTER — Now Playing */}
                <div className="lg:col-span-5 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col items-center justify-center md:overflow-hidden relative">
                    {currentSong ? (
                        <>
                            {/* Album Art */}
                            <div className="relative group mb-4">
                                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.3)] border border-white/10">
                                    <img
                                        src={currentSong.image_url}
                                        alt={currentSong.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div
                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent pointer-events-none transition-opacity ${isPlaying ? "opacity-0" : "opacity-100"
                                        }`}
                                />
                            </div>

                            {/* Song Info */}
                            <div className="text-center mb-3">
                                <h2 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                                    {currentSong.title}
                                </h2>
                                <p className="text-gray-400 mt-1">{currentSong.artist}</p>
                                <p className="text-gray-500 text-sm">{currentSong.album}</p>
                            </div>

                            {/* Seek Bar */}
                            <div className="w-full max-w-md mb-3">
                                <input
                                    type="range"
                                    min={0}
                                    max={duration}
                                    step={0.1}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                                    style={{
                                        background: `linear-gradient(to right, #22d3ee ${(currentTime / duration) * 100 || 0
                                            }%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100 || 0
                                            }%)`,
                                    }}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-6 mb-3">
                                {/* Prev */}
                                <button
                                    onClick={playPrev}
                                    className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                    </svg>
                                </button>

                                {/* Play/Pause */}
                                <button
                                    onClick={togglePlay}
                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95"
                                >
                                    {isPlaying ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>

                                {/* Next */}
                                <button
                                    onClick={playNext}
                                    className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Volume */}
                            <div className="flex items-center gap-2 w-full max-w-[180px]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4 4V4.5l-4 4z" />
                                </svg>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-full h-1 rounded-full appearance-none cursor-pointer bg-white/10
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400"
                                    style={{
                                        background: `linear-gradient(to right, #a78bfa ${volume * 100
                                            }%, rgba(255,255,255,0.1) ${volume * 100}%)`,
                                    }}
                                    />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="text-6xl animate-pulse">🎵</div>
                            <p className="text-gray-300 text-lg">No songs yet</p>
                            <p className="text-gray-500 text-sm">
                                Click <strong>Detect Emotion</strong> to find songs for your mood
                            </p>
                        </div>
                    )}
                    <p className=" hidden md:block absolute left-[38%] text-[12px] bottom-1 text-white ">Made with ❤ By Fardeen   </p>
                </div>

                {/* RIGHT — Song Queue */}
                <div className="lg:col-span-4 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-3 md:overflow-hidden ">





                    <div className="px-5 py-3 border-b border-white/10  flex-shrink-0">
                        <h3 className="text-white font-semibold pointer-events-none">
                            Queue {allSongs.length > 0 ? `· ${allSongs.length} songs` : ""}
                        </h3>
                    </div>
                    <div className=" overflow-y-auto overflow-x-hidden divide-y md:pb-10 pb-40 divide-white/5">
                        {/* General Mood Playlist */}
                        {song && song.length > 0 ? (
                            <>
                                <div className="px-4 py-2 bg-white/5 sticky top-0 backdrop-blur-md z-10">
                                    <p className="text-xs font-semibold uppercase pointer-events-none tracking-wider text-cyan-400">🎧 Mood Playlist · {song.length}</p>
                                </div>
                                {song.map((s, i) => (
                                    <button
                                        key={s._id || `general-${i}`}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all hover:bg-white/5 text-left ${i === currentIndex
                                            ? "bg-white/10 border-l-4 border-cyan-400"
                                            : "border-l-4 border-transparent"
                                            }`}
                                    >
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                            <img
                                                src={s.image_url}
                                                alt={s.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {i === currentIndex && isPlaying && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <div className="flex items-end gap-[2px]">
                                                        <span className="w-[3px] h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
                                                        <span className="w-[3px] h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.15s" }} />
                                                        <span className="w-[3px] h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 md:min-w-[80%] min-w-0">
                                            <p className={`text-sm font-medium truncate ${i === currentIndex ? "text-cyan-300" : "text-white"}`}>
                                                {s.title }
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">{s.artist}</p>
                                        </div>
                                        <span className="text-[10px] text-gray-600 flex-shrink-0 hidden sm:block">
                                            {s.album }
                                        </span>
                                    </button>
                                ))}
                            </>
                        ) : (
                            <div className="flex items-center justify-center text-gray-500 text-sm p-6">
                                Detect your mood to load songs
                            </div>
                        )}

                        {/* User Personalised Playlist — only shown if usersong has data */}
                        {Array.isArray(usersong) && usersong.length > 0 && (
                            <>
                                <div className="px-4 py-2 bg-purple-500/10 sticky top-0 backdrop-blur-md z-10 border-t border-white/10">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">🎵 Your Playlist · {usersong.length}</p>
                                </div>
                                {usersong.map((s, i) => {
                                    const globalIndex = generalCount + i;
                                    return (
                                        <button
                                            key={s._id || `user-${i}`}
                                            onClick={() => setCurrentIndex(globalIndex)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 transition-all hover:bg-white/5 text-left ${globalIndex === currentIndex
                                                ? "bg-purple-500/10 border-l-4 border-purple-400"
                                                : "border-l-4 border-transparent"
                                                }`}
                                        >
                                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                                {s.image_url ? (
                                                    <img
                                                        src={s.image_url}
                                                        alt={s.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg">
                                                        🎵
                                                    </div>
                                                )}
                                                {globalIndex === currentIndex && isPlaying && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <div className="flex items-end gap-[2px]">
                                                            <span className="w-[3px] h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
                                                            <span className="w-[3px] h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.15s" }} />
                                                            <span className="w-[3px] h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 md:min-w-[80%] min-w-0">
                                                <p className={`text-sm font-medium truncate ${globalIndex === currentIndex ? "text-purple-300" : "text-white"}`}>
                                                    {s.title || s.name || "Untitled"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">{s.artist || "You"}</p>
                                            </div>
                                            <span className="text-[10px] text-gray-600 flex-shrink-0 hidden sm:block">
                                                {s.album || ""}
                                            </span>
                                        </button>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
