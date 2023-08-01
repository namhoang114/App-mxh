const { Schema, model } = require("mongoose");
var db = require("./db");

const postSchema = new db.mongoose.Schema(
    {
        post: {type: String, required: false},
        image: {type: String, required: false}
    },
    {
        collection: 'posts',
    }
);

let postModel = db.mongoose.model('postModel', postSchema);

module.exports = {postModel};