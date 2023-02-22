const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const conn = process.env.DataBase;

mongoose.set('strictQuery', false); // to not show warning

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
}).catch((err) => console.log(err.message));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});
