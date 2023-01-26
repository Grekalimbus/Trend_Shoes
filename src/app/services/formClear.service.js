const clearName = (setData) => {
    setData((prevState) => ({ ...prevState, name: "" }));
};
const clearPrice = (setData) => {
    setData((prevState) => ({ ...prevState, from: "", before: "" }));
};
const clearFirm = (setData) => {
    setData((prevState) => ({ ...prevState, firm: "" }));
};
const clearAll = (setData) => {
    setData({
        name: "",
        from: "",
        before: "",
        firm: ""
    });
};

const formClearServices = {
    clearName,
    clearPrice,
    clearFirm,
    clearAll
};

export default formClearServices;
