const express = require('express');

const router = express.Router();

const {pool} = require('../db/db.js');

const title = 'AccountJS'

router.get('/login', (req, res) => {
    res.render('login', {
        title: title,
        alert: false,
        alertTitle: undefined,
        alertMessage: undefined,
        alertIcon: undefined,
        showConfirmButton: undefined,
        timer: undefined,
        route: undefined
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: title,
        alert: false,
        alertTitle: undefined,
        alertMessage: undefined,
        alertIcon: undefined,
        showConfirmButton: undefined,
        timer: undefined,
        route: undefined
    })
})

router.get('/profile', (req,res) => {
    if(req.session.loggeded == true) {
        req.session.userloggeded = req.session.username;
        res.redirect(`/profile/${req.session.username}`);
    } else {
        res.render('404', {
            title: title,
            alertTitle: 'Error 404',
            alertMessage: 'Page Not Found',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: 5000,
            route: '/'
        })
    }
})

router.get('/profile/:username', (req,res) => {
    let username = req.params.username;
    pool.query(`SELECT * FROM tbl_users WHERE username = '${username}'`, async (err, result) => {
        if (err) throw err;
        if (result[0] == undefined) {
            res.redirect('/profile')
        } else {
            if(req.session.userloggeded == result[0].username) {
                pool.query(`SELECT * FROM tbl_users WHERE username = '${req.params.username}'`, (err,result) => {
                    if (err) throw err;
                    res.render('profile', {
                        title: title,
                        user: result
                    })
                })
            } else{
                res.redirect('/profile')
            }
        }
    })
})

router.get("/profile/:username/logout", (req, res) => {
    let username = req.params.username;
    if (req.session.userloggeded == username && req.session.loggeded == true) {
        req.session.userloggeded = undefined;
        req.session.loggeded = false;
        req.session.username = undefined;
        res.redirect("/");
    } else {
      res.redirect("/profile");
    }
  });

router.get('/profile/:username/contacts', (req,res) => {
    let username = req.params.username;
    if (req.session.userloggeded == username && req.session.loggeded == true) {
        pool.query(`SELECT * FROM tbl_contacts WHERE username = '${username}'`, (err,result) => {
            if (err) throw err;
            res.render('contacts', {
                title: title,
                user: username,
                data: result
            })
        })
    } else {
        res.redirect("/profile");
    }
})

module.exports = router;