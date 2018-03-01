var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');

var UserModel = require("../model/UserModel");
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


router.get('/goods_add', function(req, res, next) {
  res.render('goods_add');
});

router.post('/api/login',function(req,res){
	var username = req.body.username;
	var pwd = req.body.pwd;
	console.log(username,pwd);
	var result = {
		status:1,
		message:"登录成功"
	}
	UserModel.find({username:username,pwd:pwd},function(err,docs){
		console.log(docs.length);
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

router.get('/goods_add', function(req, res, next) {
  res.render('/goods_add', { title: '登录页面' });
});

router.post('/api/add_goods',function(req,res){
	 var form = new multiparty.Form({
	 	uploadDir:"./public/js"
	 });
	 form.parse(req, function(err, body, files) {
	 	//转换后的对象都是数组形式
	 	var goodsname = body.goodsname[0];
	 	var goodsnumber = body.goodsnumber[0];
	 	var goodsprice = body.goodsprice[0];
	 	console.log(files);
	 	res.send("文件上传成功");

});
})


module.exports = router;
