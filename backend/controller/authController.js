import axios from "axios";
import { oauth2Client } from "../utils/googleConfig.js"; 
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user information from Google API
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const { email, name, image } = userResponse.data; 

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({name,email,image,
      });
    }
    const { _id } = user;

    const token = jwt.sign({ _id, email },process.env.JWT_SECRET,{ expiresIn: process.env.JWT_TIMEOUT });

    return res.status(200).json({message: "Success",token,user});

  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message,});
  }
};
