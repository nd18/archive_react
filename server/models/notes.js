const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")



class Notes extends Model { }


Notes.init(
      {
            id: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true
            },
            Text: {
                  type: DataTypes.STRING,
                  allowNull: false
            },
            user_id:
            {
                  type: DataTypes.INTEGER,
                  references: { model: 'user', key: 'id' },

            },

      },
      {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'Notes',
      }


);



module.exports = Notes

