const User = require('./user');
const Notes = require('./notes');

User.hasMany(Notes, {
      foreignKey: 'user_id',
      // onDelete: 'CASCADE'
});

Notes.belongsTo(User, {
      foreignKey: 'user_id'
});

module.exports = { User, Notes };