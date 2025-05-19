export default {
  beforeCreate(event) {
    const { data } = event.params;
    // Set default values if not provided
    if (!data.leftContent) {
      data.leftContent = "Khám phá vẻ đẹp tinh tế của những bông hoa tươi. Mỗi bó hoa được chăm chút tỉ mỉ, kết hợp giữa nét đẹp tự nhiên và sự tinh tế trong từng chi tiết, mang đến năng lượng tích cực cho không gian sống.";
    }
    if (!data.rightContent) {
      data.rightContent = "Hoa tươi không chỉ là món quà tặng ý nghĩa, mà còn là tác phẩm nghệ thuật tự nhiên, tô điểm cho không gian sống của bạn thêm phần ấm áp và tươi sáng.";
    }
  }
}; 