const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
    //mongoose-local-scema mai already username and pswd hota hi h h to usko schema mai define krne ki jrururat nhi hai and ye krta hai plugin
});

userSchema.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('User',userSchema);