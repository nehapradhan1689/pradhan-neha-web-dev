(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget: reorderWidget
        }
        return api;
        
        function createWidget(pageId, widget) {
            var newWidget = {
                type: widget.type,
                pageId: pageId
            };
            // widgets.push(newWidget);
            // return newWidget;
            
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, newWidget);
        }
        
        function findWidgetsByPageId(pageId) {
            // var resultSet = [];
            // for(var i in widgets) {
            //     if(widgets[i].pageId === pageId) {
            //         resultSet.push(widgets[i]);
            //     }
            // }
            // return resultSet;

            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            // for (var i in widgets) {
            //     if (widgets[i]._id === widgetId) {
            //         return widgets[i];
            //     }
            // }
            // return null;

            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }
        
        function updateWidget(widgetId, widget) {
            // for(var i in widgets) {
            //     if(widgets[i]._id === widgetId) {
            //         widgets[i] = widget;
            //         return true;
            //     }
            // }
            // return false;

            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }
        
        function deleteWidget(widgetId) {
            // for(var i in widgets) {
            //     if(widgets[i]._id === widgetId) {
            //         widgets.splice(i, 1);
            //         return true;
            //     }
            // }
            // return false;

            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }
        
        function reorderWidget(pageId, start, end) {
            var url = "/page/" + pageId + "/widget?start=" + start + "&end=" + end;
            return $http.put(url);
        }
        
    }
})();