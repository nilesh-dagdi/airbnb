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
        url:String,
        filename:String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {

            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

// if koi listing is deleted then it will delete its reviews also
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;