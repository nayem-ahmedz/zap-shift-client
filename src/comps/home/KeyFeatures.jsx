import liveTracking from '../../assets/live-tracking.png';
import safeDelivery from '../../assets/safe-delivery.png';

export default function KeyFeatures(){
    const features = [
        {
            id: 1,
            image: liveTracking,
            name: 'Live Parcel Tracking',
            details: 'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment\'s journey and get instant status updates for complete peace of mind.'
        },
        {
            id: 2,
            image: safeDelivery,
            name: '100% Safe Delivery',
            details: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.'
        },
        {
            id: 3,
            image: safeDelivery,
            name: '24/7 Call Center Support',
            details: 'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.'
        }
    ];
    return(
        <section className='mt-14 border-t-2 border-b-2 border-dashed py-10 md:py-16 border-gray-400 space-y-6'>
            {
                features.map(feature => <div key={feature.id} className='flex flex-col sm:flex-row gap-10 bg-base-100 p-4 md:p-8 rounded-2xl'>
                    <figure className='w-[200px] shrink-0 sm:border-r-2 border-dashed border-gray-400 pr-10'>
                        <img src={feature.image} alt={feature.name} className='w-full' />
                    </figure>
                    <div className='grow flex flex-col gap-6 content-center'>
                        <h4 className='text-2xl font-bold'>{feature.name}</h4>
                        <p>{feature.details}</p>
                    </div>
                </div>)
            }
        </section>
    );
}