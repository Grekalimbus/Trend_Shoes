import { toast } from "react-toastify";
import httpServices from "./http.service";

const productService = {
    add: async (id, object) => {
        try {
            const data = await httpServices.put(`product/${id}.json`, object);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    changeQuantity: async (id, array) => {
        try {
            const data = await httpServices.put(
                `product/${id}/quantity.json`,
                array
            );
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    addFirm: async (id, object) => {
        try {
            const data = await httpServices.put(`firm/${id}.json`, object);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    remove: async (object) => {
        try {
            const data = await httpServices.put(`product.json`, object);
            console.log(data);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    changeProduct: async (id, object) => {
        try {
            const data = await httpServices.put(`product/${id}.json`, object);
        } catch (error) {
            console.log(error);
        }
    }
};

export default productService;
