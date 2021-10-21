const sequelize = require('../config/connection');
const { Notes } = require('../models');

const noteData = require('./noteData.json');


const seedDatabase = async () => {
      await sequelize.sync();

      const note = await Notes.bulkCreate(noteData, {
            individualHooks: true,
            returning: true,
      });


      process.exit(0);
};

seedDatabase();

module.exports = seedDatabase