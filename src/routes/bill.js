/*
 * @Author: KecanNi 
 * @Date: 2019-02-26 16:22:02 
 * @Last Modified by: KecanNi
 * @Last Modified time: 2019-02-26 18:56:48
 * @Function []
 */

var express = require('express');
var router = express.Router();
var billApi = require('./bill_api');

/* 添加账单 */
router.post('/api/addBill', billApi.addBill);
/* 查看账单 */
router.post('/api/getBill', billApi.getBill);

module.exports = router;