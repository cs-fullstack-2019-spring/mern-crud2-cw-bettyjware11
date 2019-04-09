let express = require('express');
let router = express.Router();
let RSVPCollection = require('../models/RSVPSchema');

/*
    ENDPOINT IMPLEMENTATION OF A SIMPLE RSVP WEB SERVICE
 */
// Return the list of all the current RSVPs
router.get('/list', function (req, res, next) {
    // console.log(`LIST RSVPS`);
    RSVPCollection.find({}, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    })
});

// Get a specific RSVP
router.get('/:id', function (req, res, next) {
    console.log(`LIST RSVP ${req.params.id}`);
    RSVPCollection.find({_id: req.params.id}, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    })

});

//to update is a two step process...first you have to find what you want to update by id
router.get('/edit/:id', (req, res)=>{
    RSVPCollection.findOne({rsvp_person:req.params.id},
        (errors, results)=>{
            if(errors) res.send(errors);
            else res.send(results);
        });
});

//the second part of the update...
router.put('/:id', function (req, res, next) {
    console.log(`UPDATE RSVP ${req.body.rsvp_person} ${req.body.rsvp_going}`);
    RSVPCollection.findOneAndUpdate({_id: req.params.id}, req.body, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    });
});

// Delete a specific RSVP -IMPLEMENT YOUR OWN FUNCTION
router.delete('/:id', (req, res)=>{
    RSVPCollection.deleteOne(req.body, (errors, results)=>{
        if(errors) res.send(errors);
        else res.send("DELETED!!!");
    });
});

//Create a new RSVP -IMPLEMENT YOUR OWN FUNCTION
router.post('/add', (req, res)=>{
    RSVPCollection.create(req.body, (errors, results)=>{
        if(errors) res.send(errors);
        else res.send("ADDED!!!");
    });
});

module.exports = router;
