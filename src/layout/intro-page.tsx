import ProcessItem from "@/components/intro/process-item";

const contentIntroPage: {
  title: string;
  description: string;
  image: string;
}[] = [
  {
    title: "Thành lập từ năm 2017",
    description:
      "Kingsman Tailor ra đời với sứ mệnh mang đến những bộ âu phục chuẩn mực cho quý ông hiện đại – những người luôn đề cao phong thái lịch lãm, tự tin và khác biệt. Chúng tôi tin rằng, một bộ vest đẹp không chỉ là trang phục, mà còn là tuyên ngôn về đẳng cấp và cá tính riêng của người mặc",
    image: "intro/intro-1.jpg",
  },
  {
    title: "Từ những ngày đầu thành lập",
    description:
      "Kingsman Tailor đã kiên định theo đuổi phong cách may đo thủ công chuẩn Anh Quốc, kết hợp cùng sự tinh tế trong từng đường kim, mũi chỉ. Mỗi sản phẩm đều được thực hiện bởi đội ngũ thợ lành nghề với nhiều năm kinh nghiệm, đảm bảo độ vừa vặn hoàn hảo và cảm giác thoải mái tối đa.",
    image: "intro/intro-2.jpg",
  },
  {
    title: "Không chỉ chú trọng đến chất lượng vải và kỹ thuật cắt may",
    description:
      "Kingsman Tailor còn quan tâm đến trải nghiệm cá nhân hóa của từng khách hàng. Tại đây, mỗi quý ông đều được tư vấn riêng biệt về phom dáng, màu sắc và phong cách, giúp tôn lên vẻ lịch lãm và sự tự tin trong mọi hoàn cảnh – từ công sở đến sự kiện đặc biệt",
    image: "intro/intro-3.jpg",
  },
  {
    title: "Trải qua gần 10 năm phát triển",
    description:
      "Kingsman Tailor đã trở thành địa chỉ tin cậy của hàng nghìn khách hàng trong và ngoài nước. Chúng tôi tự hào khi mỗi bộ vest Kingsman không chỉ là sản phẩm thời trang, mà còn là biểu tượng của tinh thần tận tâm, tỉ mỉ và niềm đam mê dành cho nghệ thuật may đo.",
    image: "intro/intro-4.jpg",
  },
  {
    title: "Bước vào tương lai",
    description:
      "Kingsman Tailor tiếp tục khẳng định vị thế trong lĩnh vực thời trang may đo cao cấp tại Việt Nam, không ngừng đổi mới để mang đến những trải nghiệm tốt nhất – nơi mà mỗi khách hàng đều được tôn vinh như một quý ông Kingsman thực thụ",
    image: "intro/intro-5.jpg",
  },
];

export default function IntroPage() {
  return (
    <div>
      {contentIntroPage.map((item, index) => {
        return (
          <ProcessItem
            title={item.title}
            description={item.description}
            image={item.image}
            isEnd={index === contentIntroPage.length - 1}
            key={`intro-${index}`}
          />
        );
      })}
    </div>
  );
}
