const express = require("express");
const app = express();
const sequelize = require("./models/index.js");
const Post = require("./models/Post.js");
const User = require("./models/user.js");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("dotenv").config();
app.use(cors());
app.use(express.json());


 const authenticate =(req,res,next)=>{
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
   const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    req.user = decoded;  
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(Post.rawAttributes);
    console.log("All models were synchronized successfully.");
  })
  .catch(error => {
    console.error("Error syncing models:", error);
  });

app.post("/posts",authenticate, async (req, res) => {
  const { title, content } = req.body;
  const titleTrimValue = title.trim();
  const contentTrimValue= content.trim();
  if (!titleTrimValue || !contentTrimValue) {
    return !titleTrimValue
      ? res.status(400).send("Title is required")
      : res.status(400).send("Content is required");
  }
  try {
    const userId = req.user.id;
    const post = await Post.create({
      title: titleTrimValue,
      content: contentTrimValue,
      userId:userId
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message:"Error creating post."});
  }
});

app.get("/posts", authenticate, async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (ex) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Error Fetching Posts"
    });
  }
});

app.delete("/posts/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const post = await Post.findOne({
      where: {
        id: id,
        userId: userId
      }
    });

    if (!post) {
     
      return res.status(403).json({ message: 'You do not have permission to delete this post.' });
    }

    // Delete the post
    const deletedPost = await Post.destroy({
      where: {
        id: id
      }
    });

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found or already deleted.' });
    }
    res.status(200).json({ message: 'Post deleted successfully.' });

  } catch (ex) {
    console.error("Error Deleting Post:", ex);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Error Deleting Post"
    });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const usernameTrimValue = username.trim();
    const passwordTrimValue = password.trim();
    const existingUser = await User.findOne({ where: {username: usernameTrimValue} });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
     
      const newUser = await User.create({
        username :usernameTrimValue, 
       password: passwordTrimValue});
      const token =  jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.SECRET_KEY
      );
      res.status(201).json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Error Creating Post"
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
const usernameTrimValue  = username.trim();
const passwordTrimValue= password.trim();
  try {
    const user = await User.findOne({ where: { username: usernameTrimValue } });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(passwordTrimValue, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token =  jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/posts/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const titleTrimValue= title.trim();
    const descriptionTrimValue = description.trim();
    const userId = req.user.id; 
    const post = await Post.findOne({
      where: {
        id: id,
        userId: userId, 
      },
    });

    if (!post) {
      return res.status(404).json({ message: "you don't have permission to edit it." });
    }

    // Update the post
    post.title = titleTrimValue;
    post.description = descriptionTrimValue;
    await post.save();

    return res.status(200).json(post); 
  } catch (ex) {
    console.error("Error updating post:", ex);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen( process.env.PORT , () => {
  console.log("Server is running on port 3000");
});
