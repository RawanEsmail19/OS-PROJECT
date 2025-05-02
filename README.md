# OS-PROJECT
created a server using Express  .
I started running the server on port 3000
I made a connection to a MongoDB database at mongodb://127.0.0.1:27017/todo (in a Docker environment).
I created route GET /todos to show all Tasks in DB , route GET /todos by ID to show the specific task with ID , route POST /todos to add new task ,
route PUT /todos to update with use also ID and route DELETE /todos to delete task .
I built a model called todo using Mongoose to handle data in MongoDB.
I created a todoSchema containing two fields: task (text) and done (boolean).
