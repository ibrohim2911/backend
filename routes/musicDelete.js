const express = require('express');
const router = express.Router();
const Music = require('../model/Music');

/* GET users listing. */
router.get('/delete/:id', function(req, res, next) {

  Music.findByIdAndDelete(req.params.id, (err, musics) => {
    console.log(musics)
        if(err) console.log(err);
        else{
            res.redirect('/')
        }
  })
});
module.exports = router;
