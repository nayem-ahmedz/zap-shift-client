import { lazy } from 'react';
const Banner = lazy(() => import('../../comps/home/Banner'));
const WorkingStyle = lazy(() => import('../../comps/home/WorkingStyle'));
const Services = lazy(() => import('../../comps/home/Services'));
const Brands = lazy(() => import('../../comps/home/Brands'));
const KeyFeatures = lazy(() => import('../../comps/home/KeyFeatures'));
const Reviews = lazy(() => import('../../comps/home/Reviews'));

export default function HomePage(){
    return(
        <>
            <Banner />
            <WorkingStyle />
            <Services />
            <Brands />
            <KeyFeatures />
            <Reviews />
        </>
    );
}