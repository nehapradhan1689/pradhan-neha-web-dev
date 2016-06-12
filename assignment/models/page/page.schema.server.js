module.exports = function() {

    var mongoose = require('mongoose');
    var WidgetSchema = require("../widget/widget.schema.server")();
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
        name: {type: String, required: true},
        title: String,
        description: String,
        widgets: [WidgetSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});

    return PageSchema;

    };