import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { home, produk_inovasi} from '@/routes';
import Navbar from '@/components/navbar';

interface FiturUtama {
  id: number;
  nama_fitur: string;
}

interface ProdukInovasi {
  id: number;
  name: string;
  description: string;
  keunggulan_produk: string;
  images: string;
  pdf: string;  
  fitur_utama: FiturUtama[];
}

const App: React.FC = () => {
const { props } = usePage<{ produkInovasi: ProdukInovasi }>();
  const produk = props.produkInovasi;

  const handlepdf = (): void => {
  const section = document.getElementById('pdf');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

  const navLinks = [
    { label: "Home", href: home().url },
    { label: "PDF", onClick: handlepdf },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    <Navbar links={navLinks}/>
      {/* Judul */}
    <div className="max-w-7xl mx-auto px-4 py-12">
      <a href= {produk_inovasi().url} className="text-gray-600 hover:text-gray-900"><ArrowLeft strokeWidth={2.25} /></a>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{produk.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gambar + Deskripsi */}
        <div className="lg:col-span-2">
          {/* Gambar Produk */}
          <img
            src={`/storage/${produk.images}`}
            alt={produk.name}
            className="w-full rounded-xl shadow-lg"
          />

          {/* Deskripsi */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Deskripsi Produk</h2>
            <p className="text-gray-700 leading-relaxed">{produk.description}</p>
          </div>
          {/* PDF Download */}
          <div className="mt-6" id="pdf">
            <h2 className="text-2xl font-semibold mb-3">Hasil Penelitian PDF</h2>

            {/* Wrapper untuk responsif */}
            <div className="w-full h-[600px] sm:h-[800px] md:h-[900px] lg:h-[600px] overflow-hidden">
              <object
                data={`/produk-inovasi/pdf/${produk.pdf?.split('/').pop()}`}
                type="application/pdf"
                className="w-full h-full"
              >
                <p>
                  Browser tidak mendukung preview PDF. 
                  <a 
                    href={`/produk-inovasi/pdf/${produk.pdf?.split('/').pop()}`} 
                    target="_blank" 
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 mt-6
                              text-white font-medium rounded-lg shadow-md 
                              hover:bg-blue-700 focus:outline-none focus:ring-2 
                              focus:ring-blue-400 focus:ring-offset-1 transition"
                    style={{ backgroundColor: '#048996' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={3} 
                        stroke="currentColor" 
                        className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-6L12 15m0 0l4.5-4.5M12 15V3" />
                    </svg>
                    Download PDF Hasil Penelitian
                  </a>
                </p>
              </object>
            </div>
          </div>

        </div>

        {/* Sidebar Keunggulan + Fitur */}
        <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl text-gray-700 font-bold mb-4">Keunggulan Produk</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{produk.keunggulan_produk}</p>

          {produk.fitur_utama?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-300">
              <h4 className="text-gray-700 font-semibold mb-3">Fitur Utama:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {produk.fitur_utama.map((f) => (
                  <li key={f.id} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{f.nama_fitur}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>

  );
};

export default App;
