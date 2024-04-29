const express = require('express')
const helmet = require("helmet");
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let CORS = require('cors');
require('dotenv').config()
const app = express()
 

app.use(helmet());
const errorHandler = require('./service/error-handler');

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }));

app.use(CORS());
app.use('/quote', require('./controller/quote.controller'));

 
app.get('/', (req, res) => {
    res.send('MagnifiCode ');
})
app.use(errorHandler.errorHandler);

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGOURL );
      
      app.listen(process.env.PORT, () => {
        console.log('Port 2020 running');
      });

    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
connectDB();