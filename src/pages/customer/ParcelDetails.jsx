import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../comps/shared/Loading";

export default function ParcelDetails(){
    const { parcelId } = useParams();
    const axiosSecure = useAxios();
    const { isPending, data } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });
    const handlePay = async() => {
        const parcelInfo = {
            cost: data.cost,
            parcelId: data._id,
            senderEmail: data.senderEmail,
            parcelName: data.parcelName
        }
        const response = await axiosSecure.post('/create-checkout-session', parcelInfo);
        console.log(response.data);
        window.location.href = response.data.url;
    }
    console.log(data);
    if(isPending){
        return <Loading />
    }
    return(
        <section className='p-4'>
            <h1>Parcel: {data?.parcelName} will cost taka {data.cost}</h1>
            {
                data.paymentStatus === 'paid' ? <p>Payment status: PAID, Tracking id {data.trackingId}</p> : <button onClick={handlePay} className="btn btn-primary mt-2 text-neutral">Pay</button>
            }
        </section>
    );
}