function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config, allData) {
        switch (validateMethod) {
            case "isRequired":
                if (data.trim() === "") return config.message;
                break;
            case "isUser": {
                const arrayData = data.split(" ");
                if (arrayData.length < 2 || arrayData[1] === "") {
                    return config.message;
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                if (!emailRegExp.test(data)) return config.message;
                break;
            }
            case "isNumbers": {
                const phoneRegExp = /^\S+\D/g;
                if (phoneRegExp.test(data.replaceAll(" ", ""))) {
                    return config.message;
                }
                break;
            }
            case "isRepeat": {
                if (data !== allData.password) return config.message;
                break;
            }
            case "isID": {
                if (data.length < 8) return config.message;
                break;
            }
            default:
                break;
        }
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod],
                data
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
}
export default validator;
