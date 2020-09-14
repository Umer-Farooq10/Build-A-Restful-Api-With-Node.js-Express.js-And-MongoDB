const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// GETTING ALL POSTS
router.get("/", async (req, res) => {
  try {
    const results = await Post.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// SUBMIT POST
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const result = await post.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// GETTING SINGLE POST
router.get("/:postId", async (req, res) => {
  try {
    const result = await Post.findById({ _id: req.params.postId });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

// UPDATE POST
router.patch("/:postId", async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.end("Updated!");
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE SINGLE POST
router.delete("/:postId", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.postId });
    res.end("Deleted!");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
