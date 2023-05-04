const express = require('express')
const router = require('./routes')
const {config} = require('dotenv')
config({path: './.env'});

const app = express()
const port = process.env.PORT || 5000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})

