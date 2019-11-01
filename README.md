# Hangry! Serving up restaurants when you need them most
Serving up restaurants when you need them most.

When hungry, I never seem to remember the list of restauratns I am excited about trying so I eat at the same places far too often. 

Hangry! is a web application designed to serve up saved restaurants to store and organize a user’s restaurants for immediate retrieval when you are too hungry to think straight. Leveraging Google’s places api, users can view details, save, and categorize restaurants. When user adds a restaurant, the card populates with additional info about the location and the user can add their own notes to keep track of their personal experience with that restaurant.   

## Built With

React.js, Redux, Redux-saga, Node.js, Express, PostgreSQL, Nodemon, SweetAlert2, Passport, Google Places API

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Getting Started

Set up your postgreSQL databse with a new databse called 'prime_app'.
Create the tables listed in the database.sql file.

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

    You will also need to aquire a Google API key. You can set up an account through [Google Cloud Platform](https://cloud.google.com/). The API key needs to be set up for Maps JavaScript API as well as Places API.

    Add your API key to your .env file:
    ```
    REACT_APP_API_KEY="your API key here"
    ```
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

### Completed Features

- [x] user login
- [x] user can create a new collection to store retaurants
- [x] user can create a new restaurant with the search help of Google Places Autocomplete 
- [x] user can update their notes and collection for each restaurant
- [x] user can view saved restaurant including user notes and Google Data about that restaurant
- [x] user can delete notes and full restaurants


### Next Steps
- [] users can share restaurants between users through application 


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`



## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Author
* Naomi Price

## Acknowledgements
* Thanks to my instructors at Prime as well as my fellow classmates. I could not have accomplished this with out you!