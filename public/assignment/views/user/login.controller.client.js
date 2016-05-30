(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    //Controller handles the js part of the login page
    //LoginController is a constructor that creates an instance of the Controller.
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user) {
                $location.url("/user/"+user._id);
            }
            else {
                vm.error = "User not found";
            }
        }
    }
})();