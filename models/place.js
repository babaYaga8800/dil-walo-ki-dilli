var mongoose= require('mongoose')
var placeSchema=new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

var Place=mongoose.model("Place",placeSchema)
module.exports=Place