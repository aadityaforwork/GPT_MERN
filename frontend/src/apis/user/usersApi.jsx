import axios from 'axios';

//? Registration
export const registerAPI = async (userData) => {
  const reposnse=await axios.post('http://localhost:5000/api/v1/users/register',
  {
    email:userData?.email,
    password:userData?.password,
    username:userData?.username
  },
  {
    withCredentials:true
  }
  );
  return reposnse?.data;
};

//? Login
export const loginAPI = async (userData) => {
  const reposnse=await axios.post('http://localhost:5000/api/v1/users/login',
  {
    email:userData?.email,
    password:userData?.password,
  },
  {
    withCredentials:true
  }
  );
  return reposnse?.data;
};


//? Cheking Authentication
export const checkUserAuthStatusAPI = async (userData) => {
  const reposnse=await axios.get('http://localhost:5000/api/v1/users/auth-check',
  {
    withCredentials:true
  }
  );
  return reposnse?.data;
};


//? Logout
export const logoutAPI = async (userData) => {
  const reposnse=await axios.post('http://localhost:5000/api/v1/users/logout',
  {},
  {
    withCredentials:true
  }
  );
  return reposnse?.data;
};