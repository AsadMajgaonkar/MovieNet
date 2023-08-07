require('dotenv').config();
const express = require('express');
const app = express();
require('./startup/db')();
require('./startup/routes')(app);

// if(!process.env.jwtPrivateKey){
//     console.error('key not got');
//     process.exit(1);
// }    

let port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`listening ${port}`)})