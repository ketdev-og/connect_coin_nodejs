require ('dotenv').config();
const cors =require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const createError = require("http-errors");
const db = require('./service/db/sequelize');
const AuthRoute = require('./routes/Auth');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'});
app.use(morgan('combined', {stream:accessLog}));
app.use(cors({
    origin:'*'
}));

app.use('/v1/auth', AuthRoute);


app.get('/', (req, res)=>{
    res.json({
        success:1,
        message:"Api Working"
    })
});

 

(
async () => {
    await db.sequelize.sync()
})();

app.use(async(req,res,next)=>{
    next(createError.NotFound());
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message

        }
    })
});

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server running on port ${process.env.SERVER_PORT}`)
});