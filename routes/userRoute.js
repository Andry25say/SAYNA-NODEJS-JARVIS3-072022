const express = require('express');
const db = require('../models/dbConfig');


const router = express.Router();
//default route
router.get('/', (req, res) => {
    res.status(200).render('index');
});

//all users
router.post('/login', async(req,res)=>{
    const data = req.body;
    db.query('INSERT INTO user SET ?',data,(err,results,fields)=>{
        if (err) {
            res.status(400).send(err.message);
        }else{
            res.status(200).send({err:false,data:results,message:'login now'})
        }
    })

}
)
//middlewares pour les erreurs 404
router.use((req, res) => {
    res.status(404).render('erreur');
})



module.exports = router;