const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const cloudinary = require('cloudinary');
const multer = require('multer');
const env = require('dotenv').config();
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/auth.js');
const User = require('./models/user.js');
const Post = require('./models/post.js');

const app = express();
const conn = process.env.DataBase;
const port = 8000 || process.env.PORT;

// cors
app.use(cors({
    origin: process.env.FrontEnd,
    credentials: true,
}));

cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.CloudKey,
    api_secret: process.env.CloudSecret
});

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
mongoose.set('strictQuery', false); // not show warning

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
}).catch((err) => console.log(err.message));

// home page, get every user posts
app.get("/home", authenticate, async (req, res) => {
    try {
        const posts = await Post.find({});
        posts.reverse();
        res.status(201).json({ posts: posts, user: req.user });

    } catch (error) {
        console.log(error.message);
    }
});

// Profile Page
app.get("/profile", authenticate, async (req, res) => {
    try {
        const userdetail = await User.findOne({ username: req.user.username });
        const userpost = await Post.find({ username: req.user.username });

        if (userdetail) {
            res.status(201).json({ userdetail: userdetail, userpost: userpost.reverse() });
        } else {
            res.status(201).json({ userdetail: null, userpost: null });
        }
    } catch (error) {
        console.log(error.message);
    }
});

// Post user post using multer
app.post("/post", authenticate, upload, async (req, res) => {
    try {
        const { caption } = req.body;
        const uploadimg = await cloudinary.uploader.upload(req.file.path);

        const newpost = new Post({
            username: req.user.username,
            name: req.user.name,
            profilephoto: req.user.profilephoto,
            post: uploadimg.secure_url,
            caption: caption,
            likes: [],
            comments: [],
        });

        const user = await User.findOne({ username: req.user.username });
        user.postcount = user.postcount + 1;
        await user.save();
        await newpost.save();

        res.status(201).json({ message: "Post added" });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const finduser = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, finduser.password);

        if (isMatch) {
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

// Register user 
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
            });

            const token = jwt.sign({ _id: req.body._id }, process.env.SecretKey);
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

// get particular post
app.get("/getpost/:id", authenticate, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });

        if (post) {
            res.status(201).json({ userpost: post });
        } else {
            res.status(201).json({ userpost: null });
        }

    } catch (error) {
        console.log(error.message);
    }
});

// user from search
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

// user from anywhere
app.get("/profile/:username", authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const userpost = await Post.find({ username: req.params.username });

        if (user) {
            res.status(201).json({ user: user, userpost: userpost.reverse() });
        } else {
            res.status(201).json({ user: null, userpost: null });
        }
    } catch (error) {
        console.log(error.message);
    }
});

// like the post
app.put("/like/:id", authenticate, async (req, res) => {
    try {
        const posts = await Post.find({});
        const post = await Post.findById(req.params.id);
        const hasLiked = post.likes.find((like) => like.user === req.user.username);
        posts.reverse();

        if (!hasLiked) {
            await post.updateOne({ $push: { likes: { user: req.user.username } } });
            post.likecount = post.likecount + 1;
            message = "liked";
        } else {
            await post.updateOne({ $pull: { likes: { user: req.user.username } } });
            post.likecount = post.likecount - 1;
            message = "unliked";
        }
        post.save();
        res.status(201).json({ posts: posts, message: message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// comment on the post
app.put("/comment/:id", authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            post.comments.push({ comment: req.body.comment, user: req.user.username });
            post.commentcount = post.commentcount + 1;
            await post.save();
            res.status(201).json({ message: "Comment added" });
        } else {
            res.status(201).json({ message: "Post not found" });
        }
    } catch (error) {
        console.log(error.message);
    }
});

// edit profile
app.put("/updateprofile", authenticate, async (req, res) => {
    try {
        const { name, bio, profilephoto, password, cpassword } = req.body;
        const user = await User.findById(req.user._id);
        const posts = await Post.find({ username: req.user.username })

        if (user) {
            user.name = name || user.name;
            user.bio = bio || user.bio;
            user.profilephoto = profilephoto || user.profilephoto;

            if (password && cpassword) {
                if (password === cpassword) {
                    const hashpassword = await bcrypt.hash(password, 10);
                    user.password = hashpassword;
                    user.cpassword = hashpassword;
                } else {
                    res.status(400).json({ error: "Password are not matching" });
                }
            }

            posts.map(async (post) => {
                if (post.username === user.username) {
                    post.profilephoto = user.profilephoto;
                    post.name = user.name;
                    await post.save();
                }
            });

            await user.save();
            res.status(201).json({ user: user });
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.log(error.message);
    }
});

// get all users
app.get("/allusers", authenticate, async (req, res) => {
    const users = await User.find({});
    res.status(201).json({ users: users });
});

app.listen(port, () => {    
    console.log(`Server is live on port ${port}`);
});
