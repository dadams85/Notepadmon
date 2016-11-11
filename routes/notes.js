var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/note');


router.get('/', function(req, res) {
  Note.find( function(err, notes) {
    res.render('notes', { notes: notes});
  });
});

router.post('/', function(req, res) {
  new Note({
    title: req.body.title,
    description: req.body.description,
    updatedAt: Date.now()
  }).save( function(err,note) {
    res.redirect('/notes');
  });
});

router.post('/:id', function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    Note.remove( function() {
      res.redirect('/notes');
    });
  });
});

router.get('/:id', function(req, res){
  Note.findById(req.params.id, function(err, note){
    res.render('note', {note: note});
  });
});

router.post('/edit/:id', function(res, res) {
  Note.findById(req.params.id, function(err, res) {
   note.title =req.body.title;
   note.description = req.body.description;
   note.updatedAt = Date.now();
   note.save( function() {
    res.redirect('/notes');
  });
  });
});

module.exports = router;
