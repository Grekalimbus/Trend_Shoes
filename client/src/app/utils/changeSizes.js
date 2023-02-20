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
                const copyObject = { ...item };
                const newObject = {
                    sizes: copyObject.sizes,
                    value: (copyObject.value += 1)
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
                    const copyObject = { ...item };
                    const newObject = {
                        sizes: copyObject.sizes,
                        value: (copyObject.value -= 1)
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
