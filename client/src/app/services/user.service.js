import httpServices from "./http.service";
import localStorageService from "./localStorage.service";
import config from "../../config.json";

const userEndPoint = config.api + "user/";
const userService = {
    get: async () => {
        const { data } = await httpServices.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServices.put(`${userEndPoint}`, {
            email: payload.email,
            _id: payload.localId,
            balance: 10000
        });
        return data;
    },
    getCurrentUser: async () => {
        // const accessToken = localStorageService.getAccessToken();
        const { data } = await httpServices.get(
            userEndPoint + localStorageService.getUserId()
        );
        return data;
    }
};

export default userService;
