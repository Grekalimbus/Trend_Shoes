// функция, которая делает всё необходимое для минимального набора информации в БД
// 1. У любого пользователя будет как минимум в БД product & firm (если эти колекции в БД будут пустыми, тогда наше приложение работать не будет)
// 2. Они равны mock данным

// MockData
const productMock = require('../mock/product.json');
const firmMock = require('../mock/firm.json');

// Models
const Product = require('../models/Product');
const Firm = require('../models/Firm');

module.exports = async () => {
  const firms = await Firm.find();
  Object.keys(firms).length;
  if (Object.keys(firms).length !== Object.keys(firmMock).length) {
    await createInitialEntity(Firm, firmMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        const newItem = new Model(data[item]);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
