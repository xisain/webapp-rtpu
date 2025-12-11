import React, { useState, useCallback } from 'react';
import { User, ChevronLeft, ChevronRight, ExternalLink, ChevronDown, Menu, X } from 'lucide-react';
import { login, produk_inovasi, produk_unggulan} from '@/routes';
import { usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


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
  href?: string;
  hasDropdown?: boolean;
  subItems?: { label: string; href: string; onClick?: () => void }[];
  onClick?: () => void;
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
      return 'bg-gradient-to-r from-teal-500 to-blue-400 bg-clip-text text-transparent';
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
const ProdukUnggulanHeader: React.FC = () => (
  <SectionHeader
    badgeText="Produk Terbaru"
    title="Produk Unggulan Terbaru"
    description="Berikut adalah produk inovatif dari RTPU yang telah dikembangkan dengan teknologi terdepan"
    linkText="Lihat Selengkapnya"
    linkUrl={produk_unggulan().url}
    variant="gradient"
  />
);

const ProdukInovasiHeader: React.FC = () => (
  <SectionHeader
    badgeText="Inovasi Terdepan"
    title="Produk Inovasi Terbaru"
    description="Temukan inovasi-inovasi terbaru hasil riset dan pengembangan dari tim RTPU PNJ"
    linkText="Jelajahi Inovasi"
    linkUrl={produk_inovasi().url}
    variant="gradient"
  />
);

const PelatihanHeader: React.FC = () => (
  <SectionHeader
    badgeText="Program Pelatihan"
    title="Pelatihan & Workshop"
    description="Tingkatkan kompetensi Anda melalui program pelatihan dan workshop yang dirancang oleh para ahli"
    linkText="Daftar Pelatihan"
    linkUrl="#"
    variant="gradient"
  />
);

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};


// Header Component (Navbar)
const Header: React.FC = () => {
  const handleUserClick = (): void => {
    window.location.href = login().url;
    
  };

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#" },
  { label :"Tentang Kami",  href: "/about" },
  { label: "Berita", href: "/news" },
  {
    label: "Product",
    hasDropdown: true,
    subItems: [
      { label: "Produk Unggulan", href: "#unggulan", onClick: () => scrollToId("unggulan") },
      { label: "Produk Inovasi", href: "#inovasi", onClick: () => scrollToId("inovasi") },
      { label: "Pelatihan", href: "#training", onClick: () => scrollToId("training") },
    ],
  },
  { label: "Login", onClick: handleUserClick },
];


  return <Navbar links={navigationItems} showLoginRight />;
};

// Hero Section Component
const HeroSection: React.FC<HeroSectionProps> = ({ onViewInnovation, onGoToLMS }) => {
  const handleViewInnovation = (): void => {
    const section = document.getElementById('inovasi');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToLMS = (): void => {
    if (onGoToLMS) onGoToLMS();
    console.log('Go to LMS clicked');
  };

  return (
 <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-23">
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
          Rekayasa Teknologi dan Produk Unggulan (RTPU) Politeknik Negeri Jakarta
          berfokus pada penelitian terapan, pengembangan produk, dan transfer teknologi
          untuk mendukung industri serta peningkatan kompetensi mahasiswa dan staf.
          Kami bekerja sama dengan mitra industri untuk mengkomersialkan inovasi dan menyediakan
          pelatihan yang relevan dengan kebutuhan pasar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
           <a href="http://pnj.ac.id/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center">
            Learn More
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img
            src="images/poto peenjeh.jpg"
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
}

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
      <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-200 line-clamp-2 max-w-[60ch]">
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

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleProductClick = useCallback((product: Product) => {
    if (onProductClick) onProductClick(product);
  }, [onProductClick]);

  const scrollNext = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.firstElementChild?.clientWidth || 0;
      containerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // 24 = gap
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.firstElementChild?.clientWidth || 0;
      containerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white" id="unggulan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {headerComponent}

        <div className="relative">
          {/* Prev/Next Buttons - Hidden on mobile */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-teal-50 shadow-xl rounded-full p-4 transition-all duration-200 group hidden lg:block"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-teal-50 shadow-xl rounded-full p-4 transition-all duration-200 group hidden lg:block"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={containerRef}
            className="overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
          >
            <div className="flex gap-6 mb-10 mt-4 ml-12 sm:ml-16 lg:ml-0 pr-8 sm:pr-12 lg:pr-0">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className="flex-none w-[280px] sm:w-[320px] lg:w-[calc(25%-1.125rem)] snap-start"
                >
                  <ProductCard product={product} onClick={handleProductClick} />
                </div>
              ))}
            </div>
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
  const [trainingProducts, setTrainingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://rtpu.pnj.ac.id/lms/api/course');
        const result = await response.json();
        
        if (result.success && result.data) {
          const formattedProducts: Product[] = result.data.map((course: any) => ({
            id: course.id,
            title: course.nama_course,
            description: course.description,
            image: course.image_link,
            link: course.href,
            category: "Pelatihan"
          }));
          
          setTrainingProducts(formattedProducts);
        }
      } catch (err) {
        console.error('Error fetching training data:', err);
        setError('Gagal memuat data pelatihan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainingData();
  }, []);

  if (isLoading) {
    return (
      <section className="-p-5 bg-white -mt-20" id="training">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PelatihanHeader />
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">Memuat data pelatihan...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="-p-5 bg-white -mt-20" id="training">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PelatihanHeader />
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="-p-5 bg-white -mt-20" id="training">
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
// Main App Component
const App: React.FC = () => {
  const handleViewInnovation = (): void => console.log('View Innovation clicked');
  const handleGoToLMS = (): void => console.log('Go to LMS clicked');
  const handleProductClick = (product: Product): void => console.log('Product clicked:', product);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection onViewInnovation={handleViewInnovation} onGoToLMS={handleGoToLMS} />

      <ProductGallery onProductClick={handleProductClick} headerComponent={<ProdukUnggulanHeader />} />
      <ResearchGallery onProductClick={handleProductClick} />
      <TrainingGallery onProductClick={handleProductClick} />

      <Footer /> 
    </div>
  );
};


export default App;
