'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Car extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Car.belongsTo(models.User, {as: 'createdBy', foreignKey: 'created_by'})
			Car.belongsTo(models.User, {as: 'lastUpdatedBy', foreignKey: 'last_updated_by'})
			Car.belongsTo(models.User, {as: 'deletedBy', foreignKey: 'deleted_by'})
		}
	}

	Car.init({
		name: DataTypes.STRING,
		type: DataTypes.STRING,
		size: DataTypes.STRING,
		price: DataTypes.INTEGER,
		image: DataTypes.STRING,
		created_by: DataTypes.INTEGER,
		last_updated_by: DataTypes.INTEGER,
		deleted_by: DataTypes.INTEGER,
	}, {
		sequelize,
		paranoid: true,
		modelName: 'Car',
	});
	return Car;
};