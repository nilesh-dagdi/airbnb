const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");

const validateListing = (req,res,next) => {
  let {error} =  listingSchema.validate(req.body);
  
  if(error){
    let errMsg = error.details.map((el) =>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
}

// index route
router.get("/", async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    });
  
  
  // new route
  // in this first check that is user logged in .if not then he/she cant create a listing
  router.get("/new",(req,res) =>{
    if(!req.isAuthenticated()){
      req.flash("error","You must be logged in to create a Listing!");
      return res.redirect("/login");
    }
    res.render("listings/new.ejs");
  });
  
  
  //show route
  router.get("/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    // so reviews with details will be populated
    if(!listing){
         req.flash("error","Listing you requested does not exist!");
         res.redirect("/listings");     
    }
    res.render("listings/show.ejs",{ listing });
  });
  //note:humne new route upar likha and show route niche becoz if show upar likhe to ye :id wala new ko bhi ek id smjh leta h to ab aese likhne se pehle /new hai to if new hoga to ye chal jaayeg and niche id wala hai vo chalega when id is there
  
  // create route
  router.post("/",validateListing, wrapAsync(async (req,res,next) =>{
    // let {title,description,image,price,country,location}  = req.body //ye likhna pdta isliye form mai name mai ek listing  object mai ye title decription vhgreh likhe jisse seedha listing likh skte h as written in next line
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      req.flash("success","New Listing Created!");
      res.redirect("/listings");
    })
  );

  // edit route
  router.get("/:id/edit",async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist!");
      res.redirect("/listings");     
 }
    res.render("listings/edit.ejs",{listing});
  })
  
  // update route
  router.put("/:id",validateListing,wrapAsync(async(req,res) =>{
    let{id} = req.params; 
     await Listing.findByIdAndUpdate(id, {...req.body.listing});
     req.flash("success","Listing Updated!");
     res.redirect(`/listings/${id}`);
  })
  );
  
  // delete route
  router.delete("/:id",async (req,res) =>{
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
  })
  
  module.exports = router;