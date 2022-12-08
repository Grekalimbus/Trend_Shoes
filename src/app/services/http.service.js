import axios from 'axios';

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response < 500;
    if (!expectedErrors) {
      console.log('UnexpectedErrors');
    }
    return Promise.reject(error);
  }
);

const httpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpServices;
