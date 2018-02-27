var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});

router.post('/api/login',function(req,res){
	var username = req.body.username;
	var pwd = req.body.pwd;
	UserModel.find({username:username,pwd:pwd},function(err,docs){
		if( !err && docs.length > 0 ){
			console.log("登录成功");
			res.send("登录成功");
		}else{
			console.log("登录失败");
			res.send("登录失败");
		}
	})
});

module.exports = router;
