import React from 'react';
import {  ChevronDown, ArrowLeft } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { produk_inovasi } from '@/routes';

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
<div className="max-w-7xl mx-auto px-4 py-12">
      {/* Judul */}
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
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Hasil Penelitian PDF</h2>
            <object
              data={`/produk-inovasi/pdf/${produk.pdf?.split('/').pop()}`}
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>Browser Anda tidak mendukung preview PDF. 
                <a href={`/produk-inovasi/pdf/${produk.pdf?.split('/').pop()}`} target="_blank">Download PDF</a>
              </p>
            </object>
          </div>


        </div>

        {/* Sidebar Keunggulan + Fitur */}
        <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4">Keunggulan Produk</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{produk.keunggulan_produk}</p>

          {produk.fitur_utama?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-300">
              <h4 className="font-semibold mb-3">Fitur Utama:</h4>
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
