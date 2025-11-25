import icon from '../../assets/bookingIcon.png';

export default function WorkingStyle(){
    const process = [
        {
            id: 1,
            title: 'Booking Pick & Drop',
            details: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 2,
            title: 'Cash On Delivery',
            details: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 3,
            title: 'Delivery Hub',
            details: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 4,
            title: 'Booking SME & Corporate',
            details: 'From personal packages to business shipments — we deliver on time, every time.'
        },
    ];
    return(
        <section className='mt-10'>
            <h3 className='text-3xl my-6'>How it Works</h3>
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
                {
                    process.map(el => <div key={el.id} className='bg-base-100 p-6 lg:p-10 rounded-2xl'>
                        <img src={icon} alt={el.title} />
                        <h4>{el.title}</h4>
                        <p>{el.details}</p>
                    </div>)
                }
            </section>
        </section>
    );
}