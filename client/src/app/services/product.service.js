import { toast } from "react-toastify";
import httpServices from "./http.service";

const productService = {
    add: async (id, object) => {
        try {
            const data = await httpServices.put(`product/${id}`, object);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    changeQuantity: async (id, array) => {
        try {
            const data = await httpServices.put(
                `product/${id}/quantity`,
                array
            );
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    addFirm: async (id, object) => {
        try {
            const data = await httpServices.put(`firm/${id}`, object);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    remove: async (id) => {
        try {
            const data = await httpServices.put(`product`, id);
            console.log(data);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    changeProduct: async (id, object) => {
        try {
            const data = await httpServices.put(`product/${id}`, object);
        } catch (error) {
            console.log(error);
        }
    }
};

export default productService;
