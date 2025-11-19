import React, { useState } from 'react';
import { MapPin, Mail, Users, Building2, Menu, ChevronDown } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';



interface NavigationItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  subItems?: { label: string; href: string }[];
  onClick?: () => void;
}

const AboutUsPage = () => {
  const [activeLocation, setActiveLocation] = useState<'jakarta' | 'depok' | null>(null);


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
        { label: "Produk Unggulan", href: "pu" },
        { label: "Produk Inovasi", href: "pi" },
        { label: "Pelatihan", href: "/#training" },
      ],
    },
    { label: "Login", onClick: handleUserClick },
  ];

    return <Navbar links={navigationItems} showLoginRight />;
  };

  const hrTeam = [
    { name: 'Sonki Prasetya', role: 'HR Staff' },
    { name: 'Asep Taufik Muharram', role: 'HR Staff' },
    { name: 'Fitria Ayuningtias', role: 'HR Staff' }
  ];

  const contacts = [
    { name: 'Yusti Fatmaningdyah', role: 'Contact Person' },
    { name: 'Suci Vina Ramadini', role: 'Contact Person' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Header />

  
      {/* Main Content Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Informasi Lengkap
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lokasi & Tim Kami</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan lokasi kami dan kenali tim sumber daya manusia RTPU yang siap melayani Anda
            </p>
          </div>

          {/* Description Section */}
          <div className="mb-8 px-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-12xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Tentang RTPU PNJ</h3>
              <p className="text-gray-600 leading-relaxed">
                Rekayasa Teknologi dan Produk Unggulan (RTPU) Politeknik Negeri Jakarta
                berfokus pada penelitian terapan, pengembangan produk, dan transfer teknologi
                untuk mendukung industri serta peningkatan kompetensi mahasiswa dan staf.
                Kami bekerja sama dengan mitra industri untuk mengkomersialkan inovasi dan menyediakan
                pelatihan yang relevan dengan kebutuhan pasar.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Location Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-100 p-3 rounded-xl">
                  <MapPin className="text-cyan-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Location</h3>
              </div>

              {/* Interactive Map */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-6 border border-gray-200">
                <iframe
                  title="RTPU PNJ Map"
                  src="https://www.google.com/maps?q=Politeknik+Negeri+Jakarta&hl=id&z=16&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Address Info */}
              <div className="bg-cyan-50 rounded-xl p-6 border-l-4 border-cyan-500">
                <p className="text-gray-700 leading-relaxed mb-2">
                  <Building2 className="inline mr-2 text-cyan-600" size={20} />
                  <span className="font-semibold">The location of RTPU is at</span>
                </p>
                <p className="text-gray-700 mb-3">
                  Politeknik Negeri Jakarta which is located on:
                </p>
                <p className="text-gray-800 font-medium">
                  📍 Jl. Prof. DR. G.A. Siwabessy, Kukusan, Beji,<br/>
                  Depok, Jawa Barat 16425
                </p>
              </div>
            </div>

            {/* Human Resources Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-100 p-3 rounded-xl">
                  <Users className="text-teal-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Human Resources RTPU</h3>
              </div>

              {/* HR Team Cards */}
              <div className="space-y-4 mb-8">
                {hrTeam.map((member, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-5 border-l-4 border-teal-500 hover:shadow-md transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">• {member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Persons */}
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-6 text-white shadow-md">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Mail size={24} />
                  Contact Persons
                </h4>
                <div className="space-y-3">
                  {contacts.map((contact, index) => (
                    <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all">
                      <p className="text-black font-semibold text-lg">{contact.name}</p>
                      <p className="text-sm text-cyan-300">{contact.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Email */}
              <div className="mt-6 bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                <p className="text-gray-700 mb-2 font-semibold">Contact:</p>
                <a 
                  href="mailto:upartpu@pnj.ac.id" 
                  className="text-cyan-600 hover:text-cyan-800 font-medium text-lg flex items-center gap-2 hover:underline transition-all"
                >
                  <Mail size={20} />
                  upartpu@pnj.ac.id
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">RTPU PNJ</h4>
              <p className="text-gray-400">
                Rekayasa Teknologi dan Produk Unggulan
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Program</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Politeknik Negeri Jakarta<br/>
                Depok, Jawa Barat 16425
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RTPU PNJ. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;