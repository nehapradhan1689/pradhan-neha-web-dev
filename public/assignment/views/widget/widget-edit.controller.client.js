(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response) {
                    vm.widget = response.data;
                });
        }
        init();

        function updateWidget(updatedWidget) {
            //console.log(updatedWidget.class);
            if(updatedWidget.name == null || updatedWidget.name == "") {
                //console.log("Inside update website");
                vm.error = "Please enter a valid widget name";
            }
            else{
                WidgetService
                    .updateWidget(vm.widgetId, updatedWidget)
                    .then(function(response) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }, function(error) {
                        vm.error = "Unable to update widget";
                    });
            }
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(function(response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                }, function(error) {
                    vm.error = "Unable to delete website";
                });
        }


    }
})();