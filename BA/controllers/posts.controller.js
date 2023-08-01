var md = require('../models/post.model');

const API_RESPONSE = {
    SUCCESS: { status: 1, message: "Success" },
    ERROR: { status: 0, message: "Error" },
    NOT_FOUND: { status: 0, message: "Data not found" },
  };

exports.post = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            const {post, image} = req.body;

            const newPost = new md.postModel({post, image});
            await newPost.save();

            const response = {...API_RESPONSE.SUCCESS}
            res.json(response)
        } catch (error) {
            const response = {...API_RESPONSE.ERROR}
            console.error(error);
            res.json(response);
        }
    } else {
        const response = {...API_RESPONSE.ERROR}
        res.status(405).json(response)
    }
}