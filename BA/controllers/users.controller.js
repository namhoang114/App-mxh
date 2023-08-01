var md = require('../models/user.model');

const API_RESPONSE = {
    SUCCESS: { status: 1, message: "Success" },
    ERROR: { status: 0, message: "Error" },
    NOT_FOUND: { status: 0, message: "Data not found" },
  };
  

exports.getListuser = async (req, res, next) => {
    let filter = {};
    if (typeof req.query.username !== 'undefined') {
        filter.username = new RegExp(req.query.username, "i");
    }

    try {
        const listUser = await md.userModel.find(filter);
        if (listUser.length > 0) {
            const response = {...API_RESPONSE.SUCCESS, data: listUser};
            res.json(response);
        } else {
            const response = {...API_RESPONSE.NOT_FOUND};
            res.json(response);
        }
    } catch (error) {   
        const response = {...API_RESPONSE.ERROR}
        console.log(error);
        res.json(response);
    }
}

exports.regUsers = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            const {username, password, fullname} = req.body;

            const newUser = new md.userModel({username, password, fullname});
            await newUser.save();

            const response = {...API_RESPONSE.SUCCESS}
            res.json(response);
        } catch (error) {
            const response = {...API_RESPONSE.ERROR}
            console.log(error);
            res.json(response);
        }
    } else {
        const response = {...API_RESPONSE.ERROR}
        res.status(405).json(response);
    }
}