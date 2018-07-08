var fs = require('fs');
var path = require('path');
var url = require('url');

module.exports = {
    episodes: null,
    getAllItems: function (req, res,isAjax) {
        var self = this;
        var query = url.parse(req.url,true).query;
        var offset=(query.page) ? query.page-1 : 0, limit=5;

        self.episodes=null;

        self.loadDataFromFile(function(err, data){
            if(err) return;
            var obj = JSON.parse(data);
            self.episodes=obj._embedded.episodes;

            self.filterItem(query,self);

            obj={
                episodes: self.episodes.slice(offset * limit, offset * limit + limit),
                count: Math.ceil(self.episodes.length/limit),
                current: offset + 1
            };
            if(!isAjax) {
                res.render('index',obj);
            }else{
                res.send(JSON.stringify(obj));
            }
        });
    },
    filterItem:function (query,self) {
        var arr=[];
        if(query.filter) {
            var tmpStr=query.filter.toLowerCase();
            self.episodes.forEach(function (ep) {
                if(ep.name.toLowerCase().indexOf(tmpStr)!=-1){
                    arr.push(ep);
                }
            })
            self.episodes=arr;
        }
    },
    loadDataFromFile:function (callback) {
        fs.readFile(path.join(__dirname,'../data.txt'), {encoding : 'utf-8'}, callback);
    }
}