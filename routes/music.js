const express = require('express');
const eA = require('../middleware/eA');
const router = express.Router();
const Music = require('../model/Music');

/* GET users listing. */
router.get('/:id', eA, function(req, res, next) {

  Music.findById(req.params.id, (err, musics) => {
    res.render('music', {
        title: "Music Sahifasi",
        musics
    } )
  })
});


router.post('/:id', function(req, res, next) {
    console.log('yangilandi');
});

module.exports = router;
