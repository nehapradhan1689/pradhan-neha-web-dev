module.exports = function() {
    //MongoDB has no notion of what schemas are. This is enforced in the application.
    var mongoose = require('mongoose');

    //Good practice to declare one schema per file
    //Primary key is by default managed by the DB.
    var WebsiteSchema = mongoose.Schema({
        //Reference to parent
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: {type: String, required: true},
        description: String,
        //Creates a Date object out of the CPU time
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});

    return WebsiteSchema;

};