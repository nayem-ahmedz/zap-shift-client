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
    // console.log(data);
    if(isPending){
        return <Loading />
    }
    return(
        <section className='p-4'>
            <h1>Parcel: {data?.parcelName}</h1>
        </section>
    );
}