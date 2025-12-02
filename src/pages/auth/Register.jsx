import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../comps/auth/GoogleLogin";
import axios from "axios";

export default function Register() {
    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const handleRegistration = (data) => {
        const imageFile = data.photo[0];
        registerUser(data.email, data.password)
            .then(result => {
                const formData = new FormData();
                formData.append('image', imageFile);
                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`, formData)
                    .then(res => {
                        updateUserProfile({ photoURL: res.data.data.url })
                            .then(() => {
                                console.log('updated user image')
                                navigate(location.state || '/');
                            })
                            .catch(err => console.log(err));
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <p>Register with ZapShift</p>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input w-full" placeholder="Name" />
                    {
                        errors.name?.type === 'required' && <p className="text-red-500">Name is required</p>
                    }
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
                    }
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input w-full" placeholder="Select Your Profile Photo" />
                    {
                        errors.photo?.type === 'required' && <p className="text-red-500">Photo is required</p>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters</p>
                    }
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p className="my-3">
                    Already have a account? <Link to='/login' state={location.state} className="underline">Login</Link>
                </p>
            </form>
            <p className="text-center mb-2 text-xl">OR</p>
            <GoogleLogin />
        </>
    );
}