module.exports = {
    signup: require('./users/signup'),

    login: require('./users/login'),

    userinfo: require('./users/userinfo'),

    fixuserinfo: require('./users/fixuserinfo'),
    
    logout: require('./users/logout'),

    dropuser: require('./users/dropuser'),

    itemregister: require('./stores/itemregister'),

    dropitem: require('./stores/dropitem'),

    fixiteminfo: require('./stores/fixiteminfo'),

    allstoredata: require('./stores/allstoredata')
}
