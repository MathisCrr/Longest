const express = require("express");
const router = express.Router();
const generateLetter = require("../tools/generateLetters");

const { LettersModel } = require("../models/lettersModel");


router.get("/", (req,res) => {
    LettersModel.find((err,docs) => {
        if (!err){
            dateOfToday = new Date()
            if (docs[0].date.getDate() !== dateOfToday.getDate()){ //If date of today is different in the database, we change the letters
                const updateRecord = {
                    "letters" : generateLetter(),
                    "date" : Date.now(),
                }
                LettersModel.findByIdAndUpdate(
                    docs[0].id,
                    { $set : updateRecord },
                    { new : true },
                    (err, docsUpdated) => {
                        console.log(docsUpdated)
                        if (!err) res.send(docsUpdated);
                        else  console.log("Update error : " + err);
                    }
                )
            }
            else {
                res.send(docs[0])
            }
        }
        else console.log("Error to get data : " + err);
    })
})

/*
router.post("/", (req, res) => {
    const newRecord = new LettersModel({
        letters : req.body.letters,
        date : Date.now(),
    })
    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error creating new data : " + err);
    })
})*/

/*
router.put("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknow : " + req.params.id)
    };
    console.log(req.body)
    const updateRecord = {
        "letters" : req.body.letters,
        "date" : req.body.date,
    }
    LettersModel.findByIdAndUpdate(
        req.params.id,
        { $set : updateRecord },
        { new : true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
})*/


module.exports = router