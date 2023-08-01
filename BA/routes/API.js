var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users.controller');
var postCtrl = require('../controllers/posts.controller');

router.get('/listusers', userCtrl.getListuser);
router.post('/regusers', userCtrl.regUsers);

router.post('/post', postCtrl.post);

module.exports = router;