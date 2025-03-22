const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
 
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}); 

// // index route
// router.get("/", wrapAsync(listingController.index));
  
  // // new route
  // // in this first check that is user logged in .if not then he/she cant create a listing
  // router.get("/new",isLoggedIn,listingController.renderNewForm);
  
  // //show route
  // router.get("/:id",wrapAsync(listingController.showListing));
  // //note:humne new route upar likha and show route niche becoz if show upar likhe to ye :id wala new ko bhi ek id smjh leta h to ab aese likhne se pehle /new hai to if new hoga to ye chal jaayeg and niche id wala hai vo chalega when id is there
  
  // // create route
  // router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing));

// // edit route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  
  // // update route
  // router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

  // // delete route
  // router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
  

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));


// new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  

  module.exports = router;