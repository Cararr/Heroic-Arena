# Heroic Arena

![Heroic Arena](https://lekturaobowiazkowa.pl/wp-content/uploads/2018/02/ksiazki-fantasy.jpg)
Visit and play the [Heroic Arena](https://heroic-arena.herokuapp.com/)!

## Goal of creating this app

The purpose of this app was to practice my knowledge of React and Node gained through [Codecademy](https://www.codecademy.com/learn).
This is my first full stack (**React, Node with Express, sqlite**) app. **Update:** Refactored all class components to function components with using of React's hooks.

## About app

It's a simple "game" where players (1-4) chooses a Hero (each Hero is linked to a World and has unique name, description, images and power level). In the next phase all choosen Heroe's appear on the Arena where after 10 secound only one is left. The last standing Hero is the winner.

## Interact with Database

I used simple sqlite DB for backend with four tables: Worlds, Heroes and Users. You can interact with it using the Admin Panel (Manage database option in the Welcome Page). Next you will be asked to submit Your login and password (You can create new one or just type _Test_ and _12345_). From this place You can do everything with Heroes and Worlds tables, including creating new, editing and deleting existing records. I have tried to make it intuitive, You should get a response if for some reasons (missing required informations etc.) you can not make any changes.

## Deployment

Both frontend and backend are deployed using [Heroku](https://www.heroku.com/home).

### Running Heroic Arena on Your machine

`npm install`

`npm run start`

App will run on port 3000.

---

> _Visit my [Github](https://github.com/Cararr) account for more or contact me at cararr@tlen.pl!_
