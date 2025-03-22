const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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
 
 const initDB = async () =>{
    await Listing.deleteMany({});//this delete if pehle se koi data hai
    initData.data = initData.data.map((obj)=> ({...obj,owner:"67d12c884355bf92e5b7ae9a"}))
    await Listing.insertMany(initData.data);//then data inserted
    console.log("data was initialised");
 };

 initDB();