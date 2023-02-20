import { toast } from "react-toastify";
const handleIncrement = (activeSize, data, changeState, dataSizes) => {
    if (!activeSize) {
        toast.error("Укажите размер");
    }
    if (activeSize) {
        const basketLocalStorage = JSON.parse(
            localStorage.getItem("storageBasket")
        );
        basketLocalStorage.forEach((objectProduct) => {
            if (objectProduct._id === data._id) {
                objectProduct.quantity.forEach((item, index) => {
                    if (
                        JSON.stringify(item) ===
                        JSON.stringify(dataSizes[index])
                    ) {
                        if (item.sizes === activeSize) {
                            toast.info("Размеров больше нет");
                        }
                    } else if (
                        JSON.stringify(item) !==
                        JSON.stringify(dataSizes[index])
                    ) {
                        if (item.sizes === activeSize) {
                            item.value += 1;
                            const stringLocalStorage =
                                JSON.stringify(basketLocalStorage);
                            localStorage.setItem(
                                "storageBasket",
                                stringLocalStorage
                            );
                            toast.success("Товар добавлен");
                            changeState((pervState) => ({
                                ...pervState,
                                quantity: objectProduct.quantity
                            }));
                        }
                    }
                });
            }
        });
    }
};
const handleDecrement = (activeSize, data, changeState) => {
    const parseNullDataSizes = JSON.parse(localStorage.getItem("dataSizes"));
    if (!activeSize) {
        toast.error("Укажите размер");
    }
    if (activeSize) {
        const basketLocalStorage = JSON.parse(
            localStorage.getItem("storageBasket")
        );
        basketLocalStorage.forEach((objectProduct, index) => {
            if (objectProduct._id === data._id) {
                if (
                    JSON.stringify(objectProduct.quantity) !==
                    JSON.stringify(parseNullDataSizes[index])
                ) {
                    objectProduct.quantity.forEach((item) => {
                        if (item.sizes === activeSize && item.value !== 0) {
                            item.value -= 1;
                            const stringLocalStorage =
                                JSON.stringify(basketLocalStorage);
                            localStorage.setItem(
                                "storageBasket",
                                stringLocalStorage
                            );
                            toast.success("Товар удален");
                            changeState((pervState) => ({
                                ...pervState,
                                quantity: objectProduct.quantity
                            }));
                        }
                    });
                    if (
                        JSON.stringify(objectProduct.quantity) ===
                        JSON.stringify(parseNullDataSizes[index])
                    ) {
                        window.location.reload();
                    }
                }
            }
        });
    }
};
const deleteProduct = (data) => {
    const parseNullDataSizes = JSON.parse(localStorage.getItem("dataSizes"));
    const basketLocalStorage = JSON.parse(
        localStorage.getItem("storageBasket")
    );
    basketLocalStorage.forEach((objectProduct, index) => {
        if (objectProduct._id === data._id) {
            objectProduct.quantity = parseNullDataSizes[index];
            const stringLocalStorage = JSON.stringify(basketLocalStorage);
            localStorage.setItem("storageBasket", stringLocalStorage);
            window.location.reload();
        }
    });
};

const servicesBascket = {
    increment: handleIncrement,
    decrement: handleDecrement,
    delete: deleteProduct
};

export default servicesBascket;
