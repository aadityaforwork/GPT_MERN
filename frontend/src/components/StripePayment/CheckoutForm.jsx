import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createStripePaymentIntentAPI } from '../../apis/stripePayment/stripePayment';
import StatusMessage from '../Alert/StatusMessage';

const CheckoutForm = () => {
  // Get the payloads
  const params = useParams();
  const [searchParams] = useSearchParams();
  const plan = params.plan;
  const amount = searchParams.get("amount");

  // Initialize mutation
  const mutation = useMutation({
    mutationFn: createStripePaymentIntentAPI,
    onSuccess: async (data) => {
      try {
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret: data.clientSecret,
          confirmParams: {
            return_url: "http://localhost:3000/success"
          }
        });
        if (error) {
          setErrorMessage(error.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  });

  // Stripe configuration
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (elements == null || isProcessing) return;
    setIsProcessing(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }
    try {
      const data = {
        plan,
        amount,
      }
      mutation.mutate(data);
    } catch (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    }
  }

  return (
    <div className='bg-gray-900 h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='w-96 mx-auto my-4 rounded-lg p-6 bg-white shadow-md '>
        <div className='mb-4'>
          <PaymentElement />
        </div>
        {/* Display loading */}
        {mutation.isPending && <StatusMessage type="loading" message="Processing Payment" />}
        {/* Display success */}
        {mutation.isSuccess && <StatusMessage type="success" message="Payment Successful" />}
        {/* Display error */}
        {mutation.isError && <StatusMessage type="error" message={mutation.error?.response?.data?.error} />}
        <button disabled={isProcessing} className='w-full my-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
        {errorMessage && <div className='text-red-500 mt-2'>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default CheckoutForm;
