const express = require("express");
const router = express.Router();//this create a new router object

// index route for posts
router.get("/", (req,res)=>{
    res.send("get for posts");
});

// show route for posts
router.get("/:id", (req,res)=>{
    res.send("get for post id");
});

// post for posts
router.post("/", (req,res)=>{
    res.send("post for posts");
});

// delete for posts
router.delete("/:id", (req,res)=>{
    res.send("delete for post id");
});

module.exports = router;