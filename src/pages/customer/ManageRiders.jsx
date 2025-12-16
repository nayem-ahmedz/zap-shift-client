import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaEye, FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function ManageRiders() {
    const axiosSecure = useAxios();
    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'allRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });
    const updateStatus = (id, status) => {
        axiosSecure.patch(`/riders/${id}`, status)
            .then(res => {
                if (res.data.riderStatus.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Rider Status is updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }
    const handleApprove = (id, email) => {
        updateStatus(id, { status: 'active', email });
    }
    const handleReject = (id, email) => {
        updateStatus(id, { status: 'rejected', email });
    }
    const handleDelete = (id, email) => {
        updateStatus(id, { status: 'deleted', email });
    }
    return (
        <section className='p-4'>
            <h2 className='text-2xl my-2'>Manage Riders : {riders.length}</h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-w-7xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.district}</td>
                                <td>{rider.phone}</td>
                                <td>
                                    {
                                        <p className={`${rider.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{rider.status}</p>
                                    }
                                </td>
                                <td className='space-x-2'>
                                    <Link to={`/dashboard/riders/${rider._id}`} className='btn'>
                                        <FaEye />
                                    </Link>
                                    <button className='btn' onClick={() => handleApprove(rider._id, rider.email)}>
                                        <FaUserCheck />
                                    </button>
                                    <button className='btn' onClick={() => handleReject(rider._id, rider.email)}>
                                        <MdPersonRemove />
                                    </button>
                                    <button className='btn' onClick={() => handleDelete(rider._id, rider.email)}>
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