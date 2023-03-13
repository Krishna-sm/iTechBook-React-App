const mongoose = require("mongoose");

const uri="mongodb://127.0.0.1:27017/inotebook-react";

const startDB = async()=>{
  await  mongoose.connect(uri);
    console.log(`the db start with ${mongoose.connection.host}`);

}
module.exports =startDB;