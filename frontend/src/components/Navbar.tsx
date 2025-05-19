"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { contactService } from '@/services/contactService';
import { ContactInfo } from '@/types/contact';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const info = await contactService.getContactInfo();
        setContactInfo(info);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['featured', 'about', 'gallery', 'contact'];
    const options = {
      root: null,
      rootMargin: '-160px 0px 0px 0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id);
        }
      });
    }, options);

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleScroll = (id: string) => {
    setActiveItem(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const easedProgress = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * easedProgress);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <motion.nav 
      className={`w-full flex justify-center items-center h-[160px] lg:h-[140px] md:h-[120px] sm:h-[100px] rounded-t-2xl bg-[#FDF9F0] fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-[1200px] px-4">
        <div className="flex items-center justify-between relative">
          {/* Desktop Menu - Left */}
          {!(pathname && pathname.startsWith("/product/")) && (
            <ul className="hidden md:flex gap-16 lg:gap-10 md:gap-6">
              <li>
                <button 
                  onClick={() => handleScroll('featured')}
                  className={`text-2xl lg:text-xl md:text-lg font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-48 lg:w-40 md:w-32 text-center relative ${
                    activeItem === 'featured' ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#e593cd]' : ''
                  }`}
                >
                  Sản phẩm nổi bật
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('about')}
                  className={`text-2xl lg:text-xl md:text-lg font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-48 lg:w-40 md:w-32 text-center relative ${
                    activeItem === 'about' ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#e593cd]' : ''
                  }`}
                >
                  Về chúng tôi
                </button>
              </li>
            </ul>
          )}

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src={contactInfo?.logo?.url || '/images/logo.png'}
                  alt={contactInfo?.logo?.alternativeText || 'Tiệm hoa cinh NYL Logo'}
                  width={120}
                  height={120}
                  className="h-[120px] lg:h-[100px] md:h-[80px] sm:h-[60px] w-auto rounded-full shadow-xl cursor-pointer"
                  unoptimized
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu - Right */}
          {!(pathname && pathname.startsWith("/product/")) && (
            <ul className="hidden md:flex gap-16 lg:gap-10 md:gap-6">
              <li>
                <button 
                  onClick={() => handleScroll('gallery')}
                  className={`text-2xl lg:text-xl md:text-lg font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-48 lg:w-40 md:w-32 text-center relative ${
                    activeItem === 'gallery' ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#e593cd]' : ''
                  }`}
                >
                  Thư viện
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('contact')}
                  className={`text-2xl lg:text-xl md:text-lg font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-48 lg:w-40 md:w-32 text-center relative ${
                    activeItem === 'contact' ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#e593cd]' : ''
                  }`}
                >
                  Liên hệ
                </button>
              </li>
            </ul>
          )}

          {/* Mobile Menu Button */}
          {!(pathname && pathname.startsWith("/product/")) && (
            <button 
              className="md:hidden text-2xl text-[#0e0e0d]/90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !(pathname && pathname.startsWith("/product/")) && (
        <motion.div 
          className="fixed top-[160px] left-0 right-0 bg-[#FDF9F0] shadow-lg md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center py-4 gap-2">
            <li>
              <button 
                onClick={() => handleScroll('featured')}
                className={`text-xl font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-full px-8 py-2 text-center ${
                  activeItem === 'featured' ? 'bg-[#e593cd]/10' : ''
                }`}
              >
                Sản phẩm nổi bật
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScroll('about')}
                className={`text-xl font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-full px-8 py-2 text-center ${
                  activeItem === 'about' ? 'bg-[#e593cd]/10' : ''
                }`}
              >
                Về chúng tôi
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScroll('gallery')}
                className={`text-xl font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-full px-8 py-2 text-center ${
                  activeItem === 'gallery' ? 'bg-[#e593cd]/10' : ''
                }`}
              >
                Thư viện
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScroll('contact')}
                className={`text-xl font-light text-[#0e0e0d]/90 hover:text-[#e593cd] transition-colors duration-500 w-full px-8 py-2 text-center ${
                  activeItem === 'contact' ? 'bg-[#e593cd]/10' : ''
                }`}
              >
                Liên hệ
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
