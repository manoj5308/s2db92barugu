const mongoose = require("mongoose") 
const houseSchema = mongoose.Schema({ 
 house_price: String, 
 house_area: String, 
 house_type: String 
}) 
 
module.exports = mongoose.model("house", 
houseSchema) 