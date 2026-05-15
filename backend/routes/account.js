const express = require('express');
const { Account } = require('../db');
const authMiddleware = require("../middleware");

const router = express.Router();

router.get("/balance",authMiddleware, async (req,res)=>{
    try{
        const userId = req.userId;
        const account = await Account.findOne({
            userId
        })
        if(!account){
            return res.status(404).json({
                error : "account not found"
            })
        }
        return res.status(200).json({
            balance : account.balance
        })
    }
    catch(err){
        return res.status(400).json({
            error : err.message
        })
    }
})

router.post("/transfer", authMiddleware, async ( req,res)=>{
    const session = await Account.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({
        userId : req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            error : "insufficient balance or account does not exist"
        })
    }

    const toAccount = await Account.findOne({
        userId : to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
            error : "recipient account not found"
        })
    }

    try{
        account.balance -= amount;
        toAccount.balance += amount;

        await account.save();
        await toAccount.save();

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message : "transfer successful"
        })
    }
    catch(err){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            error : err.message
        })
    }
})

module.exports = router;