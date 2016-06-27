var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, models) {

    var flixUserModel = models.flixUserModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    // app.get("/auth/facebook", passport.authenticate('facebook'));
    // app.get("/auth/facebook/callback",
    //     passport.authenticate('facebook', {
    //         successRedirect: '/assignment/#/user',
    //         failureRedirect: '/assignment/#/login'
    //     }));/auth/google
    app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.post("/api/user", createUser);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.post("/api/logout", logout);
    app.post("/api/login", passport.authenticate('project'), login);
    app.get("/api/user", getUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use('google', new GoogleStrategy(googleConfig, googleLogin));

    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // };
    //
    // passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));


    function projectLocalStrategy(username, password, done) {
        // console.log("Serverservice");
        // console.log(username+" "+password);
        flixUserModel
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
        flixUserModel
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
        // console.log("Register server service");
        // console.log(username + " " + password);
        flixUserModel
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
                        return flixUserModel.createUser(request.body);
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
    
    function googleLogin(token, refreshToken, profile, done) {
        // response.send(200);
        flixUserModel
            .findGoogleUser(profile.id)
            .then(
                function(googleUser) {
                    if (googleUser) {
                        return done(null, googleUser);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var splitEmail = email.split("@");
                        var googleUser = {
                            username: splitEmail[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        flixUserModel
                            .createUser(googleUser)
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

    function uploadImage(request, response) {
        
        var myFile = request.file;
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

        flixUserModel
            .uploadImage(userId, url)
            .then(
                function(stat) {
                    response
                        .redirect("/project/#/user");
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            )


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

        flixUserModel
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

        flixUserModel
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

        flixUserModel
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

        flixUserModel
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
        flixUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    response.json(user);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }
    
    function findUserById(request, response) {
        var id = request.params.userId;

        //console.log(request.session.currentUser);

        flixUserModel
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