(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        // var id = $routeParams.uid;

        var id = $rootScope.currentUser._id;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();
        
        function logout() {
            
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(error) {
                        $location.url("/login");
                    }
                );
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(function() {
                    $location.url("/login");
                },
                function () {
                    vm.error = "Unable to remove user";
                });
            
        }

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(function(response) {
                    vm.success = "Success! Your profile was updated successfully"

                }, function(error) {
                    vm.error = "Unable to update user";
                })

        }
    }
})();