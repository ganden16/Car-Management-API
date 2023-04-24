'use strict';
const fs = require('fs')
const data = fs.readFileSync('./data/cars.min.json', 'utf-8')
const cars = JSON.parse(data)

const port = process.env.PORT || 3000
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {

		let CarSeeder = []
		cars.forEach(car => {
			CarSeeder.push({
				"created_by": car.created_by,
				"last_updated_by": car.last_updated_by,
				"name": car.name,
				"type": car.type,
				"price": car.price,
				"size": car.size,
				"image": baseUrl + car.image,
				"createdAt": new Date(),
				"updatedAt": new Date()
			})
		});
		await queryInterface.bulkInsert('Cars', CarSeeder)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Cars');
	}
};
