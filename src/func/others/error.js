const error404 = (req,res) => {
    let error = new Error()
    error404.status = 404;
    res.render('404', {
        title: 'AccountJS',
        alertTitle: 'Error 404',
        alertMessage: 'Page Not Found',
        alertIcon: 'error',
        showConfirmButton: true,
        timer: 5000,
        route: '/'
    })
}

module.exports = error404;