module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName:  DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
    birthdate: DataTypes.INTEGER
  },
    // his is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          User.hasMany(models.Previous, {
            onDelete: "cascade"
          });
        }
      }
    });
  return User;
};