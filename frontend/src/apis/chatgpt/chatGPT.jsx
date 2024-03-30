import axios from 'axios';

export const generateContentAPI = async (userPrompt) => {
    const reposnse=await axios.post('http://localhost:5000/api/v1/openai/generate',
    {
      prompt:userPrompt,
    },
    {
      withCredentials:true
    }
    );
    return reposnse?.data;
  };