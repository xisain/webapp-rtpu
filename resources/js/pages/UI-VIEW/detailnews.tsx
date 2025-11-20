import { usePage } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navbar from '@/components/navbar';


interface NavigationItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  hideOnScroll?: boolean;
  subItems?: { label: string; href: string }[];
  onClick?: () => void;
}

export default function NewsDetail() {
  const { props } = usePage();
  const { news } = props;

const Header: React.FC = () => {
  const handleUserClick = (): void => {
    const global = globalThis as { location: { href: string } };
    global.location.href = login().url;
  };

  const navigationItems: NavigationItem[] = [
    { label: "Home", href: "/" },
    { label: "Tentang Kami", href: "/about" },
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

  return <Navbar links={navigationItems} showLoginRight hideOnScroll />;
};

  return (
    <div className="w-full bg-white">

      <Header/>

      {/* === HERO IMAGE FULL WIDTH === */}
      <div className="relative w-7xl mx-auto h-[380px] md:h-[480px] lg:h-[550px] overflow-hidden mb-10 mt-5 rounded-3xl">

        {/* Image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src={news.image_links}
          alt={news.judul}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />

        {/* Title + Date */}
        <div className="absolute bottom-5 left-0 w-full px-6 md:px-12">
          <h1 className="text-3xl md:text-5xl font-bold text-dark leading-tight drop-shadow-lg">
            {news.judul}
          </h1>

          <p className="text-dark mt-3 text-sm md:text-base drop-shadow-md">
            {new Date(news.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* === CONTENT === */}
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-0 shadow-none bg-white">
          <CardContent>
            <div
              className="prose prose-xl max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Your Website — All rights reserved.
        </div>
      </div>
    </div>
  );
}
