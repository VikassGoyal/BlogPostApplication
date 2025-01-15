const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index'); // Your sequelize instance from db.js
const User = require('./user');
const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW, // Automatically set the current date and time
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW, // Automatically set the current date and time
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,  // This specifies the model to reference
      key: 'id',    // The column in the User table
    },
    allowNull: false,
  }
}, {
  timestamps: true, // This option will enable the automatic setting of createdAt and updatedAt
});
Post.belongsTo(User, { foreignKey: 'userId' });  // Each post belongs to a user
User.hasMany(Post, { foreignKey: 'userId' });
// Export the model for use in other files
module.exports = Post;
