import axios from 'axios';

//? Registration
export const registerAPI = async (userData) => {
  const response=await axios.post('http://localhost:5000/api/v1/users/register',
  {
    email:userData?.email,
    password:userData?.password,
    username:userData?.username
  },
  {
    withCredentials:true
  }
  );
  return response?.data;
};

//? Login
export const loginAPI = async (userData) => {
  const response=await axios.post('http://localhost:5000/api/v1/users/login',
  {
    email:userData?.email,
    password:userData?.password,
  },
  {
    withCredentials:true
  }
  );
  return response?.data;
};


//? Cheking Authentication
export const checkUserAuthStatusAPI = async (userData) => {
  const response=await axios.get('http://localhost:5000/api/v1/users/auth-check',
  {
    withCredentials:true
  }
  );
  return response?.data;
};


//? Logout
export const logoutAPI = async (userData) => {
  const response=await axios.post('http://localhost:5000/api/v1/users/logout',
  {},
  {
    withCredentials:true
  }
  );
  return response?.data;
};

//? Profile
export const getUserProfileAPI = async (userData) => {
  const response=await axios.get('http://localhost:5000/api/v1/users/profile',
  {
    withCredentials:true
  }
  );
  return response?.data;
};