(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function RegisterController($routeParams, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifypassword) {
            var user = {
                username: username,
                password: password,
                verifypassword: verifypassword
            };
            if(password != verifypassword) {
                vm.error = "Passwords do not match";
            }
            else if(UserService.findUserByUsername(username)) {
                vm.error = "Username already exists";
            }
            else{
                var newUser = UserService.createUser(user);
                if(newUser) {
                    $location.url("/user/"+newUser._id);
                }
                else {
                    vm.error = "Unable to create user";
                }
            }
        }
    }
})();