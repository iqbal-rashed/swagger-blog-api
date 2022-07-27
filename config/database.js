const mongoose = require("mongoose");

exports.connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Connections Failed");
        process.exit(1);
    }
};
