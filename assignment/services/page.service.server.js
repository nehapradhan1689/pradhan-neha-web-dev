module.exports = function(app, models) {

    var pageModel = models.pageModel;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    
    function createPage(request, response) {
        var newPage = request.body;
        var websiteId = request.params.websiteId;
        // newPage._id= (new Date()).getTime()+"";
        // pages.push(newPage);
        // response.send(newPage);

        pageModel
            .createPage(websiteId, newPage)
            .then(
                function(page) {
                    response.send(page);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findAllPagesForWebsite(request, response) {
        var websiteId = request.params.websiteId;
        // var resultSet = [];
        // for(var i in pages) {
        //     if(pages[i].websiteId === websiteId) {
        //         resultSet.push(pages[i]);
        //     }
        // }
        // response.json(resultSet);

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    response.send(pages);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findPageById(request, response) {
        var id = request.params.pageId;
        // for(var i in pages) {
        //     if(pages[i]._id === id) {
        //         response.send(pages[i]);
        //         return;
        //     }
        // }
        // response.send({});

        pageModel
            .findPageById(id)
            .then(
                function(page) {
                    response.send(page);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function updatePage(request, response) {
        var id = request.params.pageId;
        var page = request.body;
        // for(var i in pages) {
        //     if(pages[i]._id === id) {
        //         pages[i].name = page.name;
        //         pages[i].title = page.title;
        //         response.send(200);
        //         return;
        //     }
        // }
        // response.send(400);

        pageModel
            .updatePage(id, page)
            .then(
                function(stat) {
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function deletePage(request, response) {
        var id = request.params.pageId;
        // for(var i in pages) {
        //     if(pages[i]._id === id) {
        //         pages.splice(i, 1);
        //         response.send(200);
        //         return;
        //     }
        // }
        // response.send(400);

        pageModel
            .deletePage(id)
            .then(
                function(stat) {
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

};