import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

export default function SendParcel() {
    const { register, handleSubmit, watch } = useForm();
    const warehouse = useLoaderData();
    // axios custom hook import
    const secureAxios = useAxios();
    const { user } = useAuth();

    // getting districts name from warehouse
    const allRegions = warehouse.map(d => d.region);
    // console.log(allRegions) // multiple regions name, copied several times
    // const regions = new Set(allRegions); // created with unique names
    const regions = [...new Set(allRegions)]; // build a array
    const handleParcel = data => {
        const isDocument = data.parceltype === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const weight = data.parcelWeight;

        let cost = 0;
        // cost based on document or not
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        } else {
            if (weight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const extraWeight = weight - 3;
                const defaultCharge = isSameDistrict ? 110 : 150;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = defaultCharge + extraCharge;
            }
        }
        Swal.fire({
            title: "Do you Agree with the cost?",
            text: `Courier charge is ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree"
        }).then((result) => {
            if (result.isConfirmed) {
                secureAxios.post('/parcels', data)
                    .then(res => {
                        console.log('after save', res.data);
                    })
                Swal.fire({
                    title: "Confirmed!",
                    text: "Your parcel is processing.",
                    icon: "success"
                });
            }
        });
    }
    // get all district of a specific region
    const getDistrictsByRegion = region => {
        const regions = warehouse.filter(d => d.region === region);
        const districts = regions.map(r => r.district);
        return districts;
    }
    // console.log(getDistricts('Dhaka'));
    // watch sender region
    const senderRegion = watch('senderRegion');
    const receiverRegion = watch('receiverRegion');
    return (
        <section className="bg-white mt-10 p-4 md:p-10 lg:p-16 rounded-2xl">
            <h2 className="text-3xl font-bold">Send A Parcel</h2>
            <p className="my-4 text-2xl">Enter your parcel details</p>
            <form onSubmit={handleSubmit(handleParcel)} className="space-y-4">
                {/* Parcel Type */}
                <fieldset className="fieldset">
                    <div className="flex gap-8">
                        <div className="flex gap-3">
                            <input type="radio" id="document" className="radio" {...register('parceltype', { required: true })} value='document' defaultChecked />
                            <label htmlFor="document" className="label">Document</label>
                        </div>
                        <div className="flex gap-3">
                            <input type="radio" id="non-document" {...register('parceltype', { required: true })} className="radio" value='non-document' />
                            <label htmlFor="non-document" className="label">Non-Document</label>
                        </div>
                    </div>
                </fieldset>

                {/* Parcel Info */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
                    <fieldset className="fieldset *:w-full">
                        <label className="label">Parcel Name</label>
                        <input type="text" className="input" {...register('parcelName', { required: true })} placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset *:w-full">
                        <label className="label">Parcel Weight (KG)</label>
                        <input type="text" className="input" {...register('parcelWeight', { required: true })} placeholder="Parcel Weight (KG)" />
                    </fieldset>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
                    {/* Sender fileds */}
                    <fieldset className="fieldset *:w-full">
                        <h3 className="text-xl">Sender Details</h3>
                        <label className="label">Sender Name</label>
                        <input type="text" className="input" {...register('senderName', { required: true })} placeholder="Sender Name" defaultValue={user?.displayName} />
                        <label className="label">Sender Email</label>
                        <input type="email" className="input" {...register('senderEmail', { required: true })} placeholder="Sender Email" defaultValue={user?.email} />
                        <label className="label">Address</label>
                        <input type="text" className="input" {...register('senderAddress', { required: true })} placeholder="Address" />
                        <label className="label">Sender Phone No</label>
                        <input type="tel" className="input" {...register('senderPhone', { required: true })} placeholder="Sender Phone No" />

                        {/* select region, first */}
                        <label className="label">Sender Region</label>
                        <select defaultValue="Select Your Region" {...register('senderRegion', { required: true })} className="select">
                            <option disabled={true}>Select Your Region</option>
                            {
                                regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                            }
                        </select>

                        {/* then, select district */}
                        <label className="label">Sender District</label>
                        <select defaultValue="Select Your District" {...register('senderDistrict', { required: true })} className="select">
                            <option disabled={true}>Select Your District</option>
                            {
                                getDistrictsByRegion(senderRegion).map((district, index) => <option key={index} value={district}>{district}</option>)
                            }
                        </select>
                        <label className="label">Picup Instruction</label>
                        <textarea className="textarea" {...register('pickupInfo', { required: true })} placeholder="Pickup Instruction"></textarea>
                    </fieldset>

                    {/* Reciver fileds */}
                    <fieldset className="fieldset *:w-full">
                        <h3 className="text-xl">Receiver Details</h3>
                        <label className="label">Receiver Name</label>
                        <input type="text" className="input" {...register('receiverName', { required: true })} placeholder="Sender Name" />
                        <label className="label">Receiver Email</label>
                        <input type="email" className="input" {...register('receiverEmail', { required: true })} placeholder="Receiver Email" />
                        <label className="label">Receiver Address</label>
                        <input type="text" className="input" {...register('receiverAddress', { required: true })} placeholder="Address" />
                        <label className="label">Receiver Phone No</label>
                        <input type="tel" className="input" {...register('receiverPhone', { required: true })} placeholder="Sender Phone No" />

                        {/* select region, first */}
                        <label className="label">Receiver Region</label>
                        <select defaultValue="Select Receiver Region" {...register('receiverRegion', { required: true })} className="select">
                            <option disabled={true}>Select Receiver Region</option>
                            {
                                regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                            }
                        </select>

                        {/* then, receiver district */}
                        <label className="label">Reciver District</label>
                        <select defaultValue="Select Receiver District" {...register('receiverDistrict', { required: true })} className="select">
                            <option disabled={true}>Select Receiver District</option>
                            {
                                getDistrictsByRegion(receiverRegion).map((district, index) => <option key={index} value={district}>{district}</option>)
                            }
                        </select>
                        <label className="label">Delivery Instruction</label>
                        <textarea className="textarea" {...register('deliveryInfo', { required: true })} placeholder="Delivery Instruction"></textarea>
                    </fieldset>
                </section>
                <p>* PickUp Time 4pm-7pm Approx.</p>
                <button className="btn btn-neutral mt-4">Proceed to Confirm Booking</button>
            </form>
        </section>
    );
}