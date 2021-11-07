const express = require('express');
const axios   = require('axios');
const env     = require('dotenv').config();

const router  = express.Router();

//let Supplier  = require('../models/supplier');

// display suppliers
router.get('/', async(req, res) => {

var agents = [];
var hotels = [];

  if (process.env.HOST){

    axios.post(process.env.HOST+'/db/getRecord',{
      "fields":["*"],
      "orders":["Organisation"],
      "table":"dbo.fn_addressbook(2,'A')"
    })
    .then(function (response) {
      agents = response.data ;
console.log(agents)
    })
    .catch(function (error) {
      console.log(error);
      res.render('suppliers', { msg: error, data: [] });
    })
    .then(function () {
      // always executed
    });


    axios.post(process.env.HOST+'/db/getRecord',{
      "fields":["*"],
      "orders":["Organisation"],
      "table":"dbo.fn_addressbook(2,'H')"
    })
    .then(function (response) {
      hotels = response.data;
    })
    .catch(function (error) {
      console.log(error);
      res.render('suppliers', { msg: error, data: [] });
    })
    .then(function () {
      // always executed
    });

    res.render('suppliers', { 'hotels': hotels, 'agents': agents });

  } else {
    res.render('suppliers', { show: 'show', msg: 'Host ip is not on file' });  
  }
});


// get a specific supplier
router.get('/:id', async(req, res) => {

  var data = [];
  
  if (process.env.HOST){

    axios.post(process.env.HOST+'/db/getRecord',{
      "fields":["*"],
      "orders":["Organisation"],
      "table":"dbo.fn_addressbook(2,'A')"
    })
    .then(function (response) {
      data = response.data ;

    })
    .catch(function (error) {
      console.log(error);
      res.render('supplier', { msg: error, data: [] });
    })
    .then(function () {
      // always executed
    });

    res.render('supplier', { 'data': data });
    console.log(data)

  } else {
    res.flash('danger','Host ip is not on file');
    res.render('supplier', { show: 'show', msg: 'Host ip is not on file' });  
  }


});

// add a supplier
router.post('/add', ensureAuthenticated, function(req, res){
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.check('email').isEmail;

  const errors = validationResult(req);

  if(errors){
    res.render('add_supplier',{
      title: 'Add Supplier',
      errors:errors 
    });
  } else {
    let supplier = new Supplier();
    supplier.name  = req.body.name;
    supplier.email = req.body.email;

    supplier.save(function(err){
      if (err) {
        console.log(err)
        return;
      } else {
        req.flash('success','Supplier added');
        res.direct('/');
      }
    });
  }
});

// edit a supplier form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  supplier.findById(req.params.id,function(err,supplier){
    // if(supplier.author != req.user._id){
    //  req;flash('danger','Not authorised');
    //  res.redirect('/');
    //}
    res.render('supplier_edit',{
      title: "Edit Supplier",
      supplier: supplier
    });
  });
});

// process a new supplier
router.post('/edit/:id', ensureAuthenticated, function(req, res){
  let supplier = {};
  supplier.name = req.body.name;
  supplier.email = req.body.email;

});

// delete a supplier
router.delete('/id',function(req, res){

  if (!req.user.id){
    res.status(500).send();
  }

  Supplier.findById(req.params.id, function(err,supplier){
    if(supplier.author != req.user.id){
      res.status(500).send();
    } else {
      Supplier.remove({_id:req.params.id}, function(err){
        if (err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

router.post('/login', async(req, res) => {

  var data = [];
  
  if (process.env.HOST){

    axios.post(process.env.HOST+'/db/getRecord',{
      "fields":["*"],
      "orders":["Organisation"],
      "table":"dbo.fn_addressbook(2,'A')"
    })
    .then(function (response) {
      data = response.data ;

    })
    .catch(function (error) {
      console.log(error);
      res.render('login', { msg: error, data: [] });
    })
    .then(function () {
      // always executed
    });

    res.render('login', { 'data': data });
    console.log(data)

  } else {
    res.flash('danger','Host ip is not on file');
    res.render('login', { show: 'show', msg: 'Host ip is not on file' });  
  }
});


function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger',"You are not logged in");
    res.redirect('/users/login');
  }
}

module.exports = router;