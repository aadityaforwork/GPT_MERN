import React from "react";
import ReactDOM from "react-dom/client";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query" ;
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./AuthContext/AuthContext";

// Stripe Configuration
const stripePromise = loadStripe("pk_test_51P0ILREs99jfBJmBqrAqXk0iSCwzKWc1g0cgvoqNrVptaICpWlZv5Od9wVPlqsJDLyaDbf6awjokwXhvp6o9TaOi00BoJwWLvW");
const options = {
  mode: "payment",
  currency: "usd",
  amount: 500,
}
const root = ReactDOM.createRoot(document.getElementById("root"));
//React Query Client
const queryClient = new QueryClient();
root.render(
  
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <Elements stripe={stripePromise} options={options}>
    <App />
    </Elements>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
