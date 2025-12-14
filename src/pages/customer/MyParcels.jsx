import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

export default function MyParcels() {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });
    const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }
    return (
        <section className='p-4'>
            <h2 className='text-2xl my-2'>My Parcels : {parcels.length}</h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-w-7xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ? <span className='text-green-500'>Paid</span> : <Link to={`/dashboard/my-parcels/${parcel._id}`} className='btn btn-info'>Pay</Link>
                                    }
                                </td>
                                <td>delivery status</td>
                                <td className='space-x-2'>
                                    <Link to={`/dashboard/my-parcels/${parcel._id}`} className='btn'>
                                        <FaEye />
                                    </Link>
                                    <button className='btn'>
                                        <FaEdit />
                                    </button>
                                    <button className='btn' onClick={() => handleDelete(parcel._id)}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}