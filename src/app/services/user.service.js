import httpServices from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "users/";
const userService = {
    get: async () => {
        const { data } = await httpServices.get("users.json");
        return data;
    },
    create: async (payload) => {
        const accessToken = localStorageService.getAccessToken();
        const { data } = await httpServices.put(
            `${userEndPoint}${payload.localId}.json?auth=${accessToken}`,
            {
                email: payload.email,
                _id: payload.localId,
                balance: 10000
            }
        );
        return data;
    },
    getCurrentUser: async () => {
        const accessToken = localStorageService.getAccessToken();
        const { data } = await httpServices.get(
            userEndPoint +
                localStorageService.getUserId() +
                `.json?auth=${accessToken}`
        );
        console.log(data);
        return data;
    }
};

export default userService;
