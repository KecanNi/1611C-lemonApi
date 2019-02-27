/*
 * @Author: KecanNi 
 * @Date: 2019-02-23 10:04:18 
 * @Last Modified by: KecanNi
 * @Last Modified time: 2019-02-27 11:42:46
 * @fnction   [操作用户]
 */
var curd = require('mongodb-curd');


var batabaseName = 'lemon',
    collcationName = 'user';

function getUser(req, res, next) {
    var data = req.query;
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

function addUser(req, res, next) {

}

module.exports = {
    getUser: getUser,
    addUser: addUser
};