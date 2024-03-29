import { toast } from "react-toastify";
import httpServices from "./http.service";

const productService = {
    add: async (object) => {
        try {
            const data = await httpServices.patch(`product/add`, object);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    changeQuantity: async (id, array) => {
        try {
            const data = await httpServices.patch(
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
            const data = await httpServices.patch(`firm`, object);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    },
    remove: async (id) => {
        try {
            const data = await httpServices.delete(`product/${id.id}`, id);
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
