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
### auth logistic
- enter swagger : `localhost:3030/docs` 

- testing all endpoint


### Installation project with docker

- docker-compose up -t
- open terminal container auth_serivce & logistic_service in docker
- create db `sequelize db:create`
- migrate table `sequelize db:migrate`
- fill the table with dummy data `sequelize db:seed:all`
- open app in browser `localhost:3000/docs` & `localhost:3030/docs` 


### Built with
- Node JS
- Express JS
- Postgres
- Joi Validation
- JWT Auth
- Swagger
