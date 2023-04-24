'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Cars', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			type: {
				type: Sequelize.STRING
			},
			size: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.INTEGER
			},
			image: {
				type: Sequelize.STRING
			},
			created_by: {
				type: Sequelize.INTEGER
			},
			last_updated_by: {
				type: Sequelize.INTEGER
			},
			deleted_by: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Cars');
	}
};