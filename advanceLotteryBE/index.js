const app = require('express')()
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
// const mongoose = require('mongoose')


//importing db file
const Connect = require('./src/db/connect')

// importing users model
const Users = require('./src/models/users')
const Winner = require('./src/models/winner')


// importing routes
const ticket = require('./src/routes/ticketRouter')
const users = require('./src/routes/userRouter')
const register = require('./src/routes/registerRouter')
const winner = require('./src/routes/winnerRouter')
// using app.use() method to use in index.file
app.use(ticket);
app.use(users);
app.use(register);
app.use(winner);

// const { Schema } = mongoose;

Connect()






//   app.put('/register',async(req, res)=> {
// //req.bodyt

// //task : save it in db not with await Users.create(req.body)
// //we have to update await Users.findOneAndUpdate
  
//   })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})