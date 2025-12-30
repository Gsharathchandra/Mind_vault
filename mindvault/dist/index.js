import express from "express";
import { connectDB, ContentModel, Linkmodel } from "./db.js";
import { UserModel } from "./db.js";
import { jwt_key } from "./config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import { userMiddleware } from "./middleware.js";
dotenv.config();
import { random } from "./utils.js";
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            username: username,
            password: hashedPassword,
        });
        res.send("user has been created sucessfully");
    }
    catch (error) {
        res.status(411).json({
            message: "some error has occured",
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const currentuser = await UserModel.findOne({
            username
        });
        if (!currentuser) {
            return res.status(401).json({ message: "Invalid credentials ❌" });
        }
        const isMatch = await bcrypt.compare(password, currentuser.password);
        if (isMatch) {
            const token = jwt.sign({ id: currentuser._id }, jwt_key);
            res.json({
                token,
            });
        }
        else {
            res.status(401).json({ message: "Invalid credentials ❌" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error 🔥" });
    }
});
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { title, link, type } = req.body;
    try {
        await ContentModel.create({
            title: title,
            link: link,
            //@ts-ignore
            userId: req.userId,
            type: type,
            tags: [],
        });
        return res.json({
            message: "sucessfully content addeed",
        });
    }
    catch (error) {
        res.json({
            message: "some error has occured",
        });
    }
});
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId,
    }).populate("userId", "username userId");
    if (content) {
        res.json({
            content,
        });
    }
    else {
        res.json({
            message: "no content to display",
        });
    }
});
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    try {
        await ContentModel.deleteMany({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "content deleted"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error deleting content"
        });
    }
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    //@ts-ignore
    const userId = req.userId;
    if (share) {
        // Check if user already has a link
        const existing = await Linkmodel.findOne({ userId });
        if (existing) {
            return res.json({
                message: existing.hash
            });
        }
        // Create new link only if no previous link exists
        const hash = random(10);
        await Linkmodel.create({
            userId,
            hash
        });
        return res.json({
            message: hash
        });
    }
    // At this point share === false → delete link
    await Linkmodel.deleteOne({ userId });
    return res.json({
        message: "removed link"
    });
});
// app.get("/api/v1/brain/:shareLink",async (req,res)=>{
//   const hash = req.params.shareLink;
//  const link =  await Linkmodel.findOne({
//     hash:hash
//   })
//   if(!link) {
//       res.status(411).json({
//         message:"incorrect input"
//       })
//       return;
//   }
//   const content = await ContentModel.findOne({
//     userId:link.userId
//   })
//   const user = await UserModel.findOne({
//     _id : link.userId 
//   })
//   if(!user){
//      res.status(411).json({
//         message:"unusual error has occured"
//       })
//       return;
//   }
//   res.json({
//     username:user.username,
//     content:content
//   })
// })
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    try {
        const hash = req.params.shareLink;
        const link = await Linkmodel.findOne({ hash });
        if (!link) {
            return res.status(404).json({ message: "Invalid or expired link" });
        }
        // Get all shared content for this user
        const content = await ContentModel.find({ userId: link.userId });
        const user = await UserModel.findById(link.userId);
        if (!user) {
            return res.status(500).json({ message: "Unexpected error occurred" });
        }
        res.json({
            username: user.username,
            contents: content
        });
    }
    catch (err) {
        console.error("Error fetching shared brain:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map