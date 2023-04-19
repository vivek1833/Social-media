const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/auth.js');
const User = require('./models/user.js');

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
            const user = new User({
                name: name,
                username: username,
                email: email,
                password: hashpassword,
                cpassword: cpassword,
                profilephoto: "",
                bio: "",
                postcount: 0,
                followercount: 0,
                followingcount: 0,
                posts: [],
            });

            // jwt token
            const token = jwt.sign({ _id: req.body._id }, process.env.SecretKey);

            // add token to database
            await user.save();

            res.status(201).json({
                token: token,
                user: user
            });

        } else {
            res.status(400).json({ error: "Password are not matching" });
        }
    } catch (error) {
        res.status(400).json({ error: "User exists" });
    }
});

app.get("/profile", authenticate, async (req, res) => {
    try {
        const userdetail = await User.findOne({ username: req.user.username });
        const userpost = await User.findOne({ username: req.user.username });

        if (userdetail) {
            res.status(201).json({ userdetail: userdetail, userpost: userpost });
        } else {
            res.status(201).json({ userdetail: null, userpost: null });
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/post", authenticate, async (req, res) => {
    try {
        const { post, caption } = req.body;
        const userpost = await User.findOne({ username: req.user.username });

        userpost.posts = userpost.posts.concat({ post: post, caption: caption, like: 0, comments: [] });
        const postdata = await userpost.save();

        res.status(201).json({ postdata: postdata });
    }
    catch (error) {
        console.log(error.message);
    }
});

app.get("/home", authenticate, async (req, res) => {
    res.status(201).json({ user: req.user });
});

app.get("/getpost/:id", authenticate, async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.user._id })

        const userpost = await User.findOne({ username: user.username });

        const post = userpost.posts.filter((post) => post._id == req.params.id);

        if (post) {
            res.status(201).json({ userpost: post });
        } else {
            res.status(201).json({ userpost: null });
        }

    } catch (error) {
        console.log(error.message);
    }
});

app.get("/getuser/:username", authenticate, async (req, res) => {
    try {
        // find user using regex 
        User.find({ username: { $regex: req.params.username, $options: 'i' } }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(201).json({ users: result });
            }
        }
        );
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/:username", authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (user) {
            res.status(201).json({ user: user });
        } else {
            res.status(201).json({ user: null });
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});
