import React, { useState, useCallback } from 'react';
import { User, ChevronLeft, ChevronRight, ExternalLink, ChevronDown } from 'lucide-react';
import { login, produk_unggulan, pi} from '@/routes';
import { usePage } from '@inertiajs/react';

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
  headerComponent?: React.ReactNode;
}

interface HeroSectionProps {
  onViewInnovation?: () => void;
  onGoToLMS?: () => void;
}

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  className?: string;
  variant?: 'default' | 'gradient';
}

// Section Header Components
const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  title,
  description,
  linkText,
  linkUrl,
  className = "",
  variant = 'default'
}) => {
  const getBadgeClasses = () => {
    if (variant === 'gradient') {
      if (badgeText.includes('Inovasi')) return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800';
      if (badgeText.includes('Pelatihan')) return 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800';
      return 'bg-gradient-to-r from-teal-100 to-blue-100 text-teal-800';
    }
    return 'bg-teal-100 text-teal-800';
  };

  const getTitleClasses = () => {
    if (variant === 'gradient') {
      if (badgeText.includes('Inovasi')) return 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent';
      if (badgeText.includes('Pelatihan')) return 'bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent';
      return 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent';
    }
    return 'text-gray-900';
  };

  const getLinkClasses = () => {
    if (variant === 'gradient') {
      if (badgeText.includes('Inovasi')) return 'text-purple-500 hover:text-purple-600';
      if (badgeText.includes('Pelatihan')) return 'text-orange-500 hover:text-orange-600';
    }
    return 'text-teal-500 hover:text-teal-600';
  };

  return (
    <div className={`text-center mb-16 ${className}`}>
      <div className={`inline-block px-4 py-2 text-sm font-medium rounded-full mb-4 ${variant === 'gradient' ? 'shadow-sm' : ''} ${getBadgeClasses()}`}>
        {badgeText}
      </div>
      <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${getTitleClasses()}`}>
        {title}
      </h2>
      <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      <a
        href={linkUrl}
        className={`${getLinkClasses()} inline-flex items-center font-medium group transition-all duration-300 hover:scale-105`}
      >
        {linkText}
        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
      </a>
    </div>
  );
};

// Section Headers
const ProdukUnggulanHeader: React.FC = () => {
  return (
    <SectionHeader
      badgeText="Produk Terbaru"
      title="Produk Unggulan Terbaru"
      description="Berikut adalah produk inovatif dari RTPU yang telah dikembangkan dengan teknologi terdepan"
      linkText="Lihat Selengkapnya"
      linkUrl={produk_unggulan().url}
      variant="gradient"
    />
  );
};

const ProdukInovasiHeader: React.FC = () => {
  return (
    <SectionHeader
      badgeText="Inovasi Terdepan"
      title="Produk Inovasi Terbaru"
      description="Temukan inovasi-inovasi terbaru hasil riset dan pengembangan dari tim RTPU PNJ"
      linkText="Jelajahi Inovasi"
      linkUrl={pi().url}
      variant="gradient"
    />
  );
};

const PelatihanHeader: React.FC = () => {
  return (
    <SectionHeader
      badgeText="Program Pelatihan"
      title="Pelatihan & Workshop"
      description="Tingkatkan kompetensi Anda melalui program pelatihan dan workshop yang dirancang oleh para ahli"
      linkText="Daftar Pelatihan"
      linkUrl="#"
      variant="gradient"
    />
  );
};

// Header Component
const Header: React.FC = () => {
  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '#' },
    { label: 'LMS', href: 'https://rtpu.vercel.app' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  const handleUserClick = (): void => {
    window.location.href = login().url;
  };

  return (
    <header className="bg-white shadow-sm h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src="/images/logo.png" alt="Logo" className='w-10 h-10'/>
              <span className="font-bold text-xl text-gray-800 ml-2">RTPU PNJ</span>
            </div>
          </div>

          <nav className="flex-1 flex justify-center space-x-8">
            {navigationItems.map((item: NavigationItem) => (
              <div key={item.label} className="relative group">
                {item.hasDropdown ? (
                  <button className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200 -mt-[5px]">
                    {item.label}
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
  const section = document.getElementById('inovasi');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
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
              <a
                href="https://rtpu.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Menuju LMS
              </a>
            </div>
          </div>

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
            Lihat Selengkapnyaa
            <ExternalLink className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Product Gallery Component
const ProductGallery: React.FC<ProductGalleryProps> = ({
  products: propProducts,
  onProductClick,
  headerComponent
}) => {
  const { props } = usePage<{ produkUnggulan: any[] }>();
  const produkUnggulan = props.produkUnggulan || [];

  const inertiaProducts: Product[] = produkUnggulan.map((pu) => ({
    id: pu.id,
    title: pu.name,
    description: pu.description,
    image: `/storage/${pu.main_image}`,
    link: `/detail-produk-unggulan/${pu.id}`,
    category: "Unggulan",
  }));

  const products: Product[] = propProducts || inertiaProducts;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {headerComponent}

        <div className="relative">
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

          <div className="overflow-hidden mx-16">
            <div
              className="flex transition-transform duration-500 ease-out gap-6 mb-10 mt-4"
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
  const { props } = usePage<PageProps>();
  const produkInovasi = props.produkInovasi || [];

  const inovasiProducts: Product[] = produkInovasi.map((pi) => ({
    id: pi.id,
    title: pi.name || pi.title,
    description: pi.description,
    image: `/storage/${pi.images}`,
    link: `/detail-produk-inovasi/${pi.id}`,
    category: "Inovasi",
  }));

  return (
    <section className="-p-5 bg-white -mt-20" id="inovasi">
      <div className="text-center mb-16">
        <ProductGallery
          products={inovasiProducts}
          onProductClick={onProductClick}
          headerComponent={<ProdukInovasiHeader/>}
        />
      </div>
    </section>
  );
};

// Training Gallery Component
const TrainingGallery: React.FC<ProductGalleryProps> = ({ onProductClick }) => {
  const trainingProducts: Product[] = [
    {
      id: 19,
      title: "Web Development Bootcamp",
      description: "Pelatihan intensif pengembangan web modern dengan React, Node.js, dan teknologi terkini selama 3 bulan.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Programming"
    },
    {
      id: 20,
      title: "Data Science Fundamentals",
      description: "Workshop analisis data dan machine learning menggunakan Python, pandas, dan scikit-learn untuk pemula.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Data Science"
    },
    {
      id: 21,
      title: "IoT Development Workshop",
      description: "Pelatihan pengembangan sistem IoT dengan Arduino, Raspberry Pi, dan cloud integration.",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "IoT"
    },
    {
      id: 22,
      title: "Digital Marketing Strategy",
      description: "Workshop strategi pemasaran digital, SEO, social media marketing, dan content creation.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Marketing"
    },
    {
      id: 23,
      title: "UI/UX Design Masterclass",
      description: "Pelatihan desain antarmuka dan pengalaman pengguna menggunakan Figma dan Adobe Creative Suite.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Design"
    },
    {
      id: 24,
      title: "Cybersecurity Essentials",
      description: "Workshop keamanan siber, ethical hacking, dan network security untuk melindungi infrastruktur digital.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#",
      category: "Security"
    }
  ];

  return (
    <section className="-p-5 bg-white -mt-20">
      <div className="text-center mb-16">
        <ProductGallery
          products={trainingProducts}
          onProductClick={onProductClick}
          headerComponent={<PelatihanHeader />}
        />
      </div>
    </section>
  );
};

// Main App Component
const App: React.FC = () => {
  const handleViewInnovation = (): void => {
    console.log('View Innovation clicked');
  };

  const handleGoToLMS = (): void => {
    console.log('Go to LMS clicked');
  };

  const handleProductClick = (product: Product): void => {
    console.log('Product clicked:', product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection
        onViewInnovation={handleViewInnovation}
        onGoToLMS={handleGoToLMS}
      />

      {/* Produk Unggulan Section */}
      <ProductGallery
        onProductClick={handleProductClick}
        headerComponent={<ProdukUnggulanHeader />}
      />

      {/* Produk Inovasi Section */}
      <ResearchGallery onProductClick={handleProductClick} />

      {/* Pelatihan Section */}
      <TrainingGallery onProductClick={handleProductClick} />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img src="/images/logo.png" alt="Logo" className='w-10 h-10'/>
              <span className="font-bold text-2xl ml-2">RTPU PNJ</span>
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
