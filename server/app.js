const express = require('express');
const app = express();
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

async function start() {
  try {
    // запись о том, что как только открыто соеденение, выполняется колбек
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
