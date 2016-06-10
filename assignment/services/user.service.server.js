module.exports = function(app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function deleteUser(request, response) {
        var id = request.params.userId;
        // for(var i in users) {
        //     if(users[i]._id === id) {
        //         users.splice(i, 1);
        //         //console.log(users);
        //         response.send(200);
        //         return;
        //     }
        // }
        // response.send(400);

        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    //console.log(stats);
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function updateUser(request, response) {
        var id = request.params.userId;
        var newUser = request.body;
        // for(var i in users) {
        //     if(users[i]._id === id) {
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         response.send(200);
        //         return;
        //     }
        // }
        // response.send(400);

        userModel
            .updateUser(id, newUser)
            .then(
                function(stat) {
                    //console.log(stat);
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }


    function createUser(request, response) {
        var user = request.body;

        userModel
            .createUser(user)
            .then(
                function(user) {
                    // console.log(user);
                    response.json(user);
                },
                function(error) {
                    response.statusCode(400).send(error);
                }
            );


        // console.log("createUser");
        // console.log(user);

        // user._id = (new Date()).getTime()+"";
        // users.push(user);
        // response.send(user);
    }

    function getUser(request, response) {
        var username = request.query['username'];
        var password = request.query['password'];
        //console.log(username);
        //console.log(password);
        if(username && password) {
            findUserByCredentials(username, password, response);
            }
        else if(username) {
            findUserByUsername(username, response);
        }
        else {
            response.send(users);
        }
    }

    function findUserByCredentials(username, password, response) {
        // for(var i in users) {
        //     if(users[i].username === username && users[i].password === password){
        //         response.send(users[i]);
        //         return;
        //     }
        // }
        // return response.send({});

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    response.json(user);
                },
                function(error) {
                    response.statusCode(404).send(error);

                }
            )
    }

    function findUserByUsername(username, response) {
        // for(var i in users) {
        //     if(users[i].username === username){
        //         response.send(users[i]);
        //         return;
        //     }
        // }
        // return response.send({});
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    response.json(user);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            )
    }
    
    function findUserById(request, response) {
        var id = request.params.userId;
        
        userModel
            .findUserById(id)
            .then(
                function(user) {
                    response.json(user);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            )
        // for(var i in users) {
        //     if(users[i]._id === id) {
        //         response.send(users[i]);
        //         return;
        //     }
        // }
        // response.send({});
    }
};