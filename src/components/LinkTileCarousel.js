import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function LinkTileCarousel({ title, items, type }) {
  return (
    <section className="mb-16">
      <h2 className="text-lg sm:text-2xl font-bold text-stone-800 mb-6 text-center">{title}</h2>

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
        {items.map((item) => (
          <SwiperSlide key={item.slug}>
            <Link
              href={`/shop?${type === 'brand' ? 'brand' : 'category'}=${item.slug}`}
              className="block"
            >
              <div className="p-4 border rounded-lg shadow hover:shadow-md transition bg-white h-[220px] flex flex-col items-center justify-between">
                <div className="relative w-full h-24 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-stone-800 font-medium text-sm">{item.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}