const express = require('express');

const {pool} = require('../db/db.js')

const router = express.Router();

const title = 'AccountJS';

router.get('/profile/:username/contacts/add', (req,res) => {
    let username = req.params.username;
    if (req.session.userloggeded == username && req.session.loggeded == true) {
        res.render('add', {
            title: title,
            user: username,
            alert: false,
            alertTitle: undefined,
            alertMessage: undefined,
            alertIcon: undefined,
            showConfirmButton: undefined,
            timer: undefined,
            route: undefined
        })
    } else {
        res.redirect("/profile");
    }
})

router.get('/profile/:username/contacts/delete/:name/:id', (req,res) => {
    let username = req.params.username
    let name = req.params.name
    let id = req.params.id
    if (req.session.userloggeded == username && req.session.loggeded == true) {
        pool.query(`DELETE FROM tbl_contacts WHERE username = '${username}' AND name = '${name}' AND id = ${id}`, (err,result) => {
            if (err) throw err;
            res.redirect(`/profile/${username}/contacts`)
        })
    } else {
        res.redirect("/profile");
    }
})

router.get('/profile/:username/contacts/edit/:name/:id', (req,res) => {
    let username = req.params.username
    let name = req.params.name
    let id = req.params.id
    if (req.session.userloggeded == username && req.session.loggeded == true) {
        pool.query(`SELECT * FROM tbl_contacts WHERE username = '${username}' AND name = '${name}' AND id = ${id}`, (err,result) => {
            if(err) throw err;
            res.render('edit', {
                title: title,
                user: username,
                data: result,
                alert: false,
                alertTitle: undefined,
                alertMessage: undefined,
                alertIcon: undefined,
                showConfirmButton: undefined,
                timer: undefined,
                route: undefined
            })
        })
    } else {
        res.redirect("/profile");
    }
})

module.exports = router;