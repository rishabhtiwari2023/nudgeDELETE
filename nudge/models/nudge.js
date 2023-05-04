const mongoose = require('mongoose')
let nudgeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    articel:String,
    title:String,
    imagePath:String,
    _From:Date(),
    _To:Date(),
    time:String,
    desc:String,
    Iconpath:String,
    check:Boolean
})
module.exports = mongoose.model('nudge', nudgeSchema)