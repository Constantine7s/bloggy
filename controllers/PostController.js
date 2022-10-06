import PostModel from '../models/posts.js';

export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0.5);
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't get tags" });
  }
};

export const createPost = async (req, res) => {
  try {
    const data = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      author: req.userId,
    });
    const post = await data.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't create post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't find posts" });
  }
};

export const getPostById = async (req, res) => {
  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { views: 1 } },
    { returnDocument: 'after' },
    (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Couldn't get post" });
      }
      if (!doc) {
        return res.status(404).json({ error: "Couldn't find post" });
      }
      res.json(doc);
    }
  );
};

export const deletePost = (req, res) => {
  PostModel.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Couldn't delete post" });
    }
    if (!doc) {
      return res.status(404).json({ error: "Couldn't find post" });
    }
    res.json({ success: true });
  });
};

export const updatePost = async (req, res) => {
  await PostModel.updateOne(
    { _id: req.params.id },
    {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      author: req.userId,
    }
  );
  res.json({ success: true });
};
