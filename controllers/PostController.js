import PostModel from '../models/posts.js';

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
        return res.status(500).json({ error: "Couldn't find post" });
      }
      if (!doc){
        return res.status(404).json({ error: "Couldn't find post" });
      }
      res.json(doc);
    }
  );
};
