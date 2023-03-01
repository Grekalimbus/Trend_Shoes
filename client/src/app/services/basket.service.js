import { toast } from "react-toastify";

const addInitialItemBasket = async (activeSize) => {
    if (!activeSize) {
        toast.error("Укажите размер");
    }
};

const handleIncrement = async (activeSize) => {
    if (!activeSize) {
        toast.error("Укажите размер");
    }
};

const handleDecrement = async (activeSize) => {
    if (!activeSize) {
        toast.error("Укажите размер");
    }
};
