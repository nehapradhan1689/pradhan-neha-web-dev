//Gives a high level API to interact with the DB. Only DB operations should be done here.
module.exports = function() {

    var mongoose = require('mongoose');

    var UserSchema = require("./user.schema.server")();

    //This User object is the one that allows to actually create an instance of a User to write to the DB.
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser

    };
    return api;

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, newUser) {
        delete newUser._id;
        return User.update({_id: userId}, {
            $set: {
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return User.findById(userId); //This returns just one object and not an array
    }

    function createUser(user){
        // console.log("user.model.server.createUser()");
        // console.log(user);
        return User.create(user);
        
    }

};