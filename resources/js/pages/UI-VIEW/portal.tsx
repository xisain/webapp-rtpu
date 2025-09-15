import React, { useState, useCallback } from 'react';
import { User, ChevronLeft, ChevronRight, ExternalLink, ChevronDown } from 'lucide-react';
import { pu,login } from '@/routes';
// Types Definition
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

interface ProductGalleryProps {
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

interface HeroSectionProps {
  onViewInnovation?: () => void;
  onGoToLMS?: () => void;
}

// Header Component
const Header: React.FC = () => {
  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Kelas', href: '#', hasDropdown: true },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  const handleUserClick = (): void => {
    window.location.href = login().url;
    // Add user account logic here
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded mr-3"></div>
              <span className="font-bold text-xl text-gray-800">RTPU PNJ</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 flex justify-center space-x-8">
            {navigationItems.map((item: NavigationItem) => (
              <div key={item.label} className="relative group">
                {item.hasDropdown ? (
<button className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200 -mt-[5px]">                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* User Account Icon */}
          <div className="flex items-center">
            <button
              onClick={handleUserClick}
              className="bg-gray-100 hover:bg-teal-50 hover:text-teal-600 p-2 rounded-full transition-all duration-200 group"
              aria-label="User Account"
            >
              <User className="h-5 w-5 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection: React.FC<HeroSectionProps> = ({
  onViewInnovation,
  onGoToLMS
}) => {
  const handleViewInnovation = (): void => {
    if (onViewInnovation) {
      onViewInnovation();
    }
    console.log('View Innovation clicked');
  };

  const handleGoToLMS = (): void => {
    if (onGoToLMS) {
      onGoToLMS();
    }
    console.log('Go to LMS clicked');
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                Portal Resmi RTPU
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Selamat Datang Di<br />
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Portal RTPU PNJ
                </span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Discover innovative solutions and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleViewInnovation}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Lihat Inovasi
              </button>
              <button
                onClick={handleGoToLMS}
                className="border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Menuju LMS
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="RTPU PNJ Building"
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                POLITEKNIK NEGERI JAKARTA
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleCardClick = (): void => {
    if (onClick) {
      onClick(product);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex-none w-1/4 min-w-[280px] cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {product.category && (
            <div className="absolute top-3 left-3 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-200">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {product.description}
          </p>
            <a
              href={product.link}
              onClick={handleLinkClick}
              className="text-teal-500 hover:text-teal-600 inline-flex items-center text-sm font-medium group/link"
            >
              Lihat Selengkapnya
            <ExternalLink href='localhostL8000/detail-pu' className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" />
            </a>
        </div>
      </div>
    </div>
  );
};

// Product Gallery Component
const ProductGallery: React.FC<ProductGalleryProps> = ({
  products: propProducts,
  onProductClick
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const defaultProducts: Product[] = [
    {
      id: 1,
      title: "Produk Unggulan",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Innovation"
    },
    {
      id: 2,
      title: "Teknologi AI",
      description: "Inovasi terbaru dalam bidang artificial intelligence dan machine learning untuk masa depan yang lebih baik.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "AI/ML"
    },
    {
      id: 3,
      title: "IoT Solutions",
      description: "Solusi Internet of Things untuk industri 4.0 dan smart city development dengan teknologi terdepan.",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "IoT"
    },
    {
      id: 4,
      title: "Mobile Apps",
      description: "Pengembangan aplikasi mobile yang user-friendly dan innovative untuk berbagai kebutuhan bisnis.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Mobile"
    },
    {
      id: 5,
      title: "Web Development",
      description: "Layanan pengembangan website modern dengan teknologi terkini dan design yang responsive.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Web"
    },
    {
      id: 6,
      title: "Blockchain Tech",
      description: "Teknologi blockchain untuk keamanan data dan transparansi dalam berbagai aplikasi enterprise.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Blockchain"
    }
  ];

  const products: Product[] = propProducts || defaultProducts;
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = useCallback((): void => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  }, [maxIndex]);

  const prevSlide = useCallback((): void => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  }, [maxIndex]);

  const goToSlide = useCallback((index: number): void => {
    if (index >= 0 && index <= maxIndex) {
      setCurrentIndex(index);
    }
  }, [maxIndex]);

  const handleProductClick = useCallback((product: Product): void => {
    if (onProductClick) {
      onProductClick(product);
    }
    console.log('Product clicked:', product);
  }, [onProductClick]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 text-sm font-medium rounded-full mb-4">
            Produk Terbaru
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Produk Unggulan Terbaru
          </h2>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            Berikut adalah produk inovatif dari RTPU yang telah dikembangkan dengan teknologi terdepan
          </p>
          <a
            href={pu().url}
            className="text-teal-500 hover:text-teal-600 inline-flex items-center font-medium group"
          >
            Lihat Selengkapnya
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

        {/* Gallery Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-teal-50 shadow-xl rounded-full p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            disabled={currentIndex === 0}
            aria-label="Previous products"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-teal-50 shadow-xl rounded-full p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            disabled={currentIndex >= maxIndex}
            aria-label="Next products"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
          </button>

          {/* Product Cards Container */}
          <div className="overflow-hidden mx-16">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
              {products.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-10 space-x-3">
            {Array.from({ length: Math.max(1, maxIndex + 1) }).map((_, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-teal-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Research Gallery Component
const ResearchGallery: React.FC<ProductGalleryProps> = ({ onProductClick }) => {
  const researchProducts: Product[] = [
    {
      id: 7,
      title: "Smart Campus System",
      description: "Sistem manajemen kampus pintar dengan integrasi IoT untuk monitoring dan kontrol fasilitas kampus secara real-time.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Research"
    },
    {
      id: 8,
      title: "Renewable Energy Monitor",
      description: "Platform monitoring energi terbarukan untuk optimalisasi penggunaan solar panel dan sistem pembangkit listrik alternatif.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Green Tech"
    },
    {
      id: 9,
      title: "Digital Library System",
      description: "Sistem perpustakaan digital dengan AI recommendation dan advanced search untuk meningkatkan akses informasi akademik.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Education"
    },
    {
      id: 10,
      title: "Lab Equipment IoT",
      description: "Sistem monitoring peralatan laboratorium berbasis IoT untuk maintenance predictive dan safety monitoring.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Laboratory"
    },
    {
      id: 11,
      title: "Student Portal 2.0",
      description: "Portal mahasiswa generasi baru dengan fitur lengkap untuk academic planning, career guidance, dan social networking.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Student Life"
    },
    {
      id: 12,
      title: "AR/VR Learning Lab",
      description: "Platform pembelajaran immersive menggunakan teknologi Augmented Reality dan Virtual Reality untuk pengalaman belajar yang interaktif.",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "AR/VR"
    }
  ];

  return (
    <section className="-p-5 bg-white -mt-20">
        <div className="text-center mb-16">
        <ProductGallery products={researchProducts} onProductClick={onProductClick} />
      </div>
    </section>
  );
};

// Industry Partnership Gallery Component
const IndustryGallery: React.FC<ProductGalleryProps> = ({ onProductClick }) => {
  const industryProducts: Product[] = [
    {
      id: 13,
      title: "Industry 4.0 Simulator",
      description: "Simulator industri 4.0 untuk training dan penelitian teknologi manufacturing modern dengan integrasi cyber-physical systems.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Manufacturing"
    },
    {
      id: 14,
      title: "Supply Chain Analytics",
      description: "Platform analytics untuk optimasi supply chain dengan machine learning prediction dan real-time tracking system.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Logistics"
    },
    {
      id: 15,
      title: "Quality Assurance AI",
      description: "Sistem quality control berbasis computer vision dan AI untuk automated inspection dan defect detection.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "QA/QC"
    },
    {
      id: 16,
      title: "Smart Maintenance System",
      description: "Sistem maintenance prediktif dengan sensor monitoring dan AI analysis untuk mengurangi downtime peralatan industri.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Maintenance"
    },
    {
      id: 17,
      title: "Digital Twin Factory",
      description: "Implementasi digital twin technology untuk simulasi dan optimasi proses produksi manufacturing dalam lingkungan virtual.",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Digital Twin"
    },
    {
      id: 18,
      title: "Collaborative Robotics",
      description: "Platform pengembangan collaborative robots (cobots) untuk human-robot interaction dalam lingkungan kerja yang aman.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Robotics"
    }
  ];

  return (
    <section className="-p-5 bg-white -mt-20">
        <div>
        <ProductGallery products={industryProducts} onProductClick={onProductClick} />
      </div>
    </section>
  );
};

// Main App Component
const App: React.FC = () => {
  const handleViewInnovation = (): void => {
    console.log('View Innovation clicked');
    // Add navigation logic here
  };

  const handleGoToLMS = (): void => {
    console.log('Go to LMS clicked');
    // Add navigation logic here
  };

  const handleProductClick = (product: Product): void => {
    console.log('Product clicked:', product);
    // Add product detail navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection
        onViewInnovation={handleViewInnovation}
        onGoToLMS={handleGoToLMS}
      />
      <ProductGallery onProductClick={handleProductClick} />
      <ResearchGallery onProductClick={handleProductClick} />
      <IndustryGallery onProductClick={handleProductClick} />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg mr-4"></div>
              <span className="font-bold text-2xl">RTPU PNJ</span>
            </div>
            <p className="text-gray-400 text-lg mb-4">
              Research and Technology Transfer Unit - Politeknik Negeri Jakarta
            </p>
            <p className="text-gray-500">
              © 2024 Politeknik Negeri Jakarta. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
