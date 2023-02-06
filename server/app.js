const express = require('express');
const app = express();
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get('port') ?? 8080;

async function start() {
  try {
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
