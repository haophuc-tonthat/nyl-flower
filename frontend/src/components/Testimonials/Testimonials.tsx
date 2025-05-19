import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thị Hương",
    role: "Khách hàng thân thiết",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content: "Tôi rất hài lòng với dịch vụ của cửa hàng. Hoa tươi và đẹp, nhân viên nhiệt tình. Sẽ tiếp tục ủng hộ!"
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    role: "Khách hàng VIP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    content: "Bó hoa tôi mua cho vợ rất đẹp, cô ấy rất thích. Cảm ơn cửa hàng đã mang đến niềm vui cho gia đình tôi."
  },
  {
    id: 3,
    name: "Lê Thị Mai",
    role: "Khách hàng mới",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content: "Lần đầu tiên mua hoa tại đây và rất ấn tượng. Hoa tươi lâu, giá cả hợp lý, phục vụ chuyên nghiệp."
  }
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Đánh giá từ khách hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 