(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function RegisterController($routeParams, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifypassword) {
            // if(password != verifypassword) {
            //     vm.error = "Passwords do not match";
            // }
            // else if(UserService.findUserByUsername(username)) {
            //     vm.error = "Username already exists";
            // }
            // else{
            //     var newUser = UserService.createUser(user);
            //     if(newUser) {
            //         $location.url("/user/"+newUser._id);
            //     }
            //     else {
            //         vm.error = "Unable to create user";
            //     }
            // }

            if (username == null || username == "") {
                vm.error = "Please enter username";
            }
            else if(password == null || password == "") {
                vm.error = "Please enter a valid password";
            }
            else if(verifypassword == null || verifypassword == "") {
                vm.error = "Please verify password";
            }
            else if(password != verifypassword) {
                vm.error = "Passwords do not match";
            }
            else {
                var user = {
                    username: username,
                    password: password
                };
                UserService
                    .findUserByUsername(username)
                    .then(function(response) {
                        var userReturned = response.data;
                        if(userReturned) {
                            vm.error = "Username already exists";
                        }
                        else{
                            UserService
                                .createUser(user)
                                .then(function(response) {
                                    var newUser = response.data;
                                    if(newUser) {
                                        $location.url("/user/"+newUser._id);
                                    }
                                    else {
                                        vm.error = "Unable to create user";
                                    }
                                });
                        }
                    });
            }
        }
    }
})();