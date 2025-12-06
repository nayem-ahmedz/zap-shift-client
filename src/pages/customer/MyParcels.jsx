import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

export default function MyParcels(){
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });
    return(
        <section>
            <h2>My Parcels : {parcels.length}</h2>
        </section>
    );
}