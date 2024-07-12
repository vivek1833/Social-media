const { verify } = require("jsonwebtoken")
const User = require("../models/user")

const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const verifyUser = verify(token, process.env.SecretKey);
        const currUser = await User.findOne({ _id: verifyUser._id });

        if (!verifyUser || !currUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.user = currUser;

        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).json("Unauthorized: No token provided");
    }
}

module.exports = auth;
