import httpServices from "./http.service";

const userEndPoint = "users/";
const userService = {
    get: async () => {
        const { data } = await httpServices.get("users.json");
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServices.put(
            `${userEndPoint}/${payload.localId}.json`,
            {
                email: payload.email,
                _id: payload.localId
            }
        );
        return data;
    }
};

export default userService;
