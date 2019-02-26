/*
 * @Author: KecanNi 
 * @Date: 2019-02-26 16:44:47 
 * @Last Modified by: KecanNi
 * @Last Modified time: 2019-02-26 18:58:53
 * @Function [账单管理模块]
 */
var curd = require('mongodb-curd');
var mongo = require('mymongo1610');

var batabaseName = 'lemon',
    collcationName = 'bill';


/**
 * 添加账单
 */
function addBill(req, res, next) {
    var params = req.body;

    if (!params.uid || !params.cid || !params.money || !params.cTime) {
        res.send({ code: 3, msg: '缺少参数' })
        return;
    }
    curd.insert(batabaseName, collcationName, params, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}
/**
 * 查看账单
 */
function getBill(req, res, next) {
    var params = req.body;

    if (!params.uid) {
        res.send({ code: 3, msg: '缺少参数' })
    }
    curd.find(batabaseName, collcationName, params, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}

module.exports = {
    addBill: addBill,
    getBill: getBill
};