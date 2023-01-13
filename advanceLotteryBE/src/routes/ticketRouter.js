const {Router}=require('express')
const Users = require('../models/users')

const app=Router()


app.get('/ticket', async(req, res) => {
    try{
    const data = await Users.find()
  res.json({
      ticketList: data,
  })
}catch(err){
    console.log(err)
}
})




app.get('/tickets/:ticketno',(req, res)=> {
    console.log(req.params.ticketno)
})

app.post('/tickets',(req, res)=> {
  console.log(req)
})



module.exports=app