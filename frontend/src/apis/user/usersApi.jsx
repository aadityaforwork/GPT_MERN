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