const express = require('express');
const z = require('zod');
const jwt = require('jsonwebtoken');
const {User, Account } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || "paytm-aditya";
const router = express.Router();
const authMiddleware = require("../middleware");
const signupSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()

})

router.post('/signup', async (req,res)=>{
    try{
        const payload = req.body;
        const validatedPayload = signupSchema.parse(payload);
        const existingUser = await User.findOne({
            username : validatedPayload.username
        })

        if(existingUser){
            return res.status(400).json({
                error : "user already exists"
            })
        }
        
        const newUser = new User(validatedPayload);
        await newUser.save();
        
        const userId = newUser._id;

        await Account.create({
            userId : userId,
            balance : 1+ Math.random()*10000
        })
        const token = jwt.sign({userId}, JWT_SECRET);
        return res.status(200).json({
            message : "user created successfully",
            token
        })
    }
    catch(err){
        return res.status(400).json({
            error : err.message
        })
    }
})

const signinSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6)
})

router.post("/signin", async (req,res)=>{
    try{
        const payload = req.body;
        const validatedPayload = signinSchema.safeParse(payload);

        if(!validatedPayload.success){
            return res.status(400).json({
                error : validatedPayload.error.message
            })
        }

        const user = await User.findOne({
            username : validatedPayload.data.username,
            password : validatedPayload.data.password
        })

        if(!user){
            return res.status(400).json({
                error : "invalid username or password"
            })
        }

        const userId = user._id;
        const token = jwt.sign({userId}, JWT_SECRET);
        return res.status(200).json({
            message : "signin successful",
            token
        })
    }
    catch(err){
        return res.status(400).json({
            error : err.message
        })
    }

    

})

const updateSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/update",authMiddleware,async(req,res)=>{
    const payload = req.body;
    const validatedPayload = updateSchema.safeParse(payload);
    if(!validatedPayload.success){
        return res.status(411).json({
            error : validatedPayload.error.message
        })
    }

    const userId = req.userId;
    await User.findByIdAndUpdate(userId , validatedPayload.data);
    return res.status(200).json({
        message : "user updated successfully",
        newData : validatedPayload.data
    })
    
})

router.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

   res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/profile", authMiddleware, async (req,res)=>{
    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({
            error : "user not found"
        })
    }
    return res.status(200).json({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    })
})

module.exports = router;