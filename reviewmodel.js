const mongoose=require("mongoose")

const review=new mongoose.Schema({
    taskProvider:{
        type:String,
        required:true
    },

    taskWorkers:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('review',review)