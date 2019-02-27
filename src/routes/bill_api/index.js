/*
 * @Author: KecanNi 
 * @Date: 2019-02-26 16:44:47 
 * @Last Modified by: KecanNi
 * @Last Modified time: 2019-02-27 11:47:48
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

    if (!params.uid || !params.icon || !params.money || !params.cName || !params.type || !params.cTime) {
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

    var query = null;

    /* 判断是否缺失参数 */
    if (!params.uid || !params.cTime) {
        res.send({ code: 3, msg: '缺少参数' })
        return;
    }
    var reg = params.cTime && new RegExp('^' + params.cTime);

    if (!params.classify) { /* 查询条件 */
        query = {
            'uid': params.uid,
            "cTime": reg
        }
    } else {
        query = {
            'uid': params.uid,
            "cTime": reg,
            "cName": { $in: params.classify.split(',') }
        }
    }

    curd.find(batabaseName, collcationName, query, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            /* 判断数据的长度 */
            if (result.length) {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            } else {
                res.send({
                    code: 2,
                    mes: "查询不到相关信息",

                })
            }

        }
    })
}

/**
 * 删除账单
 */
function delBill(req, res, next) {
    var id = req.query.id;
    if (!id) {
        res.send({ code: 3, msg: '缺少参数' })
        return;
    }
    curd.remove(batabaseName, collcationName, { '_id': id }, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error",
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
    getBill: getBill,
    delBill: delBill
};