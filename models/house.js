const mongoose = require("mongoose") 
const houseSchema = mongoose.Schema({ 
 house_type: String, 
 size: String, 
 cost: Number 
}) 
 
module.exports = mongoose.model("house", 
houseSchema) 