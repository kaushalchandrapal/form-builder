const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("formbuilder", "kaushalchandrapal", "1234", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
