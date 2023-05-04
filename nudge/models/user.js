const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type:String,
    uid: String,
    name: String,
    tagline:{
        type: String,
        index: true,
        unique: true,
      },
    schedule: String,
    description:String,
    files:String,
    moderator:String,
    category:String,
    sub_category:String
    ,rigor_rank:String,
    attendees:String
})
module.exports = mongoose.model('users', userSchema)