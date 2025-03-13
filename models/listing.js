const mongoose = require("mongoose");
const Schema = mongoose.Schema;//ye isliye likha jissse baar baar mongoose.Schema likhne ke bajay we can writ directly Schema

const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description: String,
    image:{ 
        type:String,
        default:"https://images.unsplash.com/photo-1735908235870-f4dd182a2f12?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",//this is when image lgai hi nhi user ne
        set: (v) => v===""?"https://images.unsplash.com/photo-1735908235870-f4dd182a2f12?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,//this is when image ke link mai kuch daala nhi i.e. empty
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {

            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
});

// if koi listing is deleted then it will delete its reviews also
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;