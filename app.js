var express = require('express');
var app = express();
var path = require('path');

//引入路由
var indexRoute = require(path.join(__dirname,'/route/index'));
var resumeRoute = require(path.join(__dirname,'/route/resume'));

//1.配置静态文件路径
app.use(express.static(path.join(__dirname,'/public')));
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules')))
//模板引擎
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

app.use('/',indexRoute);
app.use('/resume',resumeRoute);
//2
app.listen(3333);

