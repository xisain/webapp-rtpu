import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { home, produk_unggulan} from '@/routes';
import Navbar from '@/components/navbar';

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
    image_path: string;
  }>;
}

const FigmaStyleWebsite: React.FC = () => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const { props } = usePage<{ produkUnggulan: DetailProdukUnggulan }>();
  const { produkUnggulan } = props;

  // Function to extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const nextGalleryItem = () => {
    if (produkUnggulan.gallery.length > 0) {
      setCurrentGalleryIndex((prev) => (prev + 1) % produkUnggulan.gallery.length);
    }
  };

  const prevGalleryItem = () => {
    if (produkUnggulan.gallery.length > 0) {
      setCurrentGalleryIndex((prev) => (prev - 1 + produkUnggulan.gallery.length) % produkUnggulan.gallery.length);
    }
  };

  const handleViewGalery = (): void => {
  const section = document.getElementById('gallery');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

  const navLinks = [
    { label: "Home", href: home().url },
    { label: "Galeri", onClick: handleViewGalery },
    { label :"Tentang Kami",  href: "#about" },
    { label: "Berita", href: "#news" },
    { label: "Produk Inovasi", href: "#inovasi" },
    { label: "Produk Unggulan", href: "#training" },
    { label: "Pelatihan", href: "#training" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar links={navLinks} /> 

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <section className="mb-12">
          <a href= {produk_unggulan().url} className="text-gray-600 hover:text-gray-900"><ArrowLeft strokeWidth={2.25} /></a>
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-4">
            {produkUnggulan.name}
          </h1>
          <div className="text-sm text-gray-600">
            Oleh: {produkUnggulan.user.name}
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Demonstrasi */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Video Demonstrasi
              </h2>
              <div className="bg-gray-300 rounded-lg overflow-hidden aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(produkUnggulan.link_video_demo)}
                  title="Video Demonstrasi"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Video Penjelasan */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Video Penjelasan
              </h2>
              <div className="bg-gray-300 rounded-lg overflow-hidden aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(produkUnggulan.link_video_pemaparan)}
                  title="Video Penjelasan"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
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
            <div className="bg-gray-200 rounded-lg p-8 h-180 flex items-center justify-center relative overflow-hidden">
              <img
                src={`/storage/${produkUnggulan.main_image}`}
                alt="Featured Poster"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Poster</h3>
                <p className="text-sm opacity-90">{produkUnggulan.name}</p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-lg p-6 h-180">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Gallery
              </h3>
              {produkUnggulan.gallery.length > 0 ? (
                <div className="space-y-4 h-full">
                  {/* Current Gallery Item */}
                  <div className="bg-white rounded-lg p-4 h-68 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={`/storage/${produkUnggulan.gallery[currentGalleryIndex].image_path}`}
                      alt={`Gallery ${currentGalleryIndex + 2}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded"></div>
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/60 px-2 py-1 rounded">
                      {currentGalleryIndex + 1} / {produkUnggulan.gallery.length}
                    </div>
                  </div>
                  {currentGalleryIndex + 2 < produkUnggulan.gallery.length && (
                  <div className="bg-white rounded-lg p-4 h-68 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={`/storage/${produkUnggulan.gallery[currentGalleryIndex + 1].image_path}`}
                      alt={`Gallery ${currentGalleryIndex + 2}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded"></div>
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/60 px-2 py-1 rounded">
                      {currentGalleryIndex + 2} / {produkUnggulan.gallery.length}
                    </div>
                  </div>
                  )}
                  

                  {/* Gallery Navigation */}
                  {produkUnggulan.gallery.length > 1 && (
                    <>
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
                      <div className="flex justify-center space-x-2">
                        {produkUnggulan.gallery.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentGalleryIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentGalleryIndex ? 'bg-blue-600' : 'bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Tidak ada gambar galeri
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Extended Gallery Section */}
        {produkUnggulan.gallery.length > 0 && (
          <section className="mt-12" id="gallery">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Semua Gambar Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {produkUnggulan.gallery.map((galleryItem, index) => (
                <div
                  key={galleryItem.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCurrentGalleryIndex(index)}
                >
                  <img
                    src={`/storage/${galleryItem.image_path}`}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm">Gallery {index + 1}</h3>
                    <p className="text-gray-600 text-xs mt-1">{produkUnggulan.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/images/logo.png" alt="Logo" className='w-10 h-10'/>
            <span className="text-lg font-semibold">RTPU PNJ</span>
          </div>
          <p className="text-gray-400">© 2024 BTKU PRO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FigmaStyleWebsite;
