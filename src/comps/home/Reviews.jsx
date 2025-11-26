import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { FaQuoteRight } from "react-icons/fa";

export default function Reviews() {
    const reveiws = [
        {
            id: 1,
            review: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
            reviewerImage: '',
            reviewerName: 'Nayem Ahmed',
            reviewerProfession: 'Software Engineer'
        },
        {
            id: 2,
            review: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
            reviewerImage: '',
            reviewerName: 'Hajifa Jui',
            reviewerProfession: 'Teacher'
        },
        {
            id: 3,
            review: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
            reviewerImage: '',
            reviewerName: 'Ahmed Nayem',
            reviewerProfession: 'Web Developer'
        },
        {
            id: 4,
            review: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
            reviewerImage: '',
            reviewerName: 'Dev Zones',
            reviewerProfession: 'Mobile Engineer'
        },
        {
            id: 5,
            review: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
            reviewerImage: '',
            reviewerName: 'Tester Boss',
            reviewerProfession: 'DevOps Engineer'
        },
    ];
    return (
        <section className="mt-10 text-center">
            <h2 className="text-3xl">What our customers are sayings</h2>
            <p className="mt-4 mb-8">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            <section className="">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'3'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    {
                        reveiws.map(review => <SwiperSlide key={review.id}>
                            <div className="p-8 text-left">
                                <FaQuoteRight className="text-4xl" />
                                <p className="border-b-2 border-gray-400 border-dashed pb-4 my-4">{review.review}</p>
                                <div className="flex gap-6 items-center">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-medium">{review.reviewerName}</h4>
                                        <p>{review.reviewerProfession}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </section>
        </section>
    );
}