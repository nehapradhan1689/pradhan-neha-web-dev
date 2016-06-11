module.exports = function() {
    var mongoose = require('mongoose');
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website.update({_id: websiteId}, {
            $set: website
        });
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function createWebsite(userId, newWebsite) {
        newWebsite._user = userId;
        return Website.create(newWebsite);

    }

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user": userId});
    }

};