import React, { useState, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { detailProdukUnggulan } from '@/routes';
import { usePage } from '@inertiajs/react';
interface Product {
  id: number;
  name: string;
  image: string;
}

interface DetailProdukUnggulan {
  id: number;
  name: string;
  description: string;
  link_video_demo: string;
  link_video_pemaparan: string;
  main_image: string;
  user: {
    id: number;
    name: string;
  };
  gallery: Array<{
    id: number;
    image: string;
  }>;
}

const FigmaStyleWebsite: React.FC = () => {
  const [isVideoPlaying1, setIsVideoPlaying1] = useState(false);
  const [isVideoPlaying2, setIsVideoPlaying2] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const { props } = usePage<{ produkUnggulan: DetailProdukUnggulan }>();
  const { produkUnggulan } = props;


  const toggleVideo1 = () => {
    if (videoRef1.current) {
      if (isVideoPlaying1) {
        videoRef1.current.pause();
      } else {
        videoRef1.current.play();
      }
      setIsVideoPlaying1(!isVideoPlaying1);
    }
  };

  const toggleVideo2 = () => {
    if (videoRef2.current) {
      if (isVideoPlaying2) {
        videoRef2.current.pause();
      } else {
        videoRef2.current.play();
      }
      setIsVideoPlaying2(!isVideoPlaying2);
    }
  };

  const galleryProducts: Product[] = [
    {
      id: 1,
      name: "Premium Coffee Maker",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Artisan Chocolate Set",
      image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Organic Tea Collection",
      image: "https://images.unsplash.com/photo-1556881286-fc3bd5fc2471?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Handcrafted Pottery",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68d61?w=300&h=300&fit=crop"
    }
  ];

  const nextGalleryItem = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryProducts.length);
  };

  const prevGalleryItem = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryProducts.length) % galleryProducts.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-xl font-semibold text-gray-800">RTPU</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#gallery" className="text-gray-600 hover:text-gray-900">Galeri</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <section className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {produkUnggulan.name}
          </h1>
        </section>

        {/* Video Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Demonstrasi */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Video Demonstrasi
              </h2>
              <div className="bg-gray-300 rounded-lg overflow-hidden aspect-video relative">
                <video
                  ref={videoRef1}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  onPlay={() => setIsVideoPlaying1(true)}
                  onPause={() => setIsVideoPlaying1(false)}
                >
                  <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                  Browser Anda tidak mendukung video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={toggleVideo1}
                    className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all"
                  >
                    {isVideoPlaying1 ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  Video 1
                </div>
              </div>
            </div>

            {/* Video Penjelasan */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Video Penjelasan
              </h2>
              <div className="bg-gray-300 rounded-lg overflow-hidden aspect-video relative">
                <video
                  ref={videoRef2}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
                  onPlay={() => setIsVideoPlaying2(true)}
                  onPause={() => setIsVideoPlaying2(false)}
                >
                  <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" type="video/mp4" />
                  Browser Anda tidak mendukung video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={toggleVideo2}
                    className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all"
                  >
                    {isVideoPlaying2 ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  Video 2
                </div>
              </div>
            </div>
          </div>
        </section>
          <div className="bg-gray-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Produk</h2>
            <p className="text-gray-700 leading-relaxed">
              {produkUnggulan.description}
            </p>
          </div>
        {/* Bottom Section - Poster and Gallery */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Large Poster/Main_image Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-lg p-8 h-200 w-135 flex items-center justify-center relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=600&h=400&fit=crop"
                alt="Featured Poster"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Poster</h3>
                <p className="text-sm opacity-90">Premium Collection 2024</p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-lg p-6 h-200">
              <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
                Gallery
              </h3>
              <div className="space-y-4">
                {/* Gallery Item 1 */}
                <div className="bg-white rounded-lg p-4 h-80 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={galleryProducts[currentGalleryIndex].image}
                    alt={galleryProducts[currentGalleryIndex].name} 
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs bg-black/60 px-2 py-1 rounded">
                    {galleryProducts[currentGalleryIndex].name}
                  </div>
                </div>

                {/* Gallery Item 2 */}
                <div className="bg-white rounded-lg p-4 h-80 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={galleryProducts[(currentGalleryIndex + 1) % galleryProducts.length].image}
                    alt={galleryProducts[(currentGalleryIndex + 1) % galleryProducts.length].name}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs bg-black/60 px-2 py-1 rounded">
                    {galleryProducts[(currentGalleryIndex + 1) % galleryProducts.length].name}
                  </div>
                </div>

                {/* Gallery Navigation */}
                <div className="flex justify-center space-x-20">
                  <button
                    onClick={prevGalleryItem}
                    className="bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={nextGalleryItem}
                    className="bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition-all"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Gallery Indicators */}
                <div className="flex justify-center space-x-2 mb-4">
                  {galleryProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGalleryIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentGalleryIndex ? 'bg-blue-600' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Extended Gallery Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Semua Produk Unggulan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                  <p className="text-gray-600 text-xs mt-1">Premium Quality</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
            <span className="text-lg font-semibold">BTKU PRO</span>
          </div>
          <p className="text-gray-400">© 2024 BTKU PRO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FigmaStyleWebsite;
