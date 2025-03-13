const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const ejsMate = require("ejs-mate");
app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname,"/public")));
const ExpressError = require("./utils/expressError.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
   .then(() => {
    console.log("connected to DB");
   })
   .catch((err) =>{
    console.log(err);
   }) 
async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessioOptions = {
  secret:"mysupersecret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};

app.get("/",(req,res)=>{
  res.send("Hi, i am root");
});

app.use(session(sessioOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success =  req.flash("success");
  res.locals.error =  req.flash("error");
  next();
});

app.get("/demouser", async(req,res)=>{
  // creating fake user
  let fakeUser = new User({
    email:"student@gmail.com",
    username:"delta-student",
  });

  //now User ke register method mai humne ye fakeUser daala with password helloworld 
  let registerUser =await User.register(fakeUser,"helloworld");
  res.send(registerUser);
});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



app.all("*",(req,res,next) => {
  next(new ExpressError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{
  let {statusCode = 500,message = "Something went wrong!"} = err;
  res.status(statusCode).render("error.ejs",{ message });
  // res.status(statusCode).send(message);
})

app.listen(8080, () => {
    console.log("app is listening on port 8080");
});