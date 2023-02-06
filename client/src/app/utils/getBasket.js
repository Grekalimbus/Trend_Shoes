export const getBasketProduct = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("storageBasket"));
    return dataLocalStorage;
};

export const getBasketSizes = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("dataSizes"));
    return dataLocalStorage;
};

const dataBasket = {
    getBasketProduct,
    getBasketSizes
};

export default dataBasket;
