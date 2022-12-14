function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        switch (validateMethod) {
            case "isRequired":
                if (data.trim() === "") return config.message;
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                if (!emailRegExp.test(data)) return config.message;
                break;
            }
            case "isPhone": {
                const phoneRegExp = /^\S+\D/g;
                if (phoneRegExp.test(data)) return config.message;
                break;
            }
            case "isUser": {
                let valueSpace = 0;
                for (let i = 0; i <= data.length; i++) {
                    if (data[i] === " ") {
                        valueSpace += 1;
                    }
                }
                if (valueSpace !== 2) return config.message;
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
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
}
export default validator;
