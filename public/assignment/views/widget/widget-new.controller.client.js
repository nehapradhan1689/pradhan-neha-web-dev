(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            //console.log("Hello"+widgetType);
            //pageId, widget
            var newWidget = {
                widgetType: widgetType
            };

            var newWidget = WidgetService.createWidget(vm.pageId, newWidget);
            if(newWidget) {
                vm.widgetId = newWidget._id;
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
            }
            else {
                vm.error = "Unable to create widget";
            }
        }


    }
})();