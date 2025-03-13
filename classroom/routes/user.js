const express = require("express");
const router = express.Router();//this create a new router object

// index route for users
router.get("/", (req,res)=>{ //in these paths /users nhi likha but sabka start with /users hi h internally as written in server.js file 
    res.send("get for users");
});

// show route for users
router.get("/:id", (req,res)=>{
    res.send("get for user id");
});

// post for users
router.post("/", (req,res)=>{
    res.send("post for users");
});

// delete for users
router.delete("/:id", (req,res)=>{
    res.send("delete for user id");
});
 
module.exports = router;
//so humne saare i.e. index show post delete ko router mai le iye and now export this router