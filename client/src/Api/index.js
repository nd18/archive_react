import axios from 'axios';
import Cookies from 'js-cookie';


export const postApiRequest = async (url, data) => {
  return await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get('idToken')}`,
    }
  });
};

export const getApiRequest = async (url) => {
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get('idToken')}`,
    }
  });
};
