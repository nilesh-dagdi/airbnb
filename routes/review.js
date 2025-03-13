const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing  = require("../models/listing.js");


const validateReview = (req,res,next) => {
    let {error} =  reviewSchema.validate(req.body);  
    if(error){
      let errMsg = error.details.map((el) =>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }
    else{
      next();
    } 
  }

  // post route for reviews
  router.post("/",validateReview,wrapAsync(async(req,res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
  
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
  
    res.redirect(`/listings/${listing._id}`); 
  }));
  
  // 1. wrapAsync – Handling Errors in Async Functions
  // When you use async functions, they return promises. If an error occurs inside an async function and you don’t handle it, the server might crash.
  
  // wrapAsync is a helper function that ensures errors are caught and handled properly.
  // It wraps the async function and passes any errors to next(), so they can be handled by an error middleware.
  // 👉 Without wrapAsync, if an error occurs (e.g., listing not found), the app might crash.
  // 👉 With wrapAsync, errors are caught and handled properly.
  
  // 2. validateReview – Middleware for Input Validation
  // This function checks if the review data is valid before saving it to the database.
  // It might use something like Joi to verify if the user has provided proper input (e.g., a review must have text and a rating).
  // If the data is invalid, it sends an error before running the main logic.
  // 👉 Without validateReview, users might send empty or invalid reviews, which could break your app.
  // 👉 With validateReview, it ensures only correct data is stored.
  
  
  // delete route for review
  router.delete("/:reviewId",
    wrapAsync(async (req,res) =>{
    let{id,reviewId} = req.params;
  
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}}); //it removes from listing
    await Review.findByIdAndDelete(reviewId);//it deletes from database
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
   })
  );
  
  module.exports = router;

