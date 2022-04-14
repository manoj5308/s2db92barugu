var house = require('../models/house');
// List of all house
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
exports.house_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: house create POST');
};
// Handle house delete form on DELETE.
exports.house_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: house delete DELETE ' + req.params.id);
};
// Handle house update form on PUT.
exports.house_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await house.findById(req.params.id)
        // Do updates of properties
        if (req.body.house_type)
            toUpdate.house_type = req.body.house_type;
        if (req.body.cost) toUpdate.cost = req.body.house_continent;
        if (req.body.size) toUpdate.size = req.body.house_populationranking;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
};