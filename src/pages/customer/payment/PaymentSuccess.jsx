import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../hooks/useAxios";

export default function PaymentSuccess(){
    const [ searchParams, setSearchParams ] = useSearchParams();
    const axiosSecure = useAxios();
    const [ paymentInfo, setPaymentInfo ] = useState({});
    useEffect(() => {
        axiosSecure.patch(`/payment-success?session_id=${searchParams.get('session_id')}`)
          .then(res => {
            console.log(res.data);
            setPaymentInfo({
                trackingId: res.data.trackingId
            });
          });
    }, [searchParams]);
    return(
        <section>
            <h2>Payment Success</h2>
            <p>Your tracking id is {paymentInfo?.trackingId}</p>
        </section>
    );
}