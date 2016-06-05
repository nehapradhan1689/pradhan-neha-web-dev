(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if(name == null) {
                vm.error = "Please enter a website name";
            }
            else {
                var flag = false;
                WebsiteService
                    .findWebsitesByUser(vm.userId)
                    .then(function(response) {
                        var websites = response.data;
                        for(var w in websites) {
                            if (websites[w].name === name) {
                                flag = true;
                            }
                        }
                        if(flag == true) {
                            vm.error = "A website with the same name already exists";
                        }
                        else {
                            WebsiteService
                                .createWebsite(name, description, vm.userId)
                                .then(function(response) {
                                    var newWebsite = response.data;
                                    if(newWebsite) {
                                        $location.url("/user/"+vm.userId+"/website");
                                    }
                                    else {
                                        vm.error = "Unable to create website";
                                    }
                                });
                        }
                    });
            }

        }


    }
})();