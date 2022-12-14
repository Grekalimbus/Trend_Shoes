function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        switch (validateMethod) {
            case "isRequired":
                if (data.trim() === "") return config.message;
                break;
            default:
                break;
        }
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            errors[fieldName] = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
        }
    }

    return errors;
}
export default validator;
