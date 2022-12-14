const mongoose = require("mongoose");

const MonSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true, 'name is required'],
        minLength: [3, 'Name must at least 3 characters'],
    },
    strength: {
        type: Number,
        required: [true, 'strength level is required'],
        min: [0, 'strength cannot be lower than 0']
    },
    health: {
        type: Number,
        required: [true, 'health level is required'],
        min: [0, 'Health cannot be lower than 0']
    },
    nature: {
        type: String,
        required: [true, 'monsters nature is required'],
        maxLength: [20, 'description must be one word prefferably']
    },
    speed: {
        type: Number,
        required: [true, 'speed is required'],
        min: [0, 'Speed cannot be slower than 0']
    },
    level: {
        type:Number,
        required: [true, 'level is required'],
        min: [0, 'level cannot be negative']
    },
    element: {
        type: String,
        required: [true, 'element is required'],
        minLength: [0, 'element must be at least one character']
    },
    image: {
        url: String,
        public_id: String
    },
    like: {
        type: Number
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    

}, {timestamps: true})

const Mon = mongoose.model("Mon", MonSchema);

module.exports = Mon;