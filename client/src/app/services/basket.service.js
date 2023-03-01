import { toast } from "react-toastify";

const addInitialItemBasket = async (
    activeSize,
    data,
    changeState,
    dataSizes
) => {
    console.log("activeSize", activeSize);
    console.log("data", data);
    // console.log("setData", changeState);
    console.log("dataSizes", dataSizes);
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

export const basketService = {
    addInitialItemBasket,
    handleIncrement,
    handleDecrement
};
