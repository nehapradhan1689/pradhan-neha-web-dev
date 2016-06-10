//Entry point for interacting with the DB
module.exports = function() {

    var mongoose = require('mongoose');
    //This connects to the DB cs5610summer1, if this DB doesn't exist it creates a new one with the same name.
    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server")()
    };
    return models;
};