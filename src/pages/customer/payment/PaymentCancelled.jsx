import { Link } from "react-router";

export default function PaymentCancelled(){
    return(
        <section>
            <h2>Payment Cancelled</h2>
            <Link to='/dashboard/my-parcels' className="btn btn-accent mt-2">Try Again</Link>
        </section>
    );
}