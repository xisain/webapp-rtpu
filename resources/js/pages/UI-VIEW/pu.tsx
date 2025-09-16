import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, ChevronDown } from 'lucide-react';
import { Link } from '@inertiajs/react';


interface Category {
  id: number;
  name: string;
  projectCount: number;
  previewImage: string;
}

const App: React.FC = () => {
  // Data kategori dengan gambar preview
  const categories: Category[] = [
    { id: 1, name: 'Kategori 1', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop' },
    { id: 2, name: 'Kategori 2', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop' },
    { id: 3, name: 'Kategori 3', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop' },
    { id: 4, name: 'Kategori 4', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop' },
    { id: 5, name: 'Kategori 5', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300&h=200&fit=crop' },
    { id: 6, name: 'Kategori 6', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop' },
    { id: 7, name: 'Kategori 7', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop' },
    { id: 8, name: 'Kategori 8', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop' },
    { id: 9, name: 'Kategori 9', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300&h=200&fit=crop' },
    { id: 10, name: 'Kategori 10', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=200&fit=crop' },
    { id: 11, name: 'Kategori 11', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop' },
    { id: 12, name: 'Kategori 12', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop' },
    { id: 13, name: 'Kategori 13', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop' },
    { id: 14, name: 'Kategori 14', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop' },
    { id: 15, name: 'Kategori 15', projectCount: 5, previewImage: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=300&h=200&fit=crop' },
  ];

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const categoriesPerPage = 9;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const getCurrentCategories = (): Category[] => {
    const startIndex = currentPage * categoriesPerPage;
    const endIndex = startIndex + categoriesPerPage;
    return categories.slice(startIndex, endIndex);
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

  const handleCategoryClick = (category: Category): void => {
    setSelectedCategory(category);
  };

  const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Preview Image */}
      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={category.previewImage} 
          alt={`Preview ${category.name}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      {/* Category Info */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Jumlah Project: {category.projectCount}
        </p>
        
        {/* Lihat Button */}
        <button
          onClick={() => window.location.href = `/detail-produk-unggulan/${category.id}`}
          className="bg-transparent border-2 border-blue-400 text-blue-600 px-8 py-2 rounded-full hover:bg-blue-50 transition-colors duration-200 font-medium"
        >
          Lihat
        </button>
      </div>
    </div>
  );

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-bold text-xl text-gray-900">RTPU PNJ</span>
              </div>
              <nav className="flex items-center space-x-6">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Home size={16} />
                  <span>Home</span>
                </button>
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

        {/* Category Detail Page */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedCategory.name}</h1>
            <p className="text-gray-600">Detail proyek dan inovasi dari {selectedCategory.name}</p>
          </div>

          {/* Category Detail Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <img 
              src={selectedCategory.previewImage} 
              alt={selectedCategory.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang {selectedCategory.name}</h2>
            <p className="text-gray-600 mb-6">
              Ini adalah halaman detail untuk {selectedCategory.name} yang menampilkan {selectedCategory.projectCount} proyek unggulan. 
              Setiap proyek telah dikembangkan dengan standar tinggi untuk menghasilkan inovasi dan solusi terdepan.
            </p>
            
            {/* Projects Grid */}
            <div className="flex flex-wrap justify-center gap-6">
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <div key={project} className="bg-gray-50 rounded-lg p-4 w-92 h-70 flex flex-col">
                  <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                  <h3 className="font-semibold text-gray-900">Proyek {project}</h3>
                  <p className="text-sm text-gray-600">Deskripsi singkat proyek {project}</p>
                  <button
                    onClick={() => window.location.href = `/detail-produk-unggulan/${project}`} 
                    className="bg-transparent border-2 border-blue-400 text-blue-600 px-8 py-2 rounded-full hover:bg-blue-50 transition-colors duration-200 font-medium mt-4 self-end"
                  >
                    Lihat
                  </button>                  
                </div>
              ))}
            </div>
  

            {/* Back Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Kembali ke Daftar Kategori
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Produk Unggulan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai hasil inovasi dan dosen, mahasiswa, dan mitra RTPU PNJ yang
            dikembangkan untuk menghadapi tantangan dunia nyata.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getCurrentCategories().map((category) => (
            <CategoryCard key={category.id} category={category} />
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
          Halaman {currentPage + 1} dari {totalPages} 
          ({categories.length} total kategori)
        </div>
      </div>
    </div>
  );
};

export default App;