/*
 * @Author: KecanNi 
 * @Date: 2019-02-26 10:53:12 
 * @Last Modified by: KecanNi
 * @Last Modified time: 2019-02-26 14:44:12
 * @Function [分类模块]
 */

var express = require('express');

var router = express.Router();

var classifyApi = require('./classify_api')

/* 获取自定义分类 */
router.get('/api/getCurtom', classifyApi.getCurtom);

/* 添加自定义分类 */
router.post('/api/addCurtom', classifyApi.addCurtom);

/* 获取个人分类 */
router.get('/api/getClassify', classifyApi.getClassify);

module.exports = router;