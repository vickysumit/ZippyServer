const express = require('express');
const bodyParser = require('body-parser');
const Activedish = require('../models/activedish');
const cors = require('./cors');
const activeListRouter = express.Router();

activeListRouter.use(bodyParser.json());

activeListRouter.route('/')
.options(cors.cors,(req,res)=>{
    res.statusCode=200;
})
.get(cors.cors,(req,res,next)=>{
    Activedish.find({})
    .then((activedish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(activedish);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.cors,(req,res,next)=>{
    Activedish.create(req.body)
    .then((activedish)=>{
        console.log('created ',activedish);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(activedish);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.cors,(req,res,next)=>{
    res.statusCode =200;
    res.end('Not Supported');
})
.delete(cors.cors,(req,res,next)=>{
    res.statusCode =200;
    res.end('Not Supported');
});


activeListRouter.route('/:activeId')
.options(cors.cors,(req,res)=>{
    res.statusCode=200;
})
.get(cors.cors,(req,res,next)=>{
    Activedish.find({})
    .then((activedish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(activedish);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.cors,(req,res,next)=>{
    Activedish.create(req.body)
    .then((activedish)=>{
        console.log('created ',vendors);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(activedish);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.cors,(req,res,next)=>{
   Activedish.findOne({_id:req.params.activeId})
   .then((activedish)=>{
       activedish.active = !activedish.active;
       activedish.save()
       .then((activedish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(activedish);
       },(err)=>next(err))
   },(err)=>next(err))
   .catch((err)=>next(err))
})
.delete(cors.cors,(req,res,next)=>{
    res.statusCode =200;
    res.end('Not Supported');
});


module.exports = activeListRouter;