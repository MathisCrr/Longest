const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://serverAdress",
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (!err) console.log("Mongodb connected");
        else console.log("Connection error : " + err);
    }
)