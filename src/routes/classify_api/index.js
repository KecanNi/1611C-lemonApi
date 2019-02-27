/*
 * @Author: KecanNi 
 * @Date: 2019-02-26 11:02:39 
 * @Last Modified by: KecanNi
 * @Last Modified time: 2019-02-27 14:08:29
 * @Function [分类操作模块]
 */
var curd = require('mongodb-curd');
var mongo = require('mymongo1610');

var batabaseName = 'lemon',
    collcationName = 'custom',
    collcationName2 = 'classify';

/* 查询自定义分类图标 */
function getCurtom(req, res, next) {
    curd.find(batabaseName, collcationName, {}, function(result) {
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
 * 添加自定义分类
 */
function addCurtom(req, res, next) {
    var params = req.body;
    if (!params.icon || !params.type || !params.uid || !params.cName) {
        res.send({ code: 3, data: "缺少参数" });
        return;
    }
    curd.find(batabaseName, collcationName, {
        'cName': params.cName,
        "uid": { $in: ['all', params.uid] },
        "type": params.type
    }, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            addClassify()
        }
    })

    function addClassify() {
        curd.insert(batabaseName, collcationName2, params, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "添加成功",
                    data: result
                })
            }
        })
    }
}

/**
 * 查询个人分类
 */
function getClassify(req, res, next) {
    var uid = req.query.uid;
    curd.find(batabaseName, collcationName2, {
        "uid": { $in: ['all', uid] }
    }, function(result) {

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
    getCurtom: getCurtom,
    addCurtom: addCurtom,
    getClassify: getClassify
}