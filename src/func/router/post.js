const express = require('express');

const bcryptjs = require('bcryptjs');

const {pool} = require('../db/db.js');

const router = express.Router();

const title = 'AccountJS'

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordHash = await bcryptjs.hash(password, 8);
    pool.query(`SELECT * FROM tbl_users WHERE username = '${username}'`, async (err, result) => {
        if (err) throw err;
        if (result[0] != undefined) {
            res.render('register', {
                title: title,
                alert: true,
                alertTitle: 'Register Error',
                alertMessage: 'This is Account is Already Exist, Try Again',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 5000,
                route: '/register'
            })
        } else if(result[0] == undefined) {
            pool.query(`INSERT INTO tbl_users (username, email, password) VALUES ('${username}', '${email}', '${passwordHash}')`, async (err,result) => {
                if(err) throw err;
                req.session.loggeded = true;
                req.session.username = username;
                res.render('register', {
                    title: title,
                    alert: true,
                    alertTitle: 'Register Succes',
                    alertMessage: '',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    route: '/profile'
                })
            })
        }
    })
})

router.post('/auth', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username && password) {
        pool.query(`SELECT * FROM tbl_users WHERE username = '${username}'`, async (err,result) => {
            if (err) throw err;
            if (result.length == 0 || !(await bcryptjs.compare(password, result[0].password))) {
                res.render('login', {
                    title: 'MetaService',
                    alert: true,
                    alertTitle: 'Username or Password Incorrect',
                    alertMessage: 'Please Try Again',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 15000,
                    route: '/login'
                })
            } else {                
                req.session.loggeded = true;
                req.session.username = result[0].username;
                res.render('login', {
                    title: 'MetaService',
                    alert: true,
                    alertTitle: 'Login Correct',
                    alertMessage: '',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    route: '/profile'
                })
            }
        })
    }
})

router.post('/contact/:username/add', async (req, res) => {
    const username = req.params.username;
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    pool.query(`INSERT INTO tbl_contacts (id, username, name, email, number) VALUES (${null}, '${username}', '${name}', '${email}', '${number}')`, async (err, result) => {
        if (err) throw err;
        res.render('add', {
            title: title,
            user: username,
            alert: true,
            alertTitle: 'Your contact has been added successfully',
            alertMessage: '',
            alertIcon: 'success',
            showConfirmButton: true,
            timer: 5500,
            route: `/profile/${username}/contacts`
        })
    })
})

router.post('/contacts/:username/update/:name/:id', async (req, res) => {
    let username = req.params.username
    let name = req.params.name
    let id = req.params.id
    const new_name = req.body.name
    const email = req.body.email
    const number = req.body.number
    pool.query(`UPDATE tbl_contacts SET name = '${new_name}', email = '${email}', number = '${number}' WHERE username = '${username}' AND name = '${name}' AND id = ${id}`, async (err,result) => {
        if (err) throw err;
        res.render('add', {
            title: title,
            user: username,
            alert: true,
            alertTitle: 'Your Contact has been Update Succesfully',
            alertMessage: '',
            alertIcon: 'success',
            showConfirmButton: true,
            timer: 6000,
            route: `/profile/${username}/contacts`
        })
    })
})

module.exports = router;