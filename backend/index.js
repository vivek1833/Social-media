const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/auth.js');
const User = require('./models/user.js');
const UserPost = require('./models/userpost.js');

const app = express();
const conn = process.env.DataBase;
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser())
mongoose.set('strictQuery', false); // to not show warning

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
}).catch((err) => console.log(err.message));

app.use(cors({
    origin: process.env.FrontEnd,
    credentials: true,
}))

app.get("/", (req, res) => {
    res.status(200).send("Server is working");
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const finduser = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, finduser.password);

        if (isMatch) {
            // jwt token
            const token = jwt.sign({ _id: finduser._id }, process.env.SecretKey);

            // add token to database
            finduser.tokens = finduser.tokens.concat({ token: token });
            await finduser.save();

            res.status(201).json({ token: token, user: finduser });
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Invalid Credentials" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, username, email, password, cpassword } = req.body;

        if (password === cpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const user = new User({ name, username, email, password: hashpassword, cpassword });

            // jwt token
            const token = jwt.sign({ _id: req.body._id }, process.env.SecretKey);

            // add token to database
            user.tokens = user.tokens.concat({ token: token });
            await user.save();

            res.status(201).json({
                token: token,
                user: user
            });

        } else {
            res.status(400).json({ error: "Password are not matching" });
        }
    } catch (error) {
        console.log(error);
    }
});

app.get("/profile", authenticate, async (req, res) => {
    res.status(201).json({ user: req.user });
})

app.post("/post", authenticate, async (req, res) => {
    try {
        const { post, caption } = req.body;

        const userpost = await UserPost.findOne({ username: req.user.username });

        if (userpost) {
            userpost.posts = userpost.posts.concat({ post: post, caption: caption, like: 0, comments: [] });
            const postdata = await userpost.save();

            res.status(201).json({ postdata: postdata });
        } else {

            const userpost = new UserPost({
                username: req.user.username,
                posts: [{
                    post: post,
                    caption: caption,
                    like: 0,
                    comments: [],
                }]
            });

            userpost.posts = userpost.posts.concat({ post: post, caption: caption, like: 0, comments: [] });
            const postdata = await userpost.save();

            res.status(201).json({ postdata: postdata });
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});
