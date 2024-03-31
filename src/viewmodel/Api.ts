import axios from 'axios';


 export async function fetchToken():Promise<String> {
  const id_no:number = import.meta.env.VITE_ID_NO;
  const password:string = import.meta.env.VITE_PASSWORD;

  try {
    const response = await axios.post('https://training.digimal.uonbi.ac.ke/api/login', {
      id_no,
      password
    });

    console.log('Token:', response.data.token);
    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Token not found in response');
    }
  } catch (error) {
    console.error('Error fetching token:', error);
    console.log(id_no)
    throw error;
  }
}
