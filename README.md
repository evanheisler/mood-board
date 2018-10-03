# Proji

The Proji dashboard allows teams to see at-a-glance how certain groups are feeling about a project. And what better way to express feeling than in the parlance of our times — the emoji.

## About

**Database**: PostgreSQL

**API**: Express.js + Sequelize.js

**Authentication**: Auth0

**Hosting**: Heroku

**Client-side**: React (create-react-app)

## Getting Started

1. clone the directory
2. `yarn && cd client yarn` to install dependencies
3. `cp .env.example .env` and update the database URI you'd like to use.
4. Repeat for the `.env` in the client. You will need to create an app on [Auth0](https://auth0.com/) to collect this information.
5. `cp config/config.js.example config/config.js` and enter database details. This config is generated by Sequelize.js and will be used to run migrations, create models, etc.
6. `sequelize db:migrate` to init the database tables.
7. `yarn start` from root to start the server and client app in parallel using `npm-run-all`

## Configuration

While this app is currently configured to run on Heroku it is not necessary. If you build locally, your env vars will be set. If you build on the server, you will need a way to create or set vars in that environment.

Heroku handles the build on the server for us with a simple npm script, `heroku-postbuild`. However, this also means that without a `.env` file present at the time of the build, our Node process variables are not set.

Any variables set in a `.env` file must also exist in your Heroku app under "Settings > Config Vars".

### Deployment

If using Heroku, create your app there and follow the instructions to log into the toolbelt, connect the app to the repo and set the remote. You will also need to create `config` variables for anything found in `client/.env`.

If you've setup your env variables, migrations should be run automatically. However, if you need to run them manually, you can run

```
$ heroku run bash
$ sequelize db:migrate
```

Heroku deploy:

```javascript
$ git push heroku master
```

## License

[MIT](https://github.com/evanheisler/proji/blob/master/LICENSE)
