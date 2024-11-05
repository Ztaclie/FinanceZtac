const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = "mongodb+srv://FinanceZtacUser:uawJNho1dg5OwsoA@financeztaccluster.poavj.mongodb.net/?retryWrites=true&w=majority&appName=FinanceZtacCluster"

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('<your-mongo-uri>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
