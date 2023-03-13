const express = require('express');
const startDB = require('./db');
const port = process.env.PORT || 5000;
const app = express();
const cors=require("cors");
startDB();

// avlible route
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/note",require("./routes/notes"));


app.get("/",(req,res)=>{
    res.send("Hello world");
})



app.listen(port,()=>{
    console.log(`the app is listen at http://localhost:${port}`);
})