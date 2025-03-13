const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

// const cookieParser = require("cookie-parser");
// app.use(cookieParser("secretcode"));

// // sending signed cookies
// app.get("/getsignedcookie",(req,res) =>{
//     res.cookie("color","red",{signed:true});
//     res.send("done");
// }); 

// // verify siged cookies
// app.get("/verify",(req,res) =>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies",(req,res) =>{
//     res.cookie("greet","namaste");
//     res.cookie("origin","India");
//     res.send("We sent you a cookie");
// });

// app.get("/",(req,res) =>{
//     console.dir(req.cookies);
//     res.send("hi i am root");
// });

// app.get("/greet",(req,res) =>{
//     let {name ="anonymous"} =req.cookies;
//     res.send(`Hii ${name}`);
// })

// app.use("/users",users);//ye bhi likhna pdta h for router it shows ki users file mai jaana hai if anything that starts with /users..so ye /users is common path for all routes of users file
// app.use("/posts",posts);//slly now if req goes jisme /posts aaye to posts wali file mai jaake dekhega and vo path chlega


const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const sessionOptions = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true}

app.use(session(sessionOptions));//middleware which creates ession id with each request
app.use(flash());


// sending query--localhost:3000/register?name=nilesh
app.get("/register", (req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    req.flash("success","user registered successfully");
    res.redirect("/hello");
});

app.get("/hello",(req,res) =>{
    // res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});//here req.flash is accessed using key success
    // or
    res.locals.messages = req.flash("success");
    res.render("page.ejs",{name:req.session.name});
});


// app.get("/test",(req,res)=>{
// res.send("test successful");
// });

// // this will tell how many times we have visited this path
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){ //if req ke session mai count namak chij hai
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })

app.listen(3000,()=>{
    console.log("server is litening on port 3000");
});