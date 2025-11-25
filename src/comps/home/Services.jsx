import icon from '../../assets/bookingIcon.png';

export default function Services(){
    const services = [
        {
            id: 1,
            title: 'Express  & Standard Delivery',
            details: 'We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.'
        },
        {
            id: 2,
            title: 'Nationwide Delivery',
            details: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.'
        },
        {
            id: 3,
            title: 'Fulfillment Solution',
            details: 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.'
        },
        {
            id: 4,
            title: 'Cash on Home Delivery',
            details: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.'
        },
        {
            id: 5,
            title: 'Corporate Service / Contract In Logistics',
            details: 'Customized corporate services which includes warehouse and inventory management support.'
        },
        {
            id: 6,
            title: 'Parcel Return',
            details: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.'
        },
    ];
    return(
        <section className='mt-10 text-center'>
            <h3 className='text-3xl mt-6'>Our Services</h3>
            <p className='mt-3 mb-6'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. </p>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {
                    services.map(el => <div key={el.id} className='bg-base-100 p-6 lg:p-10 rounded-2xl space-y-3'>
                        <img src={icon} alt={el.title} className='mx-auto' />
                        <h4 className='text-xl md:text-2xl font-bold'>{el.title}</h4>
                        <p>{el.details}</p>
                    </div>)
                }
            </section>
        </section>
    );
}