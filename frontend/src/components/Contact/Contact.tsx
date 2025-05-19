"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contactService } from '@/services/contactService';
import { ContactInfo } from '@/types/contact';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus({ type: 'success', message: 'Tin nhắn của bạn đã được gửi thành công!' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!contactInfo) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Left Column - Contact Info */}
        <motion.div 
          className="space-y-6 sm:space-y-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#0e0e0d]/90 mb-3 sm:mb-4 tracking-wider">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-base sm:text-lg text-[#0e0e0d]/70 tracking-wide">
              Hãy để chúng tôi giúp bạn tạo nên những khoảnh khắc đặc biệt với những bó hoa tươi đẹp nhất
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <motion.div 
              className="flex items-start space-x-3 sm:space-x-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e593cd] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-[#0e0e0d]/90">Điện thoại</h3>
                <p className="text-sm sm:text-base text-[#0e0e0d]/70">{contactInfo.phone}</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-3 sm:space-x-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e593cd] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-[#0e0e0d]/90">Email</h3>
                <p className="text-sm sm:text-base text-[#0e0e0d]/70">{contactInfo.email}</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-3 sm:space-x-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e593cd] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-[#0e0e0d]/90">Địa chỉ</h3>
                <p className="text-sm sm:text-base text-[#0e0e0d]/70">{contactInfo.address}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div 
          className="bg-[#FDF9F0] p-6 sm:p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-medium text-[#0e0e0d]/70 mb-1 sm:mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-[#0e0e0d]/20 focus:border-[#e593cd] focus:ring-1 focus:ring-[#e593cd] transition-colors duration-300"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-[#0e0e0d]/70 mb-1 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-[#0e0e0d]/20 focus:border-[#e593cd] focus:ring-1 focus:ring-[#e593cd] transition-colors duration-300"
                  placeholder="Nhập email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm sm:text-base font-medium text-[#0e0e0d]/70 mb-1 sm:mb-2">
                Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-[#0e0e0d]/20 focus:border-[#e593cd] focus:ring-1 focus:ring-[#e593cd] transition-colors duration-300"
                placeholder="Nhập tin nhắn của bạn"
              ></textarea>
            </div>
            {submitStatus.type && (
              <div className={`text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {submitStatus.message}
              </div>
            )}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#e593cd] text-white py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium tracking-wide hover:bg-[#d17db3] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact; 