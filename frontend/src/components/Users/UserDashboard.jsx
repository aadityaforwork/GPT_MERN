import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileAPI } from "../../apis/user/usersApi";
import StatusMessage from "../Alert/StatusMessage";
const Dashboard = () => {
  //get the user profile
  const { isError, isLoading, data, error } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });
  // console.log({data,isError,isLoading,error});
  //display loading message
  if (isLoading) {
    return <StatusMessage type="loading" message="Loadin please wait.." />;
  }
  //checking error
  else if (isError) {
    return (
      <StatusMessage type="error" message={error?.response?.data?.message} />
    );
  } else {
    return (
      <div className="mx-auto p-4 bg-gray-900 w-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          User Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Name
                </label>
                <p
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="username"
                >
                  {data?.user?.username}
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <p
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="email"
                >
                  {data?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Credit Usage Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Credit Usage</h2>
            <div>
              <p className="mb-4">
                Monthly Credit: {data?.user?.monthlyRequestCount}
              </p>
              <p className="mb-4">Credit Used: {data?.user?.apiRequestCount}</p>
              <p className="mb-4">
                Credit Remaining:{" "}
                {data?.user?.monthlyRequestCount - data?.user?.apiRequestCount}
              </p>
              <p className="mb-4">
                Next Billing Date:{" "}
                <span className=" px-1 font-bold">
                  {data?.user?.trialExpires
                    ? new Date(data?.user?.nextBillingDate).toDateString()
                    : "No billing date"}
                </span>
              </p>
            </div>
          </div>

          {/* Payment and Plans Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Payment & Plans</h2>
            <div>
              <p className="mb-4">
                Current Plan: {data?.user?.subscriptionPlan}
              </p>
              <Link
                to="/plans"
                className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>

          {/* Trial Information Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Trial Information</h2>
            <div>
              <p className="mb-4">
                Trial Status:
                {data?.user?.trialActive ? (
                  <span className=" text-green-500 px-1 font-bold">Active</span>
                ) : (
                  <span className=" text-red-500 px-1 font-bold">Inactive</span>
                )}
              </p>
              <p className="mb-4">
                Expires on: <span className=" font-bold">{new Date(data?.user?.trialExpires).toDateString()}</span>
              </p>
              <Link
                to="/plans"
                className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upgrade to Premium
              </Link>
            </div>
          </div>

          {/* History Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Payment History
            </h2>
            {data?.user?.payments?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {/* Example History Item */}
                {data?.user?.payments?.map((payment) => {
                  return (
                    <li className="py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="mb-2 sm:mb-0">
                          <p className="text-sm font-medium text-indigo-600">
                            {payment?.subscriptionPlan}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(payment?.createdAt).toDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p
                            className={`text-sm font-semibold ${
                              payment?.status === "succeeded"
                                ? "text-green-600"
                                : "text-orange-500"
                            }`}
                          >
                            {payment?.status}
                          </p>
                          <p className="text-sm text-gray-700 ml-4">
                            $ {payment?.amount}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h1>No Payment History</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
