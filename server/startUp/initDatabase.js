// функция, которая делает всё необходимое для минимального набора информации в БД
// 1. У любого пользователя будет как минимум в БД product & firm (если эти колекции в БД будут пустыми, тогда наше приложение работать не будет)
// 2. Они равны mock данным

// MockData
const productMock = require('../mock/products.json');
const firmMock = require('../mock/firms.json');

// Models
const Product = require('../models/Product');
const Firm = require('../models/Firm');

const chalk = require('chalk');
module.exports = async () => {
  const firms = await Firm.find();
  console.log(chalk.blue('firms', firms));
  if (firms.length !== Object.keys(firmMock).length) {
    await createInitialEntity(Firm, firmMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    Object.keys(data).map(async (item) => {
      try {
        // delete data.item;
        const newItem = new Model({ ...data[item] });
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
