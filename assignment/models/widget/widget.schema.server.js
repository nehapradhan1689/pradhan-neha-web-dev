module.exports = function() {

    var mongoose = require('mongoose');
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        size: String,
        text: String,
        placeholder: String,
        description: String,
        width: String,
        url: String,
        height: String,
        rows: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};