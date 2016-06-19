(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    //UserService only knows about data and not about representation
    function UserService($http) {

        var api = {
            createUser: createUser,
            register: register,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }
        
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            //console.log(user);
            return $http.post("/api/login", user);
        }
        
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
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
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
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();