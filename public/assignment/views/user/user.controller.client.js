(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    //Controller handles the js part of the login page
    function LoginController($location) { //LoginController is a constructor that creates an instance of the Controller.
        var vm = this;
        vm.login = login;



        function login(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    //url function allows us to retrieve the URL, read the URL and set it.
                    $location.url("/profile/"+users[i]._id);
                }
                else {
                    vm.error = "User not found";
                }
            }
        }
    }

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function ProfileController($routeParams) {
        var vm = this;
        var id = $routeParams.id;
        var index = -1;
        vm.updateUser = updateUser;

        for(var i in users) {
            if(users[i]._id === id) {
                vm.user = users[i];
                index = i;
            }
        }

        function updateUser(newUser) {
            console.log(newUser);
            users[index].firstName = newUser.firstName;
            users[index].lastName = newUser.lastName;
        }
    }
})();