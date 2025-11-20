import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";


interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  hasDropdown?: boolean;
  subItems?: { label: string; href?: string; onClick?: () => void }[];

}

interface NavbarProps {
  links: NavigationItem[];
  showLoginRight?: boolean;
  hideOnScroll?: boolean;
  underlineColor?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const navVariants = {
  hidden: { y: -50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { y: -50, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const textVariants = {
  hidden: { x: -30, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { x: -30, opacity: 0, transition: { duration: 0.3 } },
};




const Navbar: React.FC<NavbarProps> = ({
  links,
  showLoginRight,
  underlineColor = "#2563EB",
  hideOnScroll = false, // <-- FIX: berikan default false

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);

  const loginLink = links.find((l) => l.label === "Login");
  const mainLinks = links.filter((l) => l.label !== "Login");

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!hideOnScroll) return; // ⛔ fitur mati jika tidak dipanggil dari halaman yang butuh

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);  // hide
      } else {
        setIsVisible(true);   // show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hideOnScroll]);


  return (
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate={hideOnScroll ? (isVisible ? "show" : "exit") : "show"}
        className={
          hideOnScroll
            ? "bg-white sticky top-0 z-50"
            : "bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
        }
      >


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`max-w-7xl mx-auto px-4 py-4 flex items-center ${
          showLoginRight ? "justify-between relative" : "justify-between"
        }`}
      >
        {/* Logo */}
        <motion.div variants={textVariants} className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-xl text-gray-900">RTPU PNJ</span>
        </motion.div>

        {/* Tengah (hanya jika showLoginRight aktif) */}
        {showLoginRight && (
          <motion.div
            variants={containerVariants}
            className="hidden md:flex space-x-6 items-center absolute left-1/2 transform -translate-x-1/2"
          >
            {mainLinks.map((link, idx) => (
              <div key={idx} className="relative">
                {link.href ? (
                  <motion.a
                    variants={textVariants}
                    href={link.href}
                    onClick={(e) => {
                      if (link.hasDropdown) {
                        e.preventDefault();
                        setOpenDesktopDropdown(
                          openDesktopDropdown === link.label ? null : link.label
                        );
                      }
                    }}
                    className="relative text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transform transition-transform ${
                          openDesktopDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-0.5"
                      style={{ backgroundColor: underlineColor, width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.a>
                ) : (
                  <motion.button
                    variants={textVariants}
                    onClick={() => {
                      if (link.hasDropdown) {
                        setOpenDesktopDropdown(
                          openDesktopDropdown === link.label ? null : link.label
                        );
                      } else if (link.onClick) {
                        link.onClick();
                      }
                    }}
                    className="relative text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transform transition-transform ${
                          openDesktopDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-0.5"
                      style={{ backgroundColor: underlineColor, width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.button>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.hasDropdown && link.subItems && openDesktopDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48"
                    >
                      {link.subItems.map((sub, subIdx) => (
                        <a
                          key={subIdx}
                          href={sub.href ?? "#"}
                          onClick={(e) => {
                            if (sub.onClick) {
                              e.preventDefault();
                              sub.onClick();
                              setOpenDesktopDropdown(null);
                            }
                          }}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}

        {/* Jika showLoginRight tidak aktif */}
        {!showLoginRight && (
          <motion.div
            variants={containerVariants}
            className="hidden md:flex space-x-6 items-center"
          >
            {mainLinks.map((link, idx) => (
              <div key={idx} className="relative">
                {link.href ? (
                  <motion.a
                    variants={textVariants}
                    href={link.href}
                    onClick={(e) => {
                      if (link.hasDropdown) {
                        e.preventDefault();
                        setOpenDesktopDropdown(
                          openDesktopDropdown === link.label ? null : link.label
                        );
                      }
                    }}
                    className="relative text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transform transition-transform ${
                          openDesktopDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-0.5"
                      style={{ backgroundColor: underlineColor, width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.a>
                ) : (
                  <motion.button
                    variants={textVariants}
                    onClick={() => {
                      if (link.hasDropdown) {
                        setOpenDesktopDropdown(
                          openDesktopDropdown === link.label ? null : link.label
                        );
                      } else if (link.onClick) {
                        link.onClick();
                      }
                    }}
                    className="relative text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transform transition-transform ${
                          openDesktopDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-0.5"
                      style={{ backgroundColor: underlineColor, width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.button>
                )}

                <AnimatePresence>
                  {link.hasDropdown && link.subItems && openDesktopDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48"
                    >
                      {link.subItems.map((sub, subIdx) => (
                        <a
                          key={subIdx}
                          href={sub.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}

        {/* Login di kanan */}
        {showLoginRight && loginLink && (
          <motion.button
            variants={textVariants}
            onClick={loginLink.onClick}
            className="ml-4 px-4 py-2 text-black rounded-md transition"
          >
            {loginLink.label}
          </motion.button>
        )}

        {/* Burger Button */}
        <motion.button
          variants={textVariants}
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white px-4 pb-4 space-y-2"
          >
            {links.map((link, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => {
                    if (link.hasDropdown) {
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                      );
                    } else if (link.onClick) {
                      link.onClick();
                    } else if (link.href) {
                      window.location.href = link.href;
                    }
                  }}
                  className="flex justify-between items-center w-full text-gray-700 font-medium py-2"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown ? (
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  ) : null}
                </button>

                <AnimatePresence>
                  {link.hasDropdown && link.subItems && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 space-y-2"
                    >
                      {link.subItems.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          className="block text-gray-600 hover:text-gray-900 py-1"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
