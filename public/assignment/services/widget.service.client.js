(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Basically, the physics behind this fall is similar to that of a moving pendulum. As you fall, the mass beneath you decreases as the average gravitational pull on you from that mass increases. But the mass decreases more quickly, so as you approach the center of the Earth, you start going faster and faster but the force pulling you towards the center also decreases. <br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function WidgetService() {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        }
        return api;
        
        function createWidget(pageId, widget) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: widget.widgetType,
                pageId: pageId
            };
            widgets.push(newWidget);
            return newWidget;
        }
        
        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var i in widgets) {
                if(widgets[i].pageId === pageId) {
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }
        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }
        
        function updateWidget(widgetId, widget) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return true;
                }
            }
            return false;
        }
        
        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        
    }
})();