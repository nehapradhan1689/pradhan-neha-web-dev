module.exports = function() {
    //MongoDB has no notion of what schemas are. This is enforced in the application.
    var mongoose = require('mongoose');
    var WebsiteSchema = require("../website/website.schema.server")();

    //Good practice to declare one schema per file
    //Primary key is by default managed by the DB.
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        email: String,
        phone: String,
        website: [WebsiteSchema],
        dob: Date,
        //Creates a Date object out of the CPU time
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});

    return UserSchema;

};