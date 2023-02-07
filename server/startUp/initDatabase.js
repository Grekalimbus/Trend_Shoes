// функция, которая делает всё необходимое для минимального набора информации в БД
// 1. У любого пользователя будет как минимум в БД product & firm (если эти колекции в БД будут пустыми, тогда наше приложение работать не будет)
// 2. Они равны mock данным

// MockData
const productMock = require('../mock/products.json');
const firmMock = require('../mock/firms.json');

// Models
// Нужны для того, чтобы с помощью их мы могли взаимодествовать с базой данных
const Product = require('../models/Product');
const Firm = require('../models/Firm');
const chalk = require('chalk');

module.exports = async () => {
  const firms = await Firm.find(); // данные, которые мы смотрим в базе данных
  // console.log(chalk.blue());
  if (firms.length !== Object.keys(firmMock).length) {
    await createInitialEntity(Firm, firmMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    Object.keys(data).map(async (item) => {
      try {
        const newObject = { ...firmMock[item] };
        const newItem = new Model(newObject);
        console.log(chalk.blue(newObject));
        await newItem.save();
        return item;
      } catch (e) {
        return e;
      }
    })
  );
}
