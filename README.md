# UberEats

Below are the steps to deploy the code.

Front End

Deploy the clone of the application in the frontend folder. After deploying the code go into the frontend folder and execute the command npm install to install all the dependencies. After that run the command npm run start to start the frontend code.

Backend
Clone the repository's Backend folder "backend" into EC2 instance having node.js installed on it. Open the terminal in the folder "backend". Execute "npm install" to install all the dependencies. Create a database "ubereats-latest" in MySQL database server and execute the SQL dump to generate the schema. Update pool.js file in backend folder with database name and connection details. Update the config.json file in backend folder with frontend server's IP address and port. Execute "node index" or npm start to run the backend server.

Launch the application Open the browser and navigate to Front end server's IP address with Port number (Eg: 127.0.0.1:3000) to find the landing page.

The ports currently used for front end: 3000 The ports currently used for back end: 3080
