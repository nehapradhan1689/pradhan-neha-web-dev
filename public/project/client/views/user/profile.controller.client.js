(function() {
    angular
        .module("Flix")
        .controller("ProfileController", ProfileController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function ProfileController($routeParams, FlixUserService, $location, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.isFollowing = isFollowing;
        vm.unfollowUser = unfollowUser;
        vm.followUser = followUser;
        vm.getMovieInfo = getMovieInfo;
        vm.getUserProfile = getUserProfile;

        // var id = $routeParams.uid;

        var id = $rootScope.currentUser._id;
        //vm.userId = id;

        console.log("Profile Controller");

        function init() {
            FlixUserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                    // getFollowersAndFollowing();
                    // vm.dob = new Date("2012-07-14T01:00:00+01:00").getYear("YYYY");
                    // console.log(vm.dob);

                });
        }
        init();

        function isFollowing(id) {
            var follows = false;
            for(var i in vm.user.following) {
                if(vm.user.following[i].userId == id) {
                    follows = true;
                    break;
                }
            }
            return follows;            
        }

        function logout() {

            FlixUserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(error) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );
        }

        function unregister() {
            FlixUserService
                .deleteUser(id)
                .then(function() {
                        $location.url("/login");
                    },
                    function () {
                        vm.error = "Unable to remove user";
                    });

        }

        function updateUser(newUser) {
            console.log("Hello");
            FlixUserService
                .updateUser(id, newUser)
                .then(function(response) {
                    vm.success = "Success! Your profile was updated successfully";

                }, function(error) {
                    vm.error = "Unable to update user";
                })

        }
        
        function unfollowUser(userId) {
            for(var i in vm.user.following) {
                if(vm.user.following[i].userId == userId) {
                    vm.user.following.splice(i, 1);
                }
            }

            FlixUserService
                .updateUser(vm.user._id, vm.user)
                .then(function(stat) {
                    updateFollowingUser(userId)
                        init();
                    },
                    function(error) {
                        vm.error = "Error in updating logged in user details";
                    });
        }

        function updateFollowingUser(userId) {
            FlixUserService
                .findUserById(userId)
                .then(
                    function(response) {
                        var userToUpdate = response.data;
                        for(var i in userToUpdate.followers) {
                            if(userToUpdate.followers[i].userId == vm.user_id) {
                                userToUpdate.followers.splice(i, 1);
                            }
                        }
                        console.log(userToUpdate)
                        FlixUserService
                            .updateUser(userToUpdate._id, userToUpdate)
                            .then(function(stat) {
                                    init();
                                },
                                function(error) {
                                    vm.error = "Error in updating logged in user details";
                                });
                    }
                );
        }

        function followUser(userId, username) {
            var userObj = {
                userId: userId,
                username: username
            };

            vm.user.following.push(userObj);

            var followUserObj = {
                userId: vm.user._id,
                username: vm.user.username
            };

            FlixUserService
                .updateUser(vm.user._id, vm.user)
                .then(function(stat) {
                    updateFollowerUser(userId, followUserObj);
                        init();
                    },
                    function(error) {
                        vm.error = "Error in updating logged in user details";
                    });
        }

        function updateFollowerUser(userId, followUserObj) {

            FlixUserService
                .findUserById(userId)
                .then(
                    function(response) {
                        var userToUpdate = response.data;
                        userToUpdate.followers.push(followUserObj);
                        FlixUserService
                            .updateUser(userToUpdate._id, userToUpdate)
                            .then(function(stat) {
                                    init();
                                },
                                function(error) {
                                    vm.error = "Error in updating logged in user details";
                                });
                    }
                );
        }
        
        function getUserProfile(userId) {
            $location.url("/user/" + userId);
        }

        function getMovieInfo(movieId) {
            $location.url("/movie/" + movieId)
        }
    }
})();