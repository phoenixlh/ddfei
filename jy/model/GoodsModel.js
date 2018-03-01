var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//创建文档的定义
var Goods = new Schema({
    goodsname    : String,
    goodsnumber  : String,
    goodsprice   : String,
    cre_date     : { type: Date, default: Date.now }
});

var GoodsModel = mongoose.model('goods',Goods);

module.exports = GoodsModel;