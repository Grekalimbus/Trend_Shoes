const validatorConfig = {
    user: {
        isRequired: { message: "ФИО обязательно для заполнения" },
        isUser: {
            message: "Введине ФИО полностью"
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
    price: {
        isRequired: {
            message: "Цена обязательна для заполнения"
        },
        isNumbers: { message: "Только из цифр" }
    }
};

export default validatorConfig;
