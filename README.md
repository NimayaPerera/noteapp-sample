
# NoteApp BackEnd Api Project

This project focus on handling the backend functionalities of simple CRUD applications.



## Installation

 Step 01 - Install node.js
 
```bash
npm install 

```

 Step 02 - Install express.js mysql and cors
 ```bash
npm install express mysql cors --save

```
Step 02 - Install wamp server or xamp server 

 Step 03 - Login to phpMyAdmin 
 
 Step 04 - Create the Database and The table .  Sample attributes used in this project are
(`userId`, `noteTitle`, `noteBody`, `archiveFlag`, `dateTime`, `ID`)

Step 05 - Change the `db.config.js`file inside the `config` folder with the relevant credentials

Step 06 - Install nodemon 

```bash
npm install --global nodemon

```
Run the project

```bash
node server.js

```
if the configuratins are correct it will display the following messages in the console 
```bash
"Server is running on port 3002"
"Successfully connected to the database."
```
**The port number can be changed by editing the `server.js ` file.

## Screenshots
### structure of the sample notes table
![App Screenshot](https://github.com/NimayaPerera/noteapp-sample/blob/main/Screenshots/db%20view.PNG?raw=true)

### Sample data of the table
![App Screenshot](https://github.com/NimayaPerera/noteapp-sample/blob/main/Screenshots/sample%20table.PNG?raw=true)


## Implemented APIs
### Save a new note
#### Request
```bash
http://localhost:3002/api/notes/
```
#### Request body
```bash
{
    "userId" : 10,
    "noteTitle" :" title-10",
    "noteBody" : "body-10",
    "archiveFlag" : 0,
    "dateTime" : "2022-05-14 00: 28: 17"
}
```
#### Response
```bash
 "message": "Note was Created Successfully!"
```

### Get all saved notes of a specific User
#### Request
```bash
http://localhost:3002/api/notes/1
```
#### Response
```bash
Data rows of the table where userId = 1 is displayed as a json object
```

### Get all saved non-archived notes of a specific User
#### Request
```bash
http://localhost:3002/api/notes/unArchivedList/1
```
#### Response
```bash
Data rows of the table where userId = 1 and non archived are displayed as a json object
```

### Get all saved archived notes of a specific User
#### Request
```bash
http://localhost:3002/api/notes/archivedList/1
```
#### Response
```bash
Data rows of the table where userId = 1 and archived are displayed as a json object
```

### Update a previosuly saved Note 
#### Request
```bash
http://localhost:3002/api/notes/14
```
#### Request body
```bash
{
    "userId" : 10,
    "noteTitle" :" title-08",
    "noteBody" : "body-08 new line added",
    "archiveFlag" : 0,
    "dateTime" : "2022-05-14 00: 28: 17"
}
```

#### Response
```bash
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 1,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 1",
    "protocol41": true,
    "changedRows": 1
}
```

### Archive a previously saved note 
#### Request
```bash
http://localhost:3002/api/notes/archive/3
```
#### Request body
```bash
{}
```

#### Response
```bash
{
    "message": "Note was archived successfully!"
}
```
### Unarchive a previously archived note 
#### Request
```bash
http://localhost:3002/api/notes/unarchive/2
```
#### Request body
```bash
{}
```

#### Response
```bash
{
     "message": "Note was unarchived successfully!"
}
```
### Delete a saved note
#### Request
```bash
http://localhost:3002/api/notes/2
```

#### Response
```bash
{
    "message": "Note was deleted successfully!"
}
```












## Documentation

### Displaying Notes

when the app is opned then it will call the 
Get all saved non-archived notes of a specific User API 
with the URL 

```bash
http://localhost:3002/api/notes/unArchivedList/:id

```
#### Conditions

- The userId of the logged user should be passed from the Front-End to the URL 


 | Parameter | Type     | Description                       |
 | :-------- | :------- | :-------------------------------- |
 | `id`      | `int` | Id of the user (userId) |



### Saving a Note

when a user fill all the fields of the note in the UI and clicked the save this URL will
work

```bash
http://localhost:3002/api/notes/
```
#### Conditions

- The request body should have following data model
```bash
{
    "userId" 
    "noteTitle" 
    "noteBody" 
    "archiveFlag" 
    "dateTime" 
}
```
- The userId should be greater than 0 and it is also mandotory
- when saving if the user decides to archive then the `archiveFlag` should be '1'.
    if not the databse will take `archiveFlag` as '0' default.


### Update a Note

when a user change the fields of the note in the UI and clicked the update this URL will
work

```bash
http://localhost:3002/api/notes/:id
```
- Here the ID of the specific note should be passed to the URL 
    (The ID that acts as a unique key to each note in the database table)
#### Conditions

- The request body should have following data model
```bash
{
    "userId" 
    "noteTitle" 
    "noteBody" 
    "archiveFlag" 
    "dateTime" 
}
```

- In the request body the updated fields and the other fields all these together should pass as a JSON object 
    (similar to passing a data object in save function)

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | Id of the note |

### Delete a Note

when a user delete a note this URL will be called

```bash
http://localhost:3002/api/notes/:id
```
- Here the ID of the specific note should be passed to the URL 
    (The ID that acts as a unique key to each note in the database table)

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | Id of the note |

### Archive a Note

when a user archives a saved note this URL will be called

```bash
http://localhost:3002/api/notes/archive/:id
```
- Here the ID of the specific note should be passed to the URL 
    (The ID that acts as a unique key to each note in the database table)
- When the ID is passed then it will set the `archiveFlag` to '1'  in the table of the database
#### Conditions

- The request body should pass an empty object
```bash
{}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | Id of the note |


### Unarchive a Note

when a user unarchives an archived note this URL will be called

```bash
http://localhost:3002/api/notes/unarchive/:id
```
- Here the ID of the specific note should be passed to the URL 
    (The ID that acts as a unique key to each note in the database table)
- When the ID is passed then it will set the `archiveFlag` to '0'  in the table of the database
#### Conditions

- The request body should pass an empty object
```bash
{}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | Id of the note |

### Get a List of archived  Notes

This will display the archved notes of the user

```bash
http://localhost:3002/api/notes/archivedList/:id
```
- Here the userId of the specific user should be passed as the `id`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | Id of the user (userId) |

### Get a List of Unarchived  Notes

This section is same as the `Displaying Notes`.kindly Refer that section

## Technologies Used 

- Node.js
- Express.js
- MySQL

I decided to use this stack beacuse of the easy learning curve and large community available on handling issues .
i have previous experience with MySQL after considering all these reasons and 
due to the time limitataion i thought these technnologies will be the best fit for this code challenge.


## Further Implementations that i would love to try

- Implementing Back-End validations
- Provide a Pin a note Feature
- Provide uploading images and voice recordings inside a note



## References

Blog Resources - 

https://blog.logrocket.com/build-rest-api-node-express-mysql/

https://www.bezkoder.com/node-js-rest-api-express-mysql/

YouTube Resources - 

https://www.youtube.com/watch?v=pKd0Rpw7O48

https://www.youtube.com/watch?v=EN6Dx22cPRI



