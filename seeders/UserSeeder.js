'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const data = fs.readFileSync('./data/users.json', 'utf-8')
const users = JSON.parse(data)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		let UserSeeder = []
		users.forEach(user => {
			UserSeeder.push({
				"name": user.name,
				"email": user.email,
				"password": bcrypt.hashSync('password', salt),
				"role": user.role,
				"createdAt": new Date(),
				"updatedAt": new Date()
			})
		});
		await queryInterface.bulkInsert('Users', UserSeeder)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users');
	}
};
