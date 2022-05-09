const express = require("express")

const apiRoute = require('./routes/auth')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const app = express()

PORT ="8080"


app.get('/api/users',(req,res) =>{
    res.send("JWT connected")
})

app.use(express.json())
app.use('/api/users',apiRoute)


dotenv.config()

app.listen(PORT ,() => console.log(`server is running at "http://localhost:${PORT}`))

mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser:true})
    .then(() => {
         console.log("connected to DB")
    }).catch(error => console.log(error))





//const cors = require('cors')

//const authRoute = require("./routes/auth")





