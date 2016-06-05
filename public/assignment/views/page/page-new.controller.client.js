(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name, title) {
            if(name == null) {
                vm.error = "Please enter a valid page name";
            }
            else {
                var flag = false;
                PageService
                    .findPageByWebsiteId(vm.websiteId)
                    .then(function(response) {
                        var pages = response.data;
                        for(var p in pages) {
                            if (pages[p].name === name) {
                                flag = true;
                            }
                        }
                        if(flag == true) {
                            vm.error = "A page with the same name already exists";
                        }
                        else {
                            var page = {
                                name: name,
                                title: title,
                                websiteId: vm.websiteId
                            };
                            PageService
                                .createPage(vm.websiteId, page)
                                .then(function(response) {
                                    var newPage = response.data;
                                    if(newPage) {
                                        //console.log(newPage);
                                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                                    }
                                    else {
                                        vm.error = "Unable to create page";
                                    }
                                });
                        }
                    });
            }
        }


    }
})();