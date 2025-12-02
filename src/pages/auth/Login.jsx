import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../comps/auth/GoogleLogin";

export default function Login() {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = (data) => {
        console.log('ready for submitt', data)
        loginUser(data.email, data.password)
            .then(result => {
                console.log(result);
                navigate(location?.state || '/');
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p>Login with ZapShift</p>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p className="my-3">
                    Dont have a account? <Link to='/register' state={location.state} className="underline">Register</Link>
                </p>
            </form>
            <p className="text-center mb-2 text-xl">OR</p>
            <GoogleLogin />
        </>
    );
}