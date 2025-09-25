import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavbarProps {
  links: NavLink[];
  showLoginRight?: boolean;
  underlineColor?: string; // bisa diatur warnanya
}

// Parent variants untuk stagger
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const navVariants = {
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
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
  underlineColor = "#2563EB", // default biru Tailwind
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const loginLink = links.find((l) => l.label === "Login");
  const mainLinks = links.filter((l) => l.label !== "Login");

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div
          variants={textVariants}
          className="flex items-center space-x-2"
        >
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-xl text-gray-900">RTPU PNJ</span>
        </div>

        {/* Desktop Menu */}
        <motion.div variants={containerVariants} className="hidden md:flex space-x-6 mr-18">
          {mainLinks.map((link, idx) =>
            link.href ? (
              <motion.a
                key={idx}
                variants={textVariants}
                href={link.href}
                className="relative text-gray-600 hover:text-gray-900 font-medium"
              >
                {link.label}
                {/* Underline */}
                <motion.span
                  layoutId={`underline-${link.label}`}
                  className="absolute left-0 -bottom-1 h-0.5"
                  style={{ backgroundColor: underlineColor, width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            ) : (
              <motion.button
                key={idx}
                variants={textVariants}
                onClick={link.onClick}
                className="relative text-gray-600 hover:text-gray-900 font-medium"
              >
                {link.label}
                <motion.span
                  layoutId={`underline-${link.label}`}
                  className="absolute left-0 -bottom-1 h-0.5"
                  style={{ backgroundColor: underlineColor, width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            )
          )}
        </motion.div>

        {/* Login di kanan */}
        {showLoginRight && loginLink && (
          <div className="hidden md:flex">
            {loginLink.href ? (
              <a
                href={loginLink.href}
                className="relative font-medium"
              >
                {loginLink.label}
                <motion.span
                  className="absolute left-0 -bottom-1 h-0.5"
                  style={{ backgroundColor: underlineColor, width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </a>
            ) : (
              <button
                onClick={loginLink.onClick}
                className="relative text-gray-600 hover:text-gray-900 font-medium"
              >
                {loginLink.label}
                <motion.span
                  className="absolute left-0 -bottom-1 h-0.5"
                  style={{ backgroundColor: underlineColor, width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </button>
            )}
          </div>
        )}

        {/* Burger Button (Mobile) */}
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
            className="md:hidden overflow-hidden bg-white px-4 pb-4 space-y-2"
          >
            {links.map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="relative"
              >
                {link.href ? (
                  <a
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {link.label}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-0.5"
                      style={{ backgroundColor: underlineColor, width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </a>
                ) : (
                  <button
                    onClick={link.onClick}
                    className="block text-gray-600 hover:text-gray-900 font-medium w-full text-left"
                  >
                    {link.label}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-0.5"
                      style={{ backgroundColor: underlineColor, width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
