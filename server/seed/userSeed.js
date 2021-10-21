

const sequelize = require('../config/connection');
const { User, Notes } = require('../models');

const userData = require('./userData.json');
const noteData = require('./noteData.json');


const seedUser = async () => {
      await sequelize.sync({ force: true });

      const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
      });
      const notes = await Notes.bulkCreate(noteData, {
            individualHooks: true,
            returning: true,
      })


      process.exit(0);
};

seedUser();

module.exports = seedUser