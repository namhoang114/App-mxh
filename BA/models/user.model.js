const { Schema, model } = require("mongoose");
var db = require("./db");

const UserSchema = new db.mongoose.Schema(
    {
        username: {type: String, required: false},
        password: {type: String, required: false},
        fullname: {type: String, required:false}
    },
    {
        collection: 'users'
    }
);

var userModel = db.mongoose.model('userModel', UserSchema);

module.exports = {userModel};