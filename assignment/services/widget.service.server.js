module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Basically, the physics behind this fall is similar to that of a moving pendulum. As you fall, the mass beneath you decreases as the average gravitational pull on you from that mass increases. But the mass decreases more quickly, so as you approach the center of the Earth, you start going faster and faster but the force pulling you towards the center also decreases. <br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function uploadImage(request, response) {

        var widgetId      = request.body.widgetId;
        var width         = request.body.width;
        var myFile        = request.file;

        var pageId = request.body.pageId;
        var websiteId = request.body.websiteId;
        var userId = request.body.userId;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //         widgets[i].url = "/uploads/" +filename;
        //     }
        // }

        var url = "/uploads/" +filename;

        widgetModel
            .uploadImage(widgetId, url)
            .then(
                function(stat) {
                    response
                        .redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            )


    }

    function createWidget(request, response) {
        var newWidget = request.body;
        var pageId = request.params.pageId;
        // newWidget._id = (new Date()).getTime()+"";
        // widgets.push(newWidget);
        // response.send(newWidget);

        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function(widget) {
                    response.json(widget);
                },
                function(error) {
                    response.statusCode(400).send(error);
                }
            );

    }

    function findAllWidgetsForPage(request, response) {
        var pageId = request.params.pageId;
        // var resultSet = [];
        // for(var i in widgets) {
        //     if(widgets[i].pageId === pageId) {
        //         resultSet.push(widgets[i]);
        //     }
        // }
        // response.json(resultSet);

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    response.json(widgets);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findWidgetById(request, response) {
        var id = request.params.widgetId
        // for (var i in widgets) {
        //     if (widgets[i]._id === id) {
        //         response.send( widgets[i]);
        //         return;
        //     }
        // }
        // response.status(404).send("Unable to find widget with id: " + id);

        widgetModel
            .findWidgetById(id)
            .then(
                function(widget) {
                    response.json(widget);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function updateWidget(request, response) {
        var id = request.params.widgetId;
        var widget = request.body;
        // for(var i in widgets) {
        //     if(widgets[i]._id === id) {
        //         widgets[i] = widget;
        //         response.send(200);
        //         return;
        //     }
        // }
        // response.send(400);

        widgetModel
            .updateWidget(id, widget)
            .then(
                function(stat) {
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function deleteWidget(request, response) {
        var id = request.params.widgetId;
        // for(var i in widgets) {
        //     if(widgets[i]._id === id) {
        //         widgets.splice(i, 1);
        //         response.send(200);
        //         return;
        //     }
        // }
        // response.send({});

        widgetModel
            .deleteWidget(id)
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