const filter = (product, data) => {
    // =======
    const filterName = product.filter((item) => {
        if (data.name !== "") {
            return item.name.toLowerCase().includes(data.name.toLowerCase());
        } else {
            return product;
        }
    });
    // =======
    const filterPrice = filterName.filter((item) => {
        if (data.from !== "" && data.before !== "") {
            return (
                item.price >= Number(data.from) &&
                item.price <= Number(data.before)
            );
        }
        if (data.from === "" && data.before !== "") {
            return item.price <= Number(data.before);
        }
        if (data.from !== "" && data.before === "") {
            return item.price >= Number(data.from);
        }
        if (data.from === "" && data.before === "") {
            return filterName;
        }
        return filterName;
    });
    // =======
    const filterFirm = filterPrice.filter((item) => {
        if (data.firm !== "") {
            return item.firm === data.firm;
        } else {
            return filterPrice;
        }
    });
    return filterFirm;
};

const filterProduct = (product, cardID) => {
    if (product !== null) {
        const filterArr = product.filter((item) => {
            return item.id === cardID;
        });
        return filterArr;
    }
};

const filtersMethod = {
    filter,
    filterProduct
};

export default filtersMethod;
