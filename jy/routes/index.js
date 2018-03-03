var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');

var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});

router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/right', function(req, res, next) {
  res.render('right');
});


//添加商品页
router.get('/goods_add', function(req, res, next) {
  res.render('goods_add');
});

//商品列表页面
router.get('/list',function(req,res){
	GoodsModel.find({},function(err,docs){
		res.render('list',{list:docs});
	})
})


//模糊查询功能
router.get('/api/goodslist',function(req,res){
	var goodsname = req.query.goodsname;
	GoodsModel.find({goodsname:{$regex:goodsname}},function(err,docs){
//	res.render('list',{list:docs});
		var result = {
			status:1,
			message:"查询成功"
		}
		if(!err && docs.length > 0){
			console.log("查询成功");
			res.send(result);
		}else{
			console.log("查询失败");
			result.status = -118;
			result.message = "查询失败";
			res.send(result);
		}
	})
})

//返回模糊查询结果，渲染页面功能
router.get('/api/xuanranlist',function(req,res){
	var pageNo = parseInt(req.query.pageNo || 1);
	var count = parseInt(req.query.count || 3);
//	var query = GoodsModel.find({}).skip( (pageNo-1)*count ).limit(count).sort({date:-1});
//	query.exec(function(err,results){
//		res.send({list:results,pageNo:pageNo,count:count});
		res.render('list',{list:results,pageNo:pageNo,count:count});
	})
})

//分页功能
//router.get('/list',function(req,res){
//	var pageNo = parseInt(req.query.pageNo || 1);
//	var count = parseInt(req.query.count || 3);
//	var query = GoodsModel.find({}).skip( (pageNo-1)*count ).limit(count).sort({date:-1});
//	query.exec(function(err,results){
//		res.render('list',{list:results,pageNo:pageNo,count:count});
//	})
//})


//商品保存功能
router.post('/api/add_goods',function(req,res){
	 var form = new multiparty.Form({
	 	uploadDir:"./public/js"
	 });
	 form.parse(req, function(err, body, files) {
	 	//req里是上传的内容，body(fields)内放的是表单数据，files内是文件
	 	//转换后的对象都是数组形式
	 	var goodsname = body.goodsname[0];
	 	var goodsnumber = body.goodsnumber[0];
	 	var goodsprice = body.goodsprice[0];
	 	
	 	var gm = new GoodsModel();
	 	gm.goodsname = goodsname;
	 	gm.goodsnumber = goodsnumber;
	 	gm.goodsprice = goodsprice;
	 	console.log(goodsname,goodsnumber,goodsprice);
//		console.log(files);
	 	gm.save(function(err){
	 		var result = {
	 			status : 66,
	 			message : "ok"
	 		}
	 		if(err){
	 			result.status = -333;
	 			result.message = "商品保存失败";	 
	 		}
	 		res.send(result);
	 	});
});
})


//登录功能
router.post('/api/login',function(req,res){
	var username = req.body.username;
	var pwd = req.body.pwd;
	console.log(username,pwd);
	var result = {
		status:1,
		message:"登录成功"
	}
	UserModel.find({username:username,pwd:pwd},function(err,docs){
//		console.log(docs.length);
		if(!err && docs.length > 0 ){
			console.log("登录成功");
			res.send(result);
		}else{
			console.log("登录失败");
			result.status = -300;
			result.message = "登录失败"
			res.send(result);
		}
	})
});

module.exports = router;
