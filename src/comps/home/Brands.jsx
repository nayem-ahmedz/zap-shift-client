// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../assets/brands/amazon.png';
import casio from '../../assets/brands/casio.png';
import moonstar from '../../assets/brands/moonstar.png';
import randstad from '../../assets/brands/randstad.png';
import star from '../../assets/brands/star.png';
import start_people from '../../assets/brands/start_people.png';

export default function Brands() {
    return (
        <section className='mt-10 text-center'>
            <h3 className='text-3xl my-6 font-medium'>We've helped thousands of sales teams</h3>
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
                modules={[Autoplay]}
            >
                <SwiperSlide>
                    <img src={amazon} alt='amazon logo' className='mx-auto' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={casio} alt='casio logo' className='mx-auto' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={moonstar} alt='moonstar logo' className='mx-auto' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={randstad} alt='randstad logo' className='mx-auto' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={star} alt='star logo' className='mx-auto' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={start_people} alt='start people logo' className='mx-auto' />
                </SwiperSlide>
            </Swiper>
        </section>
    );
}