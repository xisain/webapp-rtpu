const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <img src="/images/logo.png" alt="Logo" className='w-10 h-10' />
          <span className="font-bold text-2xl ml-2">RTPU PNJ</span>
        </div>
        <p className="text-gray-400 text-lg mb-4">
          Rekayasa Teknologi dan Produk Unggulan - Politeknik Negeri Jakarta
        </p>
        <p className="text-gray-500">
          © 2025 Politeknik Negeri Jakarta. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
