const express = require('express');
const db = require('../models/dbConfig');
const { registerValidation, loginValidation } = require('../validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const router = express.Router();
//default route
router.get('/', (req, res) => {
    res.status(200).render('index');
});
//Api routes
//login 
router.post('/login', async(req, res, next)=>{
    try{
    const email = req.body.email;
    const password = req.body.password;
    user = await db.getUserByEmail(email);
     
    if(!user){
        return res.json({
            message: "Invalid email or password"
        })
    }
 
    const mdpValid = compareSync(password, user.password);
    if(mdpValid){
        user.password = undefined;
        const jsontoken = jsonwebtoken.sign({user: user}, process.env.SECRET_KEY, { expiresIn: '30m'} );
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) }); 
 
        res.json({token: jsontoken});
       //return res.redirect('/mainpage') ;
 
    }  else{
        return res.json({
            message: "Invalid email or password"
        });
    } 
 
    } catch(err){
        console.log(err);
    }
});

//register
router.post('/register', async (req, res, next)=>{
    try{
        const userName = req.body.userName;
        const email = req.body.email;
        let password = req.body.password;

              if (!userName || !email || !password) {
                return res.sendStatus(400);
             }
  
             const salt = genSaltSync(10);
             password = hashSync(password, salt);
  
               
  
        const user =  await db.insertUser(userName, email, password);
         
        const jsontoken = jsonwebtoken.sign({user: user}, process.env.SECRET_KEY, { expiresIn: '30m'} );
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) });
 
 
        res.json({token: jsontoken});
 
            //return res.redirect('/mainpage');
  
    } catch(err){    
        console.log(err);
        res.sendStatus(400);
    }
});
//middlewares pour les erreurs 404
router.use((req, res) => {
    res.status(404).render('erreur');
})



module.exports = router;