var express = require('express');
var uuid = require('uuid');
var router = express.Router();
var fs = require('fs');
var config = require('cjson');
var mongodb = require(__dirname+'/action/mongo.js');
router.get('/',function(req,res,next){

	res.send({"success":true});

});

router.post('/api/create',function(req,res,next){
	var request = req.body ;
	var query = req.query ;
	request._id = uuid.v4();
	mongodb.mongodbOperation('test',query.service,request,'write',null,null,function(err , result ){
		if(err){
			return res.send({"Error":true,"Result":err});
		}	
		return res.send(result);
	});

});


router.get('/api/getall',function(req,res,next){
	var request = req.body ;
	var query = req.query ;
	var params = req.params ;
	var response = {};	

	mongodb.mongodbOperation('test',query.service,request,'readall',null,null,function(err , result ){
		if(err){
			response.code = 400 ;
			response.error =  err ;
			return res.send({"Error":true,"Result":err});
		}	
			response.code = 200 ;
			response.error =  result ;
		return res.send(result);
	});
});


router.get('/api/getapi/:id',function(req,res,next){
	var request = req.body ;
	request._id = req.params.id ;
	var query = req.query ;
	
	mongodb.mongodbOperation('computenext',query.service,request,'readall',null,null,function(err , result ){
		if(err){
			return res.send({"Error":true,"Result":err});
		}	
		return res.send(result);
	});
});


module.exports = router ;
