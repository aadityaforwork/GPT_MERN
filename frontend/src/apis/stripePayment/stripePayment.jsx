import axios from "axios";

//Stripe Payment API
export const freeSubscriptionAPI = async () => {
    const response=await axios.post('http://localhost:5000/api/v1/stripe/free-plan',
    {},
    {
      withCredentials:true
    }
    );
    return response?.data;
  };


//Stripe Payment Intent
export const createStripePaymentIntentAPI = async (payment) => {
  console.log(payment);
  const response=await axios.post('http://localhost:5000/api/v1/stripe/checkout',
  {
    amount:Number(payment?.amount),
    subscriptionPlan:payment?.plan
  },
  {
    withCredentials:true
  }
  );
  return response?.data;
};



//Verify Payment
export const verifyPaymentIntentAPI = async (paymentIntentId) => {
  console.log(paymentIntentId);
  const response=await axios.post(`http://localhost:5000/api/v1/stripe/verify-payment/${paymentIntentId}`,
  {},
  {
    withCredentials:true
  }
  );
  return response?.data;
};


