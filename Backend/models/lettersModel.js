const mongoose = require("mongoose");

const LettersModel = mongoose.model(
    "longest",
    {
        letters : {
            type : [String],
            required : true,
        },
        date : {
            type : Date,
            default : Date.now(),
            required : true,
            require : true,
        },
    },
    "letters"
)

module.exports = { LettersModel };