The `Frontend` folder contains the Angular Frontend for the Task Management Application. To run application, run `npm install` within the folder to install all required dependencies and then use the command `npm run start` to run the application. Application is set to run on localhost at port 4200.

The `Backend` folder contains the NodeJS Backend for the Task Management Application. To run the backend api, run `npm install` within the folder to install all required dependencies and then use the command `node app.js` to run the api. API is set to run on localhost at port 3000.

The Database is setup using MongoDB and the app is already pointed to the DB

Currently 2 test users exist for the application:
	- An admin user with login credentials as `admin@admin.com` and `AdminPassword`
	- A regular user with login credentials as `user@user.com` and `UserPassword`