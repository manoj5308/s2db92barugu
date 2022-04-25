var house = require('../models/house');

// for a specific house.
exports.house_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await house.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle house create on POST.
exports.house_create_post = async function(req, res) {
    console.log(req.body)
    let document = new house();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.house_price = req.body.house_price;
    document.house_area = req.body.house_area;
    document.house_type = req.body.house_type;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

// Handle house update form on PUT.
exports.house_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await house.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.house_price)  
               toUpdate.house_price = req.body.house_price; 
        if(req.body.house_area) toUpdate.house_area = req.body.house_area; 
        if(req.body.house_type) toUpdate.house_type = req.body.house_type; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 

// List of all Costumes 
exports.house_list = async function(req, res) { 
    try{ 
        thehouses = await house.find(); 
        res.send(thehouses); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// VIEWS
// Handle a show all view
exports.house_view_all_Page = async function(req, res) {
    try{
    thehouses = await house.find();
    res.render('house', { title: 'house Search Results', results: thehouses });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

   exports.house_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await house.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };

   exports.house_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await house.findById( req.query.id)
    res.render('housedetail',{ title: 'House Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   exports.house_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('housecreate', { title: 'House Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   exports.house_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await house.findById(req.query.id)
    res.render('houseupdate', { title: 'House Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   exports.house_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await house.findById(req.query.id) 
        res.render('housedelete', { title: 'House Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

