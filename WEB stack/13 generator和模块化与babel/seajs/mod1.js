define(function (require, exports, module) {
    // exports.a = 7;
    // exports.b = 9;
    //exports.show=function(){}

    let moda = require('a');
    let modb = require('b');

    //module 批量导出
    module.exports={
        a: 7, b:9,
        show(){
            alert(moda.num1 + modb.num2);
        }
    };

});