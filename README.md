# Binar Chapter 5 - Car Management API

<br><br>

## Description Project
This project is Car Management API. It consists of 3 types of endpoints, namely authentication, car management, and admin management. Please make sure the database to be used must be postgresql.

<br><br>

## Installation

  #### 1. Clone Repository
  #### 2. Install All Dependencies
   ```sh
   npm install
   ```
 #### 3. Setup your database according to the configuration file located in config/config.json, must be use postgresql

 #### 4. Run script, examples :
a. create new database
   ```sh
   npm run db:create
   ```
b. migrate all tables
   ```sh
   npm run db:migrate
   ```
c. run all seeders, these are includes all the seeders needed on the tables
   ```sh
   npm run db:seed
   ```
d. for other scripts, please check the package.json file

#### 5. (Optional) Create an .env file by copy and rename file .env.example, then provide a variable value for secret_key

<br><br>

## Endpoint
### a. Authentication
#### 1. Register (POST) = http://base_url/register
#### 2. Login (POST) = http://base_url/login
#### 3. Update Profile (PUT) = http://base_url/profile
#### 4. Logout (DELETE) = http://base_url/logout
#### 5. Me (GET) = http://base_url/me

<br><br>

### b. Car
#### 1. Get All Cars (GET) = http://base_url/api/car
#### 2. Show Car (GET) = http://base_url/api/car/:id
#### 3. Add Car (POST) = http://base_url/api/car
#### 4. Update Car (PUT) = http://base_url/api/car/:id
#### 5. Delete Car (DELETE) = http://base_url/api/car/:id

<br><br>

### c. Admin
#### 1. Get All Admin (GET) = http://base_url/api/admin
#### 2. Show Admin (GET) = http://base_url/api/admin/:id
#### 3. Add Admin (POST) = http://base_url/api/admin
#### 4. Delete Admin (DELETE) = http://base_url/api/admin/:id

<br><br>

## Documentation
[view documentation](https://documenter.getpostman.com/view/19885257/2s93Y5NzbM#181dbe06-90d0-4a27-98e4-2e1343fd4b65)

