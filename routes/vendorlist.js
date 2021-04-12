const express = require('express');
const bodyParser = require('body-parser');
const VendorList = require('../models/vendor');
const cors = require('./cors');
const vendorListRouter = express.Router();

vendorListRouter.use(bodyParser.json());

vendorListRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{
    res.statusCode=200;
})
.get(cors.cors,(req,res,next)=>{
    VendorList.find({})
    .then((vendors)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(vendors);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.cors,(req,res,next)=>{
    VendorList.create(req.body)
    .then((vendors)=>{
        console.log('created ',vendors);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(vendors);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.cors,(req,res,next)=>{
    res.statusCode =200;
    res.end('Not Supported');
})
.delete(cors.cors,(req,res,next)=>{
    VendorList.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
})

module.exports = vendorListRouter;