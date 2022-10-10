const express = require('express');

const session = require('express-session');

const {connect} = require('./func/db/db.js');

const router_index = require('./func/router/index.route.js');

const router_user = require('./func/router/user.route.js');

const router_contact = require('./func/router/contact.route.js');

const post = require('./func/router/post.js');

const error = require('./func/others/error.js');

const path = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }
))

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(post)

app.use(router_index);

app.use(router_user);

app.use(router_contact);

app.use(error)

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server is listening on port',app.get('port'));
})

connect()