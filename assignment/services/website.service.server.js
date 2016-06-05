module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    
    function createWebsite(request, response) {
        var newWebsite = request.body;
        
        newWebsite._id = (new Date()).getTime()+"";
        websites.push(newWebsite);
        //console.log(websites);
        response.send(newWebsite);
        }

    function findAllWebsitesForUser(request, response) {
        var id = request.params.userId;
        var resultSet = [];
        for(var w in websites) {
            if(websites[w].developerId === id) {
                resultSet.push(websites[w]);
            }
        }
        response.json(resultSet);
    }

    function findWebsiteById(request, response) {
        var id = request.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === id) {
                response.send(websites[i]);
                return;
            }
        }
        response.send({});
    }

    function updateWebsite(request, response) {
        var id = request.params.websiteId;
        var website = request.body;
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                response.send(200);
                return;
            }
        }
        response.send(400);
    }

    function deleteWebsite(request, response) {
        var id  = request.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites.splice(i, 1);
                response.send(200);
                return;
            }
        }
        response.send(400);
    }

};