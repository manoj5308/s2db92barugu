const mongoose = require("mongoose") 
const houseSchema = mongoose.Schema({ 
 house_price: String, 
 house_area: String, 
 house_type: {
     type: String,
     minlength: 5,
     maxlength: 10

 }
}) 
 
module.exports = mongoose.model("house", 
houseSchema) 