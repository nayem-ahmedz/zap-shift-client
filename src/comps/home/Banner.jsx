import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../assets/banner/banner1.webp';
import bannerImg2 from '../../assets/banner/banner2.webp';
import bannerImg3 from '../../assets/banner/banner3.webp';
import { FaArrowRight } from "react-icons/fa";

export default function Banner() {
    return (
        <section className="mt-10">
            <Carousel autoPlay={true} infiniteLoop={true}>
                <div className="relative">
                    <img src={bannerImg1} />
                    <ButtonGroup />
                </div>
                <div>
                    <img src={bannerImg2} />
                    <ButtonGroup />
                </div>
                <div>
                    <img src={bannerImg3} />
                    <ButtonGroup />
                </div>
            </Carousel>
        </section>
    );
}

function ButtonGroup() {
    return (
        <div className="flex gap-2 md:gap-3 absolute bottom-4 left-4 md:bottom-14 md:left-14 xl:bottom-24 xl:left-24">
            <a className="btn text-base bg-primary">Track Your Parcel</a>
            <a className="btn text-base btn-ghost bg-neutral text-white rounded-full p-0 w-10">
                <FaArrowRight className="text-xl -rotate-45" />
            </a>
            <a className="btn text-base">Be a Rider</a>
        </div>
    );
}