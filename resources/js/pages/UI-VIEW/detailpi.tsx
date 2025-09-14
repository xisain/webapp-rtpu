import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronDown } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onMute: () => void;
  onSeek: (time: number) => void;
  onFullscreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  onPlayPause,
  onMute,
  onSeek,
  onFullscreen
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={onPlayPause}
          className="text-white hover:text-blue-400 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={onMute}
          className="text-white hover:text-blue-400 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="flex-1 flex items-center space-x-2">
          <span className="text-white text-sm">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-white/20 rounded-full h-1 relative cursor-pointer">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-white text-sm">{formatTime(duration)}</span>
        </div>

        <button
          onClick={onFullscreen}
          className="text-white hover:text-blue-400 transition-colors"
        >
          <Maximize2 size={20} />
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayPause = (): void => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (): void => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (time: number): void => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleFullscreen = (): void => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  let controlsTimeout: NodeJS.Timeout;

  const handleMouseMove = (): void => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-xl text-gray-900">RTPU PNJ</span>
            </div>
            <nav className="flex items-center space-x-8">
              <span className="text-gray-700 font-medium cursor-pointer hover:text-blue-600 transition-colors">Home</span>
              <div className="flex items-center space-x-1 text-gray-700 font-medium cursor-pointer hover:text-blue-600 transition-colors">
                <span>Kelas</span>
                <ChevronDown size={16} />
              </div>
              <span className="text-gray-700 font-medium cursor-pointer hover:text-blue-600 transition-colors">About</span>
              <span className="text-gray-700 font-medium cursor-pointer hover:text-blue-600 transition-colors">Contact</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Produk Inovasi</h1>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <div 
              className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setShowControls(isPlaying ? false : true)}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop"
                onClick={togglePlayPause}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button
                    onClick={togglePlayPause}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-6 shadow-2xl transition-all duration-300 transform hover:scale-110"
                  >
                    <Play size={48} className="ml-1" />
                  </button>
                </div>
              )}

              {/* Video Controls */}
              {showControls && (
                <VideoControls
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  currentTime={currentTime}
                  duration={duration}
                  onPlayPause={togglePlayPause}
                  onMute={toggleMute}
                  onSeek={handleSeek}
                  onFullscreen={handleFullscreen}
                />
              )}

              {/* Loading State */}
              {duration === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading video...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Singkat</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                  unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <p>
                  It has survived not only five centuries, but also the leap into electronic 
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of 
                  Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                  publishing software like Aldus PageMaker including various of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Keunggulan Produk</h3>
              <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                <p>
                  Lorem Ipsum is simply dummy text of the 
                  printing and typesetting industry. Lorem 
                  Ipsum has been the industry's standard 
                  dummy text ever since the 1500s, when an 
                  unknown printer took a galley of type and 
                  scrambled it to make a type specimen 
                  book.
                </p>
                <p>
                  It has survived not only five 
                  centuries, but also the leap into electronic 
                  typesetting, remaining essentially 
                  unchanged. It was popularised in the 
                  1960s with the release of Letraset sheets 
                  containing Lorem Ipsum passages, and 
                  more recently with desktop publishing 
                  software like Aldus PageMaker including 
                  versions of Lorem Ipsum.
                </p>
              </div>

              {/* Additional Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Fitur Utama:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Teknologi terdepan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Ramah lingkungan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Efisien dan hemat biaya</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Mudah digunakan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;