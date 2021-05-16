
//const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const User = require('../models/Users')

const saltRounds = 10;


module.exports.register = async function(request, response) {
    if(!request.body) return response.status(400).send({status: 'error', msg: 'Empty body of request'});
    
    const candidate = await User.findOne({username: request.body.username})
  
    if(candidate){
        return res.status(400).json({message: 'This User already exists'})
    }
  
    const user = new User({ 
        username: request.body.username,
      
       password: request.body.password,
        privileges: "user"})
         // password: bcrypt.hashSync(request.body.password, saltRounds),
    
      await user.save()

       
        response.status(200).send({status: 'success', msg: 'User registered!'});
   
}

module.exports.login = async function(request, response, next) {
    if(!request.body) return response.status(400).send({status: 'error', msg: 'Empty body of request'});
    let password = request.body.password;
    const username = request.body.username;
    const user = await User.findOne({username})
  

    if (user === null) {
        response.status(409).send({status: 'error', msg: 'Incorrect username'});
    } else if (password === user.password) {
        console.log('LOGIN', user);
        const token = jwt.sign({id: user.id}, request.app.get('secretKey'), {expiresIn: '24h'})
        response.status(200).send({status: 'success', msg: 'User logged in', token: token, username: user.username})
    } else {
        response.status(409).send({status: 'error', msg: 'Incorrect password'});
    } 
}

module.exports.verify = function(request, response) {
    console.log('VERIFY', request);
}