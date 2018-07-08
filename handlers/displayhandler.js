var queries = require('../models/episodes');
module.exports = {
    displayItemsGet: function (req, res) {
        queries.getAllItems(req, res);
    },
    displayItemsPost: function (req, res) {
        queries.getAllItems(req, res,true);
    }
}