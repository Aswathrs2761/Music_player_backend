import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/user.Schema.js";

dotenv.config();

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETKEY, {
    expiresIn: "5h",
  });
};

export const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            success:false,
            message:"No token provided"
        });
    }

    const token = authHeader.split(" ")[1]; // Bearer token

    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).send({
                success:false,
                message:"User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).send({
            success:false,
            message:"Invalid token"
        });
    }
};

export const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.SECRETKEY);
};