//JS constructor that will be instantiated from the top-level server.js. The app instance is obtained from server.js
//file, passed where the module is being loaded
module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/user.service.server")(app, models);
    require("./services/website.service.server")(app, models);
    require("./services/page.service.server")(app, models);
    require("./services/widget.service.server")(app, models);


    app.get("/say/:something", function(request, response) {
            var msg = request.params['something'];
            response.send({message: msg});
    });

    

    app.get("/users/:id", function(request, response) {
        var id = request.params.id;
        for(var i in users) {
            if(users[i]._id === id) {
                response.send(users[i]);
                return;
            }
        }
        response.send({});
    });
};