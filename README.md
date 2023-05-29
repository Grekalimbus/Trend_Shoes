# Online store Trend shoes
<br />

## The project can be run locally
    1. Clone repository
    2. Go to client and server folders and install dependencies with "npm install"
    3. In the folder server run "npm run server"
    4. In the folder client run "npm start"
<br />

## About this project
<br />

## RU
Я начинал разрабатывать этот проект во время прохождения курсов в онлайн школе Result School. На тот момент у меня были минимальные знания о React. Это проект, на котором я многому научился и смог профессионально вырасти. Это проект, в котором я столкнулся с множеством сложностей, проблем, ошибок, благодаря которым я смог вырасти. 
Я каждый раз сталкивася с тем, что предстоит решить какую-то задачу, но у меня не было никакого понимания, как это делать. Я просто начинал в этом копаться и доводил дело до конца. 

## ENG
I started developing this project while taking courses at the online Result School. At that time, I had minimal knowledge of React. This is a project where I learned a lot and was able to grow professionally. This is a project in which I faced a lot of difficulties, problems, mistakes, thanks to which I was able to grow.
Every time I was faced with the fact that I had to solve some problem, but I had no idea how to do it. I just started digging into this and brought case to the end.
<br />

## Technologies I learned while working on this project
    RactJS
    Redux
    Axios
    FireBase
    NodeJS
    MongoDB
    Postman

## What did I do within this project
    - Used git
    - Created basic and reusable components
    - Worked with hooks from React and created custom hooks
    - Implemented the registration form and validated the forms
    - Implemented a shopping cart
    - Used third party libraries (toast, bootstrap, lodash)
    - Wrote styles and made adaptive layout
    - Refactored a lot of code and fixed bugs
    - Wrote services (auth, user and others)
    - Used HTTP requests
    - Worked with FireBase database
    - Implemented authorization and authentication methods
    - Changed completely backend logic from FireBase to NodeJS
    - Interacted with the MongoDB database
    - Did query tests through Postman
    - Deploy with Docker
<br />

## Presentation
![Image1](https://i.postimg.cc/GtmBPKn0/image.png)
![Image1](https://i.postimg.cc/442nkzTd/portfolio.jpg)
![Image1](https://i.postimg.cc/Hs7M6S7H/image.png)
![Image1](https://i.postimg.cc/D01Xw0h0/image.png)
![Image1](https://i.postimg.cc/XYYpTQrp/image.png)
![Image1](https://i.postimg.cc/BZN3dsHB/image.png)
![Image1](https://i.postimg.cc/SQLFc4gp/image.png)
<br />

# Examples code this application

## [auth.service.js](https://github.com/Grekalimbus/Trend_Shoes/blob/main/client/src/app/services/auth.service.js)
Implemented login, registration and refresh token methods

```js
const httpAuth = axios.create({
    baseURL: config.api + "auth/"
});

const authServices = {
    loginIn: async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post("signInWithPassword", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens({ ...data });
            window.location.reload();
            return data;
        } catch (e) {
            console.log(e);
            if (e.response.data.error.message === "INVALID_PASSWORD") {
                return toast.error("Неверный пароль");
            }
            if (e.response.data.error.message === "EMAIL_NOT_FOUND") {
                return toast.error("Такого email не существует");
            }
        }
    },
    signUp: async ({ email, password }) => {
        const { data } = await httpAuth.post("signUp", {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data });
        window.location.reload();
        return data;
    },
    refreshToken: async () => {
        const refreshToken = getRefreshToken();
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        });
        localStorageService.setTokens(data);
        return data;
    }
};
```
<br />

## Redux 
## [store](https://github.com/Grekalimbus/Trend_Shoes/blob/main/client/src/app/store/createStore.js)

```js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./product";
import userReducer from "./user";
import firmReducer from "./firm";
import userPurchasesReducer from "./userPurchases";
import allPurchasesReducer from "./allPurchases";
import allBasketReducer from "./allBasket";
import basketUserReducer from "./basketUser";

const rootReducer = combineReducers({
    firm: firmReducer,
    user: userReducer,
    product: productReducer,
    userPurchases: userPurchasesReducer,
    allPurchases: allPurchasesReducer,
    allBasket: allBasketReducer,
    basketUser: basketUserReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
```

## [user.js](https://github.com/Grekalimbus/Trend_Shoes/blob/main/client/src/app/store/user.js)

```js
const userSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        userRequested(state) {
            state.isLoading = true;
        },
        userReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
        },
        userRequestFiled(state, actions) {
            state.error = actions.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;
const { userRequested, userReceved, userRequestFiled } = actions;

export const loadUser = () => async (dispatch) => {
    dispatch(userRequested());
    try {
        const data = await userService.getCurrentUser();
        dispatch(userReceved(data));
    } catch (error) {
        dispatch(userRequestFiled(error.message));
    }
};

export const loginIn = (dataForm) => async (dispatch) => {
    dispatch(userRequested());
    const { email, password } = dataForm;
    try {
        const data = await authServices.loginIn({ email, password });
        dispatch(loadUser());        
    } catch (error) {
        dispatch(userRequestFiled(error.message));
    }
};

export const signUp = (dataUserKey) => async (dispatch) => {
    const { email, password } = dataUserKey;
    try {
        const data = await authServices.signUp({ email, password });
        dispatch(loadUser());
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            if (message === "EMAIL_EXISTS") {
                const errorObject = {
                    email: "Пользователь с таким email уже зарегестрирован"
                };
                dispatch(userRequestFiled(errorObject));
                console.log(error);
                throw errorObject;
            }
        }
    }
};

export const getUser = () => (state) => state.user.entities;
export const getErrorPassword = () => (state) => state.user.error;

export default userReducer;
```
<br />

## [Utils function (validator for forms)](https://github.com/Grekalimbus/Trend_Shoes/blob/main/client/src/app/utils/validator.js)

```js
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
```
<br />

## [Reused component (form)](https://github.com/Grekalimbus/Trend_Shoes/blob/main/client/src/app/components/common/form.jsx)

```js
import React from "react";
import PropTypes from "prop-types";

const Form = ({
    name,
    value,
    handleChangeForm,
    styles,
    label,
    error,
    type
}) => {
    return (
        <div className={styles.blockForm}>
            <label htmlFor="user" className={styles.label}>
                {label}
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <input
                type={type}
                name={name}
                value={value}
                className={styles.input}
                onChange={(e) => {
                    handleChangeForm(e);
                }}
            />
        </div>
    );
};
Form.defaultProps = {
    type: "text"
};

Form.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    handleChangeForm: PropTypes.func,
    styles: PropTypes.object,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string
};

export default Form;
```
<br />

# Backend

## [app.js](https://github.com/Grekalimbus/Trend_Shoes/blob/main/server/app.js)

```js
const express = require('express');
const app = express();
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')));
  const indexPath = path.join(__dirname, 'client', 'index.html');
  console.log(chalk.blue(indexPath));
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    // запись о том, что как только открыто соеденение, выполняется колбек
    mongoose.set('strictQuery', true);
    mongoose.connection.once('open', () => {
      initDatabase();
    });

    await mongoose.connect(config.get('mongoUri')); // подключение к mongoDB
    console.log(chalk.green(`Conect MongoDB!!!`));

    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT} ...`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
```
<br />

## [Models for MongoDB](https://github.com/Grekalimbus/Trend_Shoes/blob/main/server/models/Product.js)

```js
const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    firm: { type: String, required: true },
    imgProduct: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', schema);
```
<br />

## [auth.routes.js](https://github.com/Grekalimbus/Trend_Shoes/blob/main/server/routes/auth.routes.js)

```js
const express = require('express');
const User = require('../models/User');
const HistoryPurchases = require('../models/HistoryPurchases');
const Basket = require('../models/Basket');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token.service');
const router = express.Router({ mergeParams: true });
// 1. get data from req (email, password)
// 2. check if user ready exists
// 3. hash password
// 4. create user
// 5. generate tokens

// =========
// register
router.post('/signUp', [
  check('email', 'Некоректный email').isEmail(),
  check('password', 'Минимальная длинна пароля 6 символов').isLength({
    min: 6,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, password } = await req.body; // здесь хранятся данные, которые юзер отправляет методом post

      const exitingUser = await User.findOne({ email });
      if (exitingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12); // шифрование пароля
      const newUser = await User.create({
        ...req.body,
        balance: 10000,
        password: hashedPassword,
      });
      await HistoryPurchases.create({
        user: newUser._id,
        history: [],
      });
      await Basket.create({ user: newUser._id, basket: [] });
      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка, попробуйте позже',
      });
    }
  },
]);

// =========
// loginIn
// 1. validate
// 2. find user (найти пользователя)
// 3. compare hashPassword (сравнить хеш пароль)
// 4. generate token
// 5. return data
router.post('/signInWithPassword', [
  check('email', 'Некоректный email').normalizeEmail().isEmail(),
  check('password', 'Пароль не может быть пустым').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400,
          },
        });
      }
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка, попробуйте позже',
      });
    }
  },
]);

// =========
// refreshToken

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const tokens = await tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
```






