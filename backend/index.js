const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const env = require('dotenv').config();
const app = express();
app.use(express.json())
const port = process.env.PORT || 8000;
const conn = process.env.DataBase;
const User = require('./models/user');

mongoose.set('strictQuery', false); // to not show warning

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
}).catch((err) => console.log(err.message));

app.use(cors({
    origin: "http://localhost:3000",
}))

app.get("/", (req, res) => {
    res.status(200).send("Backend is working");
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const finduser = await User.findOne({ email: email });

        if (finduser) {
            const isMatch = await bcrypt.compare(password, finduser.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            } else {
                const token = jwt.sign({ _id: req.body._id }, process.env.SecretKey);

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });

                res.status(201).json({ message: "User Logged In Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
    }

});

app.post("/register", async (req, res) => {
    try {
        const { name, username, email, password, cpassword } = req.body;

        if (password === cpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const user = new User({ name, username, email, password: hashpassword, cpassword });

            await user.save();

            // jwt token
            const token = jwt.sign({ _id: req.body._id }, process.env.SecretKey);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });

            res.status(201).json({ message: "User Registered Successfully" });

        } else {
            res.status(400).json({ error: "Password are not matching" });
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});
