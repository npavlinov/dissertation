This is the code for COM3610 Dissertation Project, authored by Nikolay Lyubomirov and supervised by Professor Hamish Cunnigham.

The project is split between three separate folders, each being its separate node project.

In order to run the code correctly do the following for each of the folders:

# API

1. Copy and rename `config.example.json` to `config.json` from the `config` folder.
2. Change it to whatever settings you have on your machine.
3. Run `npm install` in the root directory of the API folder
4. Run in consecutive order:
   ```
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```
   This will create a test user and some sample data
5. Once 1-4 is complete, in the `/api` directory run `npm run dev`. This will start a local Express server on whatever port you have configured in the `config.json` file. It will also start a WebSockets server, again based on the configuration.

# Dashboard

1. Run `npm install`
2. Run `npm run dev`. This will start a local Next.JS server on port 3000. If the port is in use, any processes can be killed with the following command `kill -9 (lsof -t -i tcp:3000)`, asuming a UNIX based system is used.

# Tests

1. In order for the tests to run correctly, the database must be migrated and seeded by following the steps outlined in the API section.
2. Run `npm install` inside the `/tests` folder
3. From inside the `/tests` folder, run `npm start`
4. Use the GUI to run different integration tests.
