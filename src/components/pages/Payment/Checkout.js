import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../Hook/useTitle';

const Checkout = ({ bookings }) => {
    useTitle('Checkout');
    const { yourname, youremail, productprice, _id, bookingId } = bookings;
    // console.log(productprice);
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://listit-classified-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                // authorization: `bearer ${localStorage.getItem('listit-classified')}`
            },
            body: JSON.stringify({ productprice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [productprice]);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {

            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: yourname,
                        email: youremail,
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            // console.log('card info', card);
            // store paymentinfo in the database

            const payment = {
                productprice,
                transactionId: paymentIntent.id,
                youremail,
                bookingsId: _id,
                bookingId,

            };
            // console.log(payment);
            fetch('https://listit-classified-server.vercel.app/payments', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    // authorization: `bearer ${localStorage.getItem('Access-Token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data.result);
                    if (data.result.insertedId) {
                        setSuccess('Congrats! You payment is completed');
                        setTransactionId(paymentIntent.id);
                        toast.success('Congrats! You payment is completed');
                    }
                    // fetch('https://listit-classified-server.vercel.app/payment', {
                    //     method: 'PUT',
                    //     headers: {
                    //         'content-type': 'application/json',
                    //         // authorization: `bearer ${localStorage.getItem('Access-Token')}`
                    //     },
                    //     body: JSON.stringify(payment)
                    // })
                    //     .then(res => res.json())
                    //     .then(data => {
                    //         console.log(data.result.insertedId);
                    //     });
                });
        }
        setProcessing(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-5'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p>{success}</p>
                    <p>Your transaction Id: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default Checkout;