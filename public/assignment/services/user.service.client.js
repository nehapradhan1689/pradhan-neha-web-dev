(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    //UserService only knows about data and not about representation
    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;
        
        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username  + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            // console.log(newUser);
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
        
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function createUser(user) {
            // var newUser = {
            //     _id: (new Date()).getTime()+"",
            //     username: user.username,
            //     password: user.password
            // };
            
            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {
            
        }
    }
})();