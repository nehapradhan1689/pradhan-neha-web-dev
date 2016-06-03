module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUser);
    app.get("/api/user/:userId", findUserById);


    function createUser(request, response) {
        var user = request.body;
        user._id = (new Date()).getTime()+"";
        users.push(user);
        //console.log(users);
        response.send(user);
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
        for(var i in users) {
            if(users[i].username === username && users[i].password === password){
                response.send(users[i]);
                return;
            }
        }
        return response.send({});
    }

    function findUserByUsername(username, response) {
        for(var i in users) {
            if(users[i].username === username){
                response.send(users[i]);
                return;
            }
        }
        return response.send({});
    }
    
    function findUserById(request, response) {
        var id = request.params.userId;
        for(var i in users) {
            if(users[i]._id === id) {
                response.send(users[i]);
                return;
            }
        }
        response.send({});
    }
};