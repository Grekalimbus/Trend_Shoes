const validatorConfig = {
    user: {
        isRequired: { message: "Обязательно для заполнения" },
        isUser: {
            message: "Данные не корректны"
        }
    },
    phone: {
        isRequired: { message: "Номер телефона обязателен для заполнения" },
        isNumbers: { message: "Номер должен состоять только из цифр" }
    },
    email: {
        isRequired: { message: "@mail обязательно для заполнения" },
        isEmail: { message: "Почта указана не верно" }
    },
    telegram: {
        isRequired: { message: "telegram обязательно для заполнения" }
    },
    adress: {
        isRequired: { message: "Адресс обязательно для заполнения" }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        }
    },
    repeatPassword: {
        isRequired: {
            message: "Обязательно для заполнения"
        },
        isRepeat: {
            message: "Пороли должны совподать"
        }
    },
    name: {
        isRequired: {
            message: "Обязательно для заполнения"
        }
    },
    url1: {
        isRequired: {
            message: "Обязателено для заполнения"
        }
    },
    url2: {
        isRequired: {
            message: "Обязателено для заполнения"
        }
    },
    price: {
        isRequired: {
            message: "Цена обязательна для заполнения"
        },
        isNumbers: { message: "Только из цифр" }
    },
    id: {
        isRequired: {
            message: "Обязательно для заполнения"
        },
        isID: {
            message: "ID должен состояить минимум из 8 символов"
        }
    },
    firm: {
        isRequired: {
            message: "Обязательно для заполнения"
        }
    }
};

export default validatorConfig;
