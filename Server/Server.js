const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const users = require('./routes/users.js');
const notes = require('./routes/notes.js');
const server = express();
const mongoose = require('mongoose')

server.set('secretKey', 'nodeRestApi');

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api', validateUser, notes);
server.use('/users', users);

server.use((request, response) => { response.status(404).send({}) });



function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.status(401).send({status:"error", message: err.message, data: null});
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
}

async function start() {
  try{
    await mongoose.connect("mongodb+srv://romakuhny:mfp2115120@cluster0.mijfd.mongodb.net/Notes?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   })
   server.listen(5000, () => console.log(`Server has been started on port ${5000}...`))
  }catch(e){
     console.log('Server Error', e.message)
      process.exit(1)
  }
}

start()