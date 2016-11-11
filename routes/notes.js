var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/note');

/* GET the notes */
router.get('/', function(req, res) {
  Note.find( function(err, notes) {
    res.render('notes', { notes: notes});
  });
});

/* POST add note */
router.post('/', function(req, res) {
  new Note({
    title: req.body.title,
    description: req.body.description,
    updatedAt: Date.now()
  }).save( function(err,note) {
    res.redirect('/notes');
  });
});

/* DELETE a note */
router.post('/:id', function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    note.remove( function() {
      res.redirect('/notes');
    });
  });
});


router.get('/:id', function(req, res){
  Note.findById(req.params.id, function(err, note){
    res.render('note', {note: note});
  });
});

router.post('/edit/:id', function(req, res) {
  console.log(req.body);
  Note.findById(req.params.id, function(err, note) {
   note.title =req.body.title;
   note.description = req.body.description;
   note.updatedAt = Date.now();
   note.save( function() {
    res.redirect('/notes');
  });
  });
});

module.exports = router;
