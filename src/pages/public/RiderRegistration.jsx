import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import RiderImg from '../../../src/assets/agent-pending.png';
import Swal from "sweetalert2";

export default function RiderRegistration() {
    const { register, handleSubmit, watch } = useForm();
    const warehouse = useLoaderData();
    const secureAxios = useAxios();
    const { user } = useAuth();
    const allRegions = warehouse.map(d => d.region);
    const regions = [...new Set(allRegions)]; // build a array
    const handleRegi = data => {
        // console.log(data);
        Swal.fire({
            title: "Confirm and Submit?",
            text: `Provide genuine information`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit"
        }).then((result) => {
            if (result.isConfirmed) {
                secureAxios.post('/riders', data)
                    .then(res => {
                        // console.log('after save', res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Registration is done",
                                text: "Your request is under review.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Opps, unable to Register",
                                text: "Try again later",
                                icon: "error"
                            });
                        }
                    })
            }
        });
    }
    // get all district of a specific region
    const getDistrictsByRegion = region => {
        const regions = warehouse.filter(d => d.region === region);
        const districts = regions.map(r => r.district);
        return districts;
    }
    // watch rider region
    const riderRegion = watch('region');
    return (
        <section className="bg-white mt-10 p-4 md:p-10 lg:p-16 rounded-2xl">
            <h2 className="text-3xl font-bold">Rider Registration</h2>
            <p className="my-4 text-2xl">Tell us about yourself</p>
            <section className="grid grid-cols-1 md:grid-cols-2">
                <form onSubmit={handleSubmit(handleRegi)} className="space-y-4">
                    <fieldset className="fieldset *:w-full">
                        <label className="label">Your Name</label>
                        <input type="text" className="input" {...register('name', { required: true })} placeholder="Rider Name" defaultValue={user?.displayName} />
                        <label className="label">Driving License No</label>
                        <input type="text" className="input" {...register('drivingLincenseNo', { required: true })} placeholder="Driving License No" />
                        <label className="label">Your Email</label>
                        <input type="email" className="input" {...register('email', { required: true })} placeholder="Your Email" defaultValue={user?.email} />

                        {/* select region, first */}
                        <label className="label">Your Region</label>
                        <select defaultValue="Select Your Region" {...register('region', { required: true })} className="select">
                            <option disabled={true}>Select Your Region</option>
                            {
                                regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                            }
                        </select>

                        {/* then, select district */}
                        <label className="label">Your District</label>
                        <select defaultValue="Select Your District" {...register('district', { required: true })} className="select">
                            <option disabled={true}>Select Your District</option>
                            {
                                getDistrictsByRegion(riderRegion).map((district, index) => <option key={index} value={district}>{district}</option>)
                            }
                        </select>
                        {/* Phone */}
                        <label className="label">Phone No</label>
                        <input type="tel" className="input" {...register('phone', { required: true })} placeholder="Your Phone No" />
                        <label className="label">NID No</label>
                        <input type="text" className="input" {...register('nidNo', { required: true })} placeholder="NID No" />
                        <label className="label">Bike Brand model and Year</label>
                        <input type="text" className="input" {...register('bikeModel', { required: true })} placeholder="Bike Brand model and Year" />
                        <label className="label">Bike Registration No</label>
                        <input type="text" className="input" {...register('bikeRegiNo', { required: true })} placeholder="Bike Registration" />
                        <label className="label">Tell us about Yourself</label>
                        <textarea className="textarea" {...register('riderInfo', { required: true })} placeholder="Tell us about Yourself"></textarea>

                        <button type="submit" className="btn btn-neutral mt-4">Submit</button>
                    </fieldset>
                </form>
                <div>
                    <img src={RiderImg} alt='rider smile' className="w-full max-w-md mx-auto" />
                </div>
            </section>
        </section>
    );
}