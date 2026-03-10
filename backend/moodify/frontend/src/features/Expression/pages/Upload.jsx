import { useState, useRef } from "react"
import { useExpression } from "../hooks/expression.hook"
import { Upload as UploadIcon, Music, Smile, Frown, Meh, Zap, X, Loader2 } from "lucide-react"

const MOODS = [
    { id: 'happy', label: 'Happy', icon: Smile, color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'bg-blue-500/20 text-blue-500 border-blue-500/50' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' },
    { id: 'surprised', label: 'Surprised', icon: Zap, color: 'bg-purple-500/20 text-purple-500 border-purple-500/50' },
]

const Upload = () => {
    const [file, setFile] = useState(null)
    const [mood, setMood] = useState("happy")
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef(null)

    const { handleuploadsong } = useExpression()

    const submiter = async (e) => {
        e.preventDefault()
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)
            await handleuploadsong(mood, formData)
            setFile(null)
            setMood("happy") // reset to default instead of "" to avoid empty selection
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0]
            if (droppedFile.type.startsWith('audio/')) {
                setFile(droppedFile)
            }
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const removeFile = (e) => {
        e.preventDefault()
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 text-white font-sans relative overflow-hidden ">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-xl bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10 transition-all duration-300 hover:shadow-purple-500/10 hover:border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        Upload Soundtrack
                    </h1>
                    <p className="text-gray-400 text-sm">Add a new song to your personalized mood playlist</p>
                </div>

                <form onSubmit={submiter} className="space-y-8">

                    {/* File Upload Zone */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300 block">Audio File</label>
                        <div
                            className={`relative group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${isDragging
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : file
                                        ? 'border-green-500/50 bg-green-500/5'
                                        : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 hover:border-gray-600'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !file && fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                name="song"
                                accept="audio/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {file ? (
                                <div className="flex flex-col items-center space-y-3 animate-in fade-in zoom-in duration-300 w-full h-full justify-center relative">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                        <Music className="w-8 h-8" />
                                    </div>
                                    <div className="text-center px-4 w-full">
                                        <p className="text-sm font-medium text-gray-200 truncate mx-auto max-w-[200px] sm:max-w-xs">{file.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                    <button
                                        onClick={removeFile}
                                        className="absolute top-2 right-2 p-2 bg-gray-800/80 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-full transition-colors backdrop-blur-md"
                                        title="Remove file"
                                        type="button"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-4 text-center p-6 w-full h-full justify-center">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isDragging ? 'bg-purple-500/20 text-purple-400 scale-110' : 'bg-gray-800 group-hover:bg-gray-700 text-gray-400'}`}>
                                        <UploadIcon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-300 font-medium"><span className="text-purple-400">Click to browse</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">MP3, WAV, AAC (Max 15MB)</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mood Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300 block">Select Mood</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {MOODS.map((m) => {
                                const Icon = m.icon
                                const isSelected = mood === m.id
                                return (
                                    <label
                                        key={m.id}
                                        className={`
                      relative flex flex-col items-center p-4 rounded-2xl cursor-pointer border transition-all duration-300
                      ${isSelected
                                                ? m.color + ' shadow-[0_0_20px_rgba(0,0,0,0.2)]'
                                                : 'border-gray-800 bg-gray-800/30 hover:bg-gray-800/80 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                                            }
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="mood"
                                            value={m.id}
                                            checked={isSelected}
                                            onChange={(e) => setMood(e.target.value)}
                                            className="hidden"
                                        />
                                        <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'scale-110' : ''}`} />
                                        <span className="text-xs font-semibold uppercase tracking-wider">{m.label}</span>
                                        {isSelected && (
                                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-current opacity-50 pointer-events-none" />
                                        )}
                                    </label>
                                )
                            })}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!file || isUploading}
                        className={`
              w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-2
              ${!file
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-800'
                                : isUploading
                                    ? 'bg-purple-600/50 text-white cursor-wait border border-purple-500/20'
                                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 hover:shadow-purple-500/25 hover:-translate-y-0.5 border border-purple-500/30'
                            }
            `}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            'Upload Track'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Upload