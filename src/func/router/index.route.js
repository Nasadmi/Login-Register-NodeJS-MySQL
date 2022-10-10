const express = require('express');

const router = express.Router();

const title = 'AccountJS';

router.get('/', (req,res) => {
    res.render('index', {
        title: title
    })
})

router.get('/contact', (req,res) => {
    res.render('contact', {
        title: title
    })
})

router.get('/about', (req,res) => {
    res.render('about', {
        title: title
    })
})

module.exports = router;