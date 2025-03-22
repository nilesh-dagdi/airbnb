const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing  = require("../models/listing.js");
const {validateReview,isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { createReview } = require("../controllers/reviews.js");

const reviewController = require("../controllers/reviews.js");

  // post route for reviews
  router.post("/:id/reviews",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
  
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
  router.delete("/:id/reviews/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
  
  module.exports = router;

