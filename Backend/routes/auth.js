const express = require('express');
const router = express.Router();
const User = require('../model/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../MiddleWare/fetchUser')

const JWT_SECRET = "Your_jwt_secret";

//Route - 1 => Create a User using: POST "/api/auth".

router.post("/createUser",
    [
        body("name","Enter a valid Name").isLength({min:3}),
        body("email","Enter a valid Email").isEmail(),
        body("password","Password must be minimum 5 characters").isLength({min:5})
    ],
    async(req, res) => {
        let success = false;
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() })
        }

        try {
            let user = await User.findOne({email: req.body.email})

            if(user){
                return res.status(400).json({error: "Sorry a user with this Email already exists", success})
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password , salt);

            //Create a User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            const data = {
                user:{
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({"authtoken": authtoken, success});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occured",success);
        }
    }
)

//Authenticate a User
//Route-2 Login with Credentials

router.post("/login",
    [
        body("email", "Enter a valid Email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ], async(req,res) => {
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, errors: errors.array() });
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error: "Please Try to Login with Correct Credentials"});
            }

            const passwordCompare = bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({success, error: "Please Try to Login with Correct Credentials"})
            }

            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({success, "authtoken": authtoken});

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error").json(success);
        }
    })

router.post("/getUser", fetchUser, async(req,res)=>{
    try {
        let userid = req.user.id
        const user = await User.findById(userid).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;