import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config.json";

axios.defaults.baseURL = config.api;
axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response < 500;
        if (!expectedErrors) {
            if (error.message === "Network Error") {
                console.log(error);
            }
            if (
                error.message === "Request failed with status code 400" ||
                error.code === 400
            ) {
                toast.error("Пользователь с таким email уже зарегестрирован");
            } else {
                toast.warning(error.message);
            }
        }
        return Promise.reject(error);
    }
);

const httpServices = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpServices;
