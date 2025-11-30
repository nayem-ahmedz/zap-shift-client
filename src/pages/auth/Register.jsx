import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../comps/auth/GoogleLogin";

export default function Register() {
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = (data) => {
        console.log('ready for submitt', data);
        registerUser(data.email, data.password)
          .then(result => {
            console.log(result);
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
                    <input type="text" {...register('name', {required: true})} className="input w-full" placeholder="Name" />
                    {
                        errors.name?.type === 'required' && <p className="text-red-500">Name is required</p>
                    }
                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {required: true, minLength: 6})} className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters</p>
                    }
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p className="my-3">
                    Already have a account? <Link to='/login' className="underline">Login</Link>
                </p>
            </form>
            <p className="text-center mb-2 text-xl">OR</p>
            <GoogleLogin />
        </>
    );
}