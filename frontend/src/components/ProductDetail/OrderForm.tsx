"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface OrderFormProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
  onClose: () => void;
}
// Đặt hàng
const OrderForm: React.FC<OrderFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

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
          type: 'order',
          data: {
            ...formData,
            productName: product.name,
            productPrice: product.price,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setSubmitStatus({ type: 'success', message: 'Đơn hàng của bạn đã được gửi thành công!' });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      setSubmitStatus({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-[#FDF9F0] p-4 sm:p-8 rounded-xl max-w-lg w-full mx-4 my-4 sm:my-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-light text-[#0e0e0d]/90">Đặt hàng</h2>
          <button 
            onClick={onClose}
            aria-label="Đóng"
            className="text-[#0e0e0d]/70 hover:text-[#e593cd] transition-colors duration-300"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Order Summary Table */}
        <div className="mb-4 sm:mb-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#e593cd]/10">
                <th className="p-2 text-left text-sm sm:text-base font-light text-[#0e0e0d]/90">Sản phẩm</th>
                <th className="p-2 text-right text-sm sm:text-base font-light text-[#0e0e0d]/90">Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#0e0e0d]/10">
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                    <span className="text-sm sm:text-base font-medium text-[#0e0e0d]/90">{product.name}</span>
                  </div>
                </td>
                <td className="p-2 text-right text-sm sm:text-base font-medium text-[#e593cd]">{product.price}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-xs sm:text-sm font-light text-[#0e0e0d]/70 mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#0e0e0d]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e593cd]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-light text-[#0e0e0d]/70 mb-1">
              Số điện thoại *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#0e0e0d]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e593cd]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-light text-[#0e0e0d]/70 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#0e0e0d]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e593cd]"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-xs sm:text-sm font-light text-[#0e0e0d]/70 mb-1">
              Địa chỉ giao hàng *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#0e0e0d]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e593cd]"
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-xs sm:text-sm font-light text-[#0e0e0d]/70 mb-1">
              Ghi chú
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#0e0e0d]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e593cd]"
            />
          </div>

          {submitStatus.type && (
            <div className={`text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-[#e593cd] text-[#FDF9F0] rounded-full hover:bg-[#d17db5] transition-all duration-500 tracking-wider font-light text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang gửi...' : 'Xác nhận đặt hàng'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm; 