import httpServices from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "users/";
const userService = {
    get: async () => {
        const { data } = await httpServices.get("users.json");
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServices.put(
            `${userEndPoint}${payload.localId}.json`,
            {
                email: payload.email,
                _id: payload.localId
            }
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpServices.get(
            userEndPoint + localStorageService.getUserId() + ".json"
        );
        return data;
    }
};

export default userService;
