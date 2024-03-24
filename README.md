## Mainstack Assessment - Setup Instructions

### Local Setup

In order to setup this project and avoid running into errors, you need to have **Docker** and **Git** installed

1.  Naviagte into the preferred location of your machine **(preferrably in your $HOME directory)** and clone the project repo with the command `git clone git@github.com:Varsilias/mainstack-assessment.git`
2.  Navigate into the project directory by running the command `cd mainstack-assessment`
3.  Install project dependencies with `npm install` or `yarn install`
4.  For local development, you need to have a `.env` file in the root of the project directory. In your terminal window, navigate to the project directory and create a `.env` with the command `cp .env.example .env`
5.  Fill in the required environment information
6.  Start the MongoDB, Mongo Express (DBMS for Mongo) and the API development server by running `docker compose up`, you can run all the services in the background with `docker compose up -d`
7.  Open your browser and navigate to **http://localhost:8081** to view your database, you also have a choice to use your favourite MongoDB visualization tool to view your database. The Connection string should be: **mongodb://<DB_USER>:<DB_PASSWORD>@localhost:27017/<DB_NAME>?authSource=admin**
    **NB:** DB_USER, DB_PASSWORD and DB_NAME are from the Environment Variables set earlier
8.  If you did everything well, you local development server will be running at **http://locahost:<PORT>**
    **NB:** PORT is from the Environment Variables set earlier
9.  Send a **GET** to **http://locahost:<PORT>/health-check**, you should see this response **"All Systems Up"**
