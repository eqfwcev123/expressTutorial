var express = require('express');
var router = express.Router();


// 파이썬에서 view 영역이라고 생각하면 됀다
/* GET home page. */
router.get('/', function(req, res, next) {
  // python 에서 return response('html파일 이름', 전달값) 과 동일
  res.render('index', { title: 'Express' });
});

module.exports = router;
