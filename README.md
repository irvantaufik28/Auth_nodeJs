### Installation

Installation project - manual

- clone project `https://github.com/irvantaufik28/lolipad_test_backend.git`
- open directory folder auth_service & logistic_service
- add node modules `npm install`
- rename file .env.example to .env
- configuration db in file .env
- create db `sequelize db:create`
- migrate table `sequelize db:migrate`
- fill the table with dummy data `sequelize db:seed:all`
- npm run start-dev
- test each endpoint in swagger

### auth service
- enter swagger : `localhost:3000/docs` 
- testing all endpoint
### logistic
- enter swagger : `localhost:3030/docs` 

- testing all endpoint

### Run Unit Test Jest
-npm run test



### Built with
- Node JS
- Express JS
- Postgres
- Joi Validation
- JWT Auth
- Swagger

