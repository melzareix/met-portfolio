MET Profolio MiniProject
============


## Demo

###### Live Demo
[https://met-portfolio.herokuapp.com/](https://met-portfolio.herokuapp.com/)

---

## Features

---

## Setup
1. Clone this repo to your desktop `git clone https://github.com/melzareix/met-portfolio.git`
2. Run `npm install` to install all the dependencies.
3. Create a MongoDB title `met_portfolio`.
4. Create `.env` file with the following constants:
    - `PORT`, The port number to run the project.
    - `JWT_KEY`, The secret key used to sign JWT Tokens.
    - `DB_URL`, The URL to MongoDB database.
    - `DEBUG_MODE`, SET to 1 to enable debugging middlewares.
    - `SEND_GRID`, Your Send Grid API Key used to set reset password link.

---

## Usage

Run `npm start` to start in **production** mode, `npm run debug` to run using [nodemon](https://nodemon.io/) in debug mode.

---

## Docs
API **V1** Documentation
[https://met-portfolio.restlet.io/](https://met-portfolio.restlet.io/)

---

## License
>You can check out the full license [here](https://github.com/melzareix/met-portfolio/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
