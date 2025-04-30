import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SectionCarousel({ title, products }) {
  return (
    <section className="mb-16">
      <h2 className="text-lg sm:text-2xl font-bold text-stone-800 mb-6">{title}</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={2}
        navigation
        breakpoints={{
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          768: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/product/${product.id}`} className="block">
              <div className="p-4 border rounded-lg shadow hover:shadow-md transition bg-white h-[320px] flex flex-col">
                <Image
                  src={product.image.url}
                  alt={product.image.altText}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-2 flex-grow flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-stone-800">{product.title}</h3>
                  <p className="text-stone-600 text-sm">{product.price}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}