import { createToken, verifyResetToken } from "../Middleware/authMiddleware.js";
import userModel from "../Models/user.Schema.js";
import bcrypt from "bcrypt";
import sendmail from "../utils/mailer.js";

export const registerUser = async (req, res) => {
  try {

    let { emailId, userName, password } = req.body;

    emailId = emailId.trim().toLowerCase();   // normalize email

    if (!emailId || !userName || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required"
      });
    }

    const emailExists = await userModel.findOne({ emailId });

    if (emailExists) {
      return res.status(409).send({
        message: "Email already registered"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      emailId,
      userName,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {

    console.error("Register Error:", error);

    // if (error.code === 11000) {
    //   return res.status(409).send({
    //     success: false,
    //     message: "Email already exists"
    //   });
    // }

    res.status(500).send({message: "Server error"});
  }
};



export const loginUser = async (req, res) => {

  try {

    const { emailIdOrUserName, password } = req.body;

    if (!emailIdOrUserName || !password) {
      return res.status(400).send({
        success: false,
        message: "Email/Username and password required"
      });
    }

    const user = await userModel.findOne({
      $or: [
        { userName: emailIdOrUserName },
        { emailId: emailIdOrUserName }
      ]
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password"
      });
    }

    const token = createToken(user._id);

    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
      token
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Login failed"
    });

  }
};



export const forgotPassword = async (req, res) => {

  try {

    const { emailId } = req.body;

    const user = await userModel.findOne({ emailId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered"
      });
    }

    const resetToken = createToken(user._id);

    await sendmail(
      emailId,
      "Password Reset",
      `
Click the link below to reset your password:

https://musiccom.vercel.app/ResetPassword/${user._id}/${resetToken}
`
    );

    res.status(200).send({
      success: true,
      message: "Password reset email sent"
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error sending reset email"
    });

  }
};



export const resetPassword = async (req, res) => {

  try {

    const { password } = req.body;
    const { userId, token } = req.params;

    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password required"
      });
    }

    let decoded;

    try {
      decoded = verifyResetToken(token);
    } catch {
      return res.status(401).send({
        success: false,
        message: "Invalid or expired token"
      });
    }

    if (decoded.id !== userId) {
      return res.status(401).send({
        success: false,
        message: "Invalid token"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.findByIdAndUpdate(userId, {
      password: hashedPassword
    });

    res.status(200).send({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Reset password failed"
    });

  }
};  

// export const getAllUsers = async(req,res) =>{
//     try 
//     {
//         const allUsers = await userModel.find().select('-password -__v')
//         res.status(200).send({success : true,allUsers})

//     } 
//     catch (error) 
//     {
//         console.log(error);
//         res.status(500).send({success : false, message : "error in login"})
//     }    
// }

export const addAndRemoveLikedSong = async (req, res) => {
    try {
        const { newlikedarray } = req.body
        const User = req.user
        const allUsers = await userModel.findByIdAndUpdate(User.id, {
            likedSongs: newlikedarray
        })
        res.status(200).send({ success: true })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "error in login" })
    }
}

export const getLikedSongs = async (req, res) => {
    try {
        const User = req.user
        const userLikedSongs = await userModel.findById(User._id).select('likedSongs').populate({
            path: 'likedSongs',
            populate: {
                path: 'artist',
                model: 'userModel'
            }
        })
        res.status(200).send({ success: true, userLikedSongs })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "error in login" })
    }
}




export const addLikedPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.body;
        const userId = req.user._id;

        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            $push: { likedPlaylists: playlistId }
        }, { new: true });

        res.status(200).send({ success: true, updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in liking playlist" });
    }
}

export const removeLikedPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.body;
        const userId = req.user._id;
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            $pull: { likedPlaylists: playlistId }
        }, { new: true });

        res.status(200).send({ success: true, updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in removing liked playlist" });
    }
}


export const getLikedPlaylists = async (req, res) => {
  try {

    const User = req.user;

    const LikedPlaylistId = await userModel
      .findById(User._id)
      .select("likedPlaylists")
      .populate({
        path: "likedPlaylists",
        model: "playlistModel"
      });

    res.status(200).send({
      success: true,
      LikedPlaylistId
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in getting liked playlists"
    });

  }
};

export const getLikedPlaylistsWithDetails = async (req, res) => {
    try {
        const User = req.user
        const LikedPlaylistId = await userModel.findById(User._id).select('likedPlaylists').populate({
            path: 'likedPlaylists',
            populate: {
                path: 'songs',
                model: 'songModel'
            }
        })
        res.status(200).send({ success: true, LikedPlaylistId })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "error in login" })
    }
}