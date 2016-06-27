var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.post("/api/user", createUser);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.post("/api/logout", logout);
    app.post("/api/login", passport.authenticate('assignment'), login);
    app.get("/api/user", getUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));


    function assignmentLocalStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    }
                    else {
                        done(null, false);
                    }
                },
                function(error) {
                    done(null, error);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function register(request, response) {
        var username = request.body.username;
        var password = request.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user){
                        // console.log("Server service");
                        // console.log(user);
                        response.status(400).send("Username already in use");

                        return;
                    }
                    else {
                        request.body.password = bcrypt.hashSync(request.body.password);
                        return userModel.createUser(request.body);
                    }
                },
                function(error) {
                    response.send(error);
                }
            )
            .then(
                function(user) {
                    if(user) {
                        //Utility function provided by passport
                        request.login(user, function(error) {
                            if(error) {
                                response.status(400).send(error);
                            }
                            else {
                                response.json(user);
                            }
                        });
                    }
                },
                function(error) {
                    response.status(400).send(error);
                }
            );
    }
    
    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    }
                    else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }
    
    function loggedIn(request, response) {
        if(request.isAuthenticated()) {
            response.json(request.user);
        }
        else {
            response.send('0');
        }
    }
    
    function logout(request, response) {
        //Function added by passport to the request object to invalidate the session,
        // cookie and remove the current logged in user from the session.
        request.logout();
        
        response.send(200);
    }

    function login(request, response) {
        //Passport adds the current user to the request.
        var user = request.user;
        response.json(user);
    }

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
            findUserByCredentials(username, password, response, request);
            }
        else if(username) {
            findUserByUsername(username, response);
        }
        else {
            response.send(users);
        }
    }

    function findUserByCredentials(username, password, response, request) {
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
                    // console.log(request.session);
                    request.session.currentUser = user;
                    response.json(user);
                },
                function(error) {
                    response.statusCode(404).send(error);

                }
            );
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

        //console.log(request.session.currentUser);
        
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