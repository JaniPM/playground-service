/** 
* Either run the this file by passing to mongo shell
* mongo init-mongo-cluster.js 
* or run withing mongo shell with command
* load("init-mongo-cluster.js")
*/ 

db = (new Mongo('localhost:27017')).getDB('playground_db')

config = {
  "_id" : "playground-mongo-set",
  "members": [
    {"_id": 0, "host": "mongodb:27017"},
    {"_id": 1, "host": "mongodb2:27017"},
    {"_id": 2, "host" : "mongodb3:27017"}
  ]
}
