//Gives a high level API to interact with the DB. Only DB operations should be done here.
module.exports = function() {

    var mongoose = require('mongoose');

    var FlixUserSchema = require("./flixuser.schema.server.js")();

    //This User object is the one that allows to actually create an instance of a User to write to the DB.
    var FlixUser = mongoose.model("FlixUser", FlixUserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findGoogleUser: findGoogleUser,
        updateUser: updateUser,
        uploadImage: uploadImage,
        deleteUser: deleteUser

    };
    return api;

    function uploadImage(userId, url) {
        return FlixUser.update({_id: userId}, {
            $set: {url: url}
        });
    }

    function deleteUser(userId) {
        return FlixUser.remove({_id: userId});
    }

    function updateUser(userId, newUser) {
        delete newUser._id;
        return FlixUser.update({_id: userId}, {
            $set: newUser
        });
    }

    // function findFacebookUser(id) {
    //     return User.findOne({"facebook.id": id});
    // }

    function findGoogleUser(id) {
        return FlixUser.findOne({"google.id": id});
    }

    function findUserByUsername(username) {
        return FlixUser.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return FlixUser.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return FlixUser.findById(userId); //This returns just one object and not an array
    }

    function createUser(user){
        // console.log("user.model.server.createUser()");
        // console.log(user);
        return FlixUser.create(user);
        
    }

};