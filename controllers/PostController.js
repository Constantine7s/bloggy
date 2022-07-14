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


