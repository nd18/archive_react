const sequelize = require("../config/connection");

const seeduser = require("./userSeed");
const seednote = require("./noteSeed")




const seedAll = async () => {
      await sequelize.sync({ force: true });
      await seeduser();
      await seednote()
      process.exit(0);
};

seedAll();