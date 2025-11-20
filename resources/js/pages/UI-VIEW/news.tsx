import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { login } from '@/routes';
import { Calendar } from 'lucide-react';

interface NavigationItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  subItems?: { label: string; href: string }[];
  onClick?: () => void;
}

interface NewsItem {
  id: number;
  judul: string;
  description: string;
  image_links: string | null;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  news: NewsItem[];
  [key: string]: unknown;
}

// Navbar Component
const Header: React.FC = () => {
  const handleUserClick = (): void => {
    const global = globalThis as { location: { href: string } };
    global.location.href = login().url;
  };

  const navigationItems: NavigationItem[] = [
    { label: "Home", href: "/" },
    { label :"Tentang Kami",  href: "/about" },
    { label: "Berita", href: "/news" },
    {
      label: "Product",
      hasDropdown: true,
      subItems: [
        { label: "Produk Unggulan", href: "/pu" },
        { label: "Produk Inovasi", href: "/pi" },
        { label: "Pelatihan", href: "#training" },
      ],
    },
    { label: "Login", onClick: handleUserClick },
  ];

  return <Navbar links={navigationItems} showLoginRight />;
};

// News Card Component
const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "").trim();
};


  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
    {/* Image (Clickable) */}
      {item.image_links && (
        <a href={`/news/detail-news/${item.id}`}>
          <div className="relative h-48 overflow-hidden bg-gray-200">
            <img
              src={item.image_links}
              alt={item.judul}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </a>
      )}

      <div className="p-6">

        {/* Title (Clickable) */}
        <a href={`/news/detail-news/${item.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
            {item.judul}
          </h3>
        </a>

        <p className="text-gray-600 text-sm mb-7 line-clamp-3">
          {stripHtml(item.description) || 'Tidak ada deskripsi'}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-500 text-sm border-t pt-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(item.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main News Listing Page
const NewsPage: React.FC = () => {
  const { props } = usePage<PageProps>();
  const news = props?.news || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cyan-50 to-bg-gray-200 py-19 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Berita & Artikel
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ikuti informasi terbaru dan perkembangan terkini dari RTPU PNJ
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Belum ada berita tersedia</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsPage;
