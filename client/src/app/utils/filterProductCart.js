const getFilterProductCart = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("storageBasket"));
    const dataSizes = JSON.parse(localStorage.getItem("dataSizes"));
    const filterProductCart = dataLocalStorage.filter((item, index) => {
        return (
            JSON.stringify(item.quantity) !== JSON.stringify(dataSizes[index])
        );
    });
    return filterProductCart;
};

export default getFilterProductCart;
