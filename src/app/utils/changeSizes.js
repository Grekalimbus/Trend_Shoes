const handleChangeQuantityFunc = (
    object,
    target,
    setQuantityObject,
    quantityObject
) => {
    const action = target.innerText;
    if (action === "+") {
        const newArr = quantityObject.map((item) => {
            if (item.sizes === object.sizes) {
                const newObject = {
                    sizes: item.sizes,
                    value: (item.value += 1)
                };
                return newObject;
            }
            return item;
        });
        setQuantityObject(newArr);
    } else if (action === "-") {
        const newArr = quantityObject.map((item) => {
            if (item.sizes === object.sizes) {
                if (item.value !== 0) {
                    const newObject = {
                        sizes: item.sizes,
                        value: (item.value -= 1)
                    };
                    return newObject;
                }
            }
            return item;
        });
        setQuantityObject(newArr);
    }
};

export default handleChangeQuantityFunc;
