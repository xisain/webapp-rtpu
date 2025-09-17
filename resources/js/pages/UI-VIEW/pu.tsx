import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, ChevronDown, ArrowLeft} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';

interface Product {
  id: number;
  name: string;
  description: string;
  main_image: string;
}

const App: React.FC = () => {
  const { props } = usePage<{ produkUnggulan: Product[] }>();
  const produkUnggulan = props.produkUnggulan;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const productsPerPage = 9;
  const totalPages = Math.ceil(produkUnggulan.length / productsPerPage);

  const getCurrentProducts = (): Product[] => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return produkUnggulan.slice(startIndex, endIndex);
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Preview Image */}
      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`/storage/${product.main_image}`}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>

        {/* Lihat Button */}
        <Link
          href={`/detail-produk-unggulan/${product.id}`}
          className="bg-transparent border-2 border-blue-400 text-blue-600 px-8 py-2 rounded-full hover:bg-blue-50 transition-colors duration-200 font-medium"
        >
          Lihat
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Logo" className='w-10 h-10'/>
              <span className="font-bold text-xl text-gray-900">RTPU PNJ</span>
            </div>
            <nav className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-gray-600">
                <Home size={16} />
                <span>Home</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <span>Kelas</span>
                <ChevronDown size={16} />
              </div>
              <span className="text-gray-600">About</span>
              <span className="text-gray-600">Contact</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <a href= {home().url} className="text-gray-600 hover:text-gray-900"><ArrowLeft strokeWidth={2.25} /></a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Produk Unggulan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai hasil inovasi dari dosen, mahasiswa, dan mitra RTPU PNJ
            yang dikembangkan untuk menghadapi tantangan dunia nyata.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getCurrentProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          {/* Page Indicator */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  i === currentPage ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === totalPages - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Page Info */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Halaman {currentPage + 1} dari {totalPages} ({produkUnggulan.length} total produk)
        </div>
      </div>
    </div>
  );
};

export default App;
