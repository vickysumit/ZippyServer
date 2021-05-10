const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxe25d629a3a164dd1a3600a5bbe8e5946.mailgun.org';
const mg = mailgun({apiKey: '6524ab44c5031e9f28b80c15cebdc54a-a09d6718-032b6465', domain: DOMAIN});
const express = require('express');
const bodyParser = require('body-parser');
const Gmails = require('../models/gmail')
const cors = require('./cors');
const jwt = require('jsonwebtoken');
const { json } = require("express");


const gmailSignup = express.Router();
gmailSignup.use(bodyParser.json());

gmailSignup.route('/signup')
.post(cors.cors,(req,res,next)=>{

    const {email} = req.body;
    //console.log(email);
    const token = jwt.sign({email},'accountactivekey123',{expiresIn:'20m'})
    var val = Math.floor(1000 + Math.random() * 9000);
    global.random_num=val;
    console.log(global.random_num);
    const data = {
        from: 'noreply@hello.com',
        to: email,
        subject: 'Hello',
        html: `
            <h2>Your One Time Password is </h2>
            <p>${val}</p>
        `
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });

    res.statusCode =200;
    res.end(JSON.stringify({token:token}));

})

gmailSignup.route('/random')
.post(cors.cors,(req,res,next)=>{
    // var val = Math.floor(1000 + Math.random() * 9000);
    // console.log(val);
    res.statusCode = 200;
    res.end(JSON.stringify({rnum:global.random_num}))
})



















gmailSignup.route('/signupverify')
.get(cors.cors,(req,res,next)=>{
    
    const {token} = req.body;
    if(token)
    {
        jwt.verify(token,'accountactivekey123',(err,decodedToken)=>{
            if(err)
            {
               console.log('token expire or incorrect')
            }
            else{
                const {email} = decodedToken;
                console.log('Verified' + email)
            }
        })
    }
    else{
        console.log('No token');
    }
    res.statusCode =200;
    res.end('Verified');
})

gmailSignup.route('/:mailToken')
.get(cors.cors,(req,res,next)=>{
    const token = req.params.mailToken;
    res.statusCode = 200;
    jwt.verify(token,'accountactivekey123',(err,decodedToken)=>{
        if(err)
        {
           console.log('token expire or incorrect')
        }
        else{
            const {email} = decodedToken;
            console.log('Verified' + email)
        }
    })
    res.end(JSON.stringify({token:token}));
})






module.exports = gmailSignup;