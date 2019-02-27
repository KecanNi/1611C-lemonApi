var express = require('express');
var router = express.Router();

var userApi = require('./user'); //用户
/* GET users listing. */
router.get('/api/getUser', userApi.getUser);

module.exports = router;